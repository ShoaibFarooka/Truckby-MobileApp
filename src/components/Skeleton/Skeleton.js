import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

// Pulsing grey block used as a loading placeholder.
// Runs on the native driver so it doesn't add work to the JS thread.
const Skeleton = ({ style }) => {
    const opacity = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0.5, duration: 700, useNativeDriver: true }),
            ])
        );
        pulse.start();
        return () => pulse.stop();
    }, [opacity]);

    return <Animated.View style={[styles.skeleton, style, { opacity }]} />;
};

export default Skeleton;

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: '#E5E7EB',
    },
});
