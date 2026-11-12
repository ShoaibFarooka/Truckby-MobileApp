import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { GestureDetector, usePanGesture } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const ITEM_SIZE = 90;
const GAP = 12;
const SLOT = ITEM_SIZE + GAP;
// Room for the remove badge, which sticks out above and right of each photo
const BADGE_OVERFLOW = 6;
const LONG_PRESS_MS = 200;
const SPRING = { damping: 20, stiffness: 200 };

// Top-left corner of a grid slot
function slotX(slot, cols) {
    "worklet";
    return (slot % cols) * SLOT;
}

function slotY(slot, cols) {
    "worklet";
    return Math.floor(slot / cols) * SLOT;
}

function SingleItem({ image, index, layout, positions, activeIndex, startSlot, onDragStart, onDragEnd, onRemove }) {
    const dragX = useSharedValue(0);
    const dragY = useSharedValue(0);

    // Long press first, so a normal swipe still scrolls the page
    const gesture = usePanGesture({
        activateAfterLongPress: LONG_PRESS_MS,
        onActivate: () => {
            "worklet";
            activeIndex.value = index;
            startSlot.value = positions.value[index];
            dragX.value = 0;
            dragY.value = 0;
            scheduleOnRN(onDragStart);
        },
        onUpdate: (e) => {
            "worklet";
            dragX.value = e.translationX;
            dragY.value = e.translationY;

            const { cols, total } = layout.value;
            const rows = Math.ceil(total / cols);

            // The slot under the centre of the dragged photo
            const centerX = slotX(startSlot.value, cols) + e.translationX + ITEM_SIZE / 2;
            const centerY = slotY(startSlot.value, cols) + e.translationY + ITEM_SIZE / 2;
            const col = Math.min(Math.max(Math.floor(centerX / SLOT), 0), cols - 1);
            const row = Math.min(Math.max(Math.floor(centerY / SLOT), 0), rows - 1);
            const target = Math.min(row * cols + col, total - 1);

            const from = positions.value[index];
            if (target === from) return;

            // Move the photo to the target slot and shift the photos in between by one
            positions.value = positions.value.map((slot, i) => {
                if (i === index) return target;
                if (from < target && slot > from && slot <= target) return slot - 1;
                if (from > target && slot >= target && slot < from) return slot + 1;
                return slot;
            });
        },
        onDeactivate: () => {
            "worklet";
            activeIndex.value = -1;
            scheduleOnRN(onDragEnd);
        },
        onFinalize: () => {
            "worklet";
            // Safety net in case the drag ended without onDeactivate
            if (activeIndex.value === index) {
                activeIndex.value = -1;
                scheduleOnRN(onDragEnd);
            }
        },
    });

    const animStyle = useAnimatedStyle(() => {
        "worklet";
        const { cols } = layout.value;
        const isActive = activeIndex.value === index;

        // The dragged photo follows the finger; the others spring to their slots
        const x = isActive
            ? slotX(startSlot.value, cols) + dragX.value
            : withSpring(slotX(positions.value[index], cols), SPRING);
        const y = isActive
            ? slotY(startSlot.value, cols) + dragY.value
            : withSpring(slotY(positions.value[index], cols), SPRING);

        return {
            transform: [
                { translateX: x },
                { translateY: y },
                { scale: withSpring(isActive ? 1.08 : 1, SPRING) },
            ],
            zIndex: isActive ? 99 : 1,
            opacity: isActive ? 0.9 : 1,
            shadowOpacity: isActive ? 0.25 : 0,
            shadowRadius: isActive ? 8 : 0,
            elevation: isActive ? 8 : 0,
        };
    });

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.item, animStyle]}>
                <Image source={{ uri: image.uri }} style={styles.image} />
                <TouchableOpacity
                    style={styles.badge}
                    onPress={() => onRemove(positions.value[index])}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                    <Ionicons name="close" size={14} color="#fff" />
                </TouchableOpacity>
            </Animated.View>
        </GestureDetector>
    );
}

// Photos in a wrapping grid that can be reordered by pressing and holding a
// photo, then dragging it to any position. Items keep their render order;
// `positions[i]` is the grid slot of `items[i]`, so reordering never
// re-renders the list mid-animation.
export default function DraggableImageList({
    images,
    onRemove,
    onReorderComplete,
    onDragActiveChange,
}) {
    const [items, setItems] = useState(images);
    const [cols, setCols] = useState(0);
    const itemsRef = useRef(images);
    const positions = useSharedValue(images.map((_, i) => i));
    const activeIndex = useSharedValue(-1);
    const startSlot = useSharedValue(0);
    const layout = useSharedValue({ cols: 1, total: images.length });

    // Start over when photos are added or removed. A new order of the same
    // photos is our own reorder coming back from the parent, so keep the grid.
    useEffect(() => {
        const current = itemsRef.current.map((x) => x.uri).sort().join(",");
        const next = images.map((x) => x.uri).sort().join(",");
        if (current === next) return;

        positions.value = images.map((_, i) => i);
        activeIndex.value = -1;
        layout.value = { ...layout.value, total: images.length };
        itemsRef.current = images;
        setItems(images);
    }, [images]);

    // Set before the photos render, so they appear in their slots right away
    const handleLayout = (e) => {
        const width = e.nativeEvent.layout.width - BADGE_OVERFLOW;
        const nextCols = Math.max(1, Math.floor((width + GAP) / SLOT));
        layout.value = { cols: nextCols, total: itemsRef.current.length };
        setCols(nextCols);
    };

    const handleDragStart = useCallback(() => {
        onDragActiveChange?.(true);
    }, [onDragActiveChange]);

    const handleDragEnd = useCallback(() => {
        onDragActiveChange?.(false);

        const slots = positions.value;
        const sorted = itemsRef.current
            .map((item, i) => ({ item, slot: slots[i] }))
            .sort((a, b) => a.slot - b.slot)
            .map((x) => x.item);
        onReorderComplete(sorted);
    }, [positions, onReorderComplete, onDragActiveChange]);

    const rows = cols ? Math.ceil(items.length / cols) : 0;

    return (
        <View
            style={[styles.grid, { height: rows ? rows * SLOT - GAP + BADGE_OVERFLOW : 0 }]}
            onLayout={handleLayout}
        >
            {cols > 0 &&
                items.map((image, index) => (
                    <SingleItem
                        key={image.uri}
                        image={image}
                        index={index}
                        layout={layout}
                        positions={positions}
                        activeIndex={activeIndex}
                        startSlot={startSlot}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onRemove={onRemove}
                    />
                ))}
        </View>
    );
}

const styles = StyleSheet.create({
    grid: {
        width: "100%",
        marginTop: 16 - BADGE_OVERFLOW,
    },
    item: {
        position: "absolute",
        top: BADGE_OVERFLOW,
        left: 0,
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    badge: {
        position: "absolute",
        top: -6,
        right: -6,
        backgroundColor: "#ef4444",
        borderRadius: 12,
        width: 22,
        height: 22,
        alignItems: "center",
        justifyContent: "center",
    },
});
