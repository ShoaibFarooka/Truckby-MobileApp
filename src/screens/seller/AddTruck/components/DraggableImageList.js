import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

const ITEM_SIZE = 90;
const GAP = 12;
const SLOT = ITEM_SIZE + GAP;
const SPRING = { damping: 20, stiffness: 200 };

function SingleItem({ image, index, total, direction, positions, activeIndex, startSlot, onDragEnd, onRemove }) {
    const dragOffset = useSharedValue(0);

    const gesture = Gesture.Pan()
        .minDistance(4)
        .onStart(() => {
            "worklet";
            activeIndex.value = index;
            dragOffset.value = 0;
            startSlot.value = positions.value[index];
        })
        .onUpdate((e) => {
            "worklet";
            const delta = direction === "vertical" ? e.translationY : e.translationX;
            dragOffset.value = delta;
            const hoverSlot = Math.min(
                Math.max(0, Math.round(startSlot.value + delta / SLOT)),
                total - 1,
            );

            const mySlot = positions.value[index];
            if (hoverSlot === mySlot) return;

            const newPositions = positions.value.slice();
            const swapIndex = newPositions.indexOf(hoverSlot);
            if (swapIndex === -1) return;

            newPositions[swapIndex] = mySlot;
            newPositions[index] = hoverSlot;
            positions.value = newPositions;
        })
        .onEnd(() => {
            "worklet";
            activeIndex.value = -1;
            dragOffset.value = withSpring(0, SPRING);
            runOnJS(onDragEnd)();
        })
        .onFinalize(() => {
            "worklet";
            activeIndex.value = -1;
            dragOffset.value = withSpring(0, SPRING);
        });

    const animStyle = useAnimatedStyle(() => {
        "worklet";
        const isActive = activeIndex.value === index;
        const mySlot = positions.value[index];

        const slotDelta = (mySlot - index) * SLOT;
        const translate = isActive
            ? slotDelta + dragOffset.value
            : withSpring(slotDelta, SPRING);

        return {
            transform: [
                direction === "vertical"
                    ? { translateY: translate }
                    : { translateX: translate },
                { scale: isActive ? 1.06 : 1 },
            ],
            zIndex: isActive ? 99 : 1,
            opacity: isActive ? 0.88 : 1,
            shadowOpacity: isActive ? 0.2 : 0,
            shadowRadius: isActive ? 8 : 0,
            elevation: isActive ? 8 : 0,
        };
    });

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.wrapper, animStyle]}>
                <Image source={{ uri: image.uri }} style={styles.image} />
                <TouchableOpacity
                    style={styles.badge}
                    onPress={() => onRemove(index)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                    <Ionicons name="close" size={14} color="#fff" />
                </TouchableOpacity>
            </Animated.View>
        </GestureDetector>
    );
}

export default function DraggableImageList({
    images,
    onRemove,
    onReorderComplete,
    direction = "horizontal",
}) {
    const [items, setItems] = useState(images);
    const itemsRef = useRef(images);
    const positions = useSharedValue(images.map((_, i) => i));
    const activeIndex = useSharedValue(-1);
    const startSlot = useSharedValue(0);

    useEffect(() => {
        const prevUris = itemsRef.current.map(x => x.uri).join(",");
        const nextUris = images.map(x => x.uri).join(",");
        if (prevUris === nextUris) return;

        positions.value = images.map((_, i) => i);
        activeIndex.value = -1;
        itemsRef.current = images;
        setItems(images);
    }, [images]);

    const onDragEnd = useCallback(() => {
        const slots = positions.value;
        const sorted = itemsRef.current
            .map((item, i) => ({ item, slot: slots[i] }))
            .sort((a, b) => a.slot - b.slot)
            .map(x => x.item);

        positions.value = sorted.map((_, i) => i);
        itemsRef.current = sorted;
        setItems(sorted);
        onReorderComplete(sorted);
    }, [items, positions, onReorderComplete]);

    const containerStyle = direction === "vertical" ? styles.column : styles.row;

    return (
        <View style={containerStyle}>
            {items.map((image, index) => (
                <SingleItem
                    key={image.uri}
                    image={image}
                    index={index}
                    total={items.length}
                    direction={direction}
                    positions={positions}
                    activeIndex={activeIndex}
                    startSlot={startSlot}
                    onDragEnd={onDragEnd}
                    onRemove={onRemove}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: GAP,
        marginTop: 16,
    },
    column: {
        flexDirection: "column",
        gap: GAP,
        marginTop: 16,
    },
    wrapper: {
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