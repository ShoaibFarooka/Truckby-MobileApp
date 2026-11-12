import React from "react";
import { StyleSheet } from "react-native";
import { GestureDetector, usePanGesture } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { SuccessToast, ErrorToast, InfoToast, WarnToast } from "toastify-react-native";

// How far up (points) or how fast (points/second) a swipe must go to dismiss
const DISMISS_DISTANCE = 30;
const DISMISS_VELOCITY = -500;
const SPRING = { damping: 20, stiffness: 250 };

// Lets the user dismiss a toast by swiping it up. A shorter swipe springs back.
const SwipeToDismiss = ({ hide, children }) => {
    const translateY = useSharedValue(0);

    const gesture = usePanGesture({
        minDistance: 6,
        onUpdate: (e) => {
            "worklet";
            // Follow the finger upwards only
            translateY.value = Math.min(e.translationY, 0);
        },
        onDeactivate: (e) => {
            "worklet";
            if (e.translationY < -DISMISS_DISTANCE || e.velocityY < DISMISS_VELOCITY) {
                translateY.value = withTiming(-200, { duration: 150 }, (finished) => {
                    if (finished) scheduleOnRN(hide);
                });
            } else {
                translateY.value = withSpring(0, SPRING);
            }
        },
    });

    const animStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: Math.max(0, 1 + translateY.value / 150),
    }));

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.wrapper, animStyle]}>{children}</Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    // Full width, so the toast's percentage width is measured against the
    // screen. Without it the wrapper shrinks to its content and the message
    // text collapses to zero width.
    wrapper: {
        width: "100%",
        alignItems: "center",
    },
});

// Pass as ToastManager's `config`: the library's own toasts, made swipeable
export const swipeableToastConfig = {
    success: (props) => (
        <SwipeToDismiss hide={props.hide}>
            <SuccessToast {...props} />
        </SwipeToDismiss>
    ),
    error: (props) => (
        <SwipeToDismiss hide={props.hide}>
            <ErrorToast {...props} />
        </SwipeToDismiss>
    ),
    info: (props) => (
        <SwipeToDismiss hide={props.hide}>
            <InfoToast {...props} />
        </SwipeToDismiss>
    ),
    warn: (props) => (
        <SwipeToDismiss hide={props.hide}>
            <WarnToast {...props} />
        </SwipeToDismiss>
    ),
};
