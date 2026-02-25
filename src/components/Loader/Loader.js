import { useEffect, useRef, useState } from 'react';
import { View, Modal } from 'react-native';
import { styles } from "./LoaderStyles";
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';

const Loader = () => {
    const activeRequests = useSelector(state => state.loader.activeRequests);
    const isVisible = activeRequests > 0;
    const dotsCount = 3;
    const animationDuration = 1100;
    const overlapDuration = animationDuration / 2.4;
    const [activeDot, setActiveDot] = useState(0);
    const dotRefs = useRef([]);

    useEffect(() => {
        if (!isVisible) return;

        // Animate the current active dot
        if (dotRefs.current[activeDot]) {
            dotRefs.current[activeDot].animate(
                {
                    0: { scale: 1 },
                    0.5: { scale: 1.8 },
                    1: { scale: 1 },
                },
                animationDuration
            );
        }

        const timeout = setTimeout(() => {
            setActiveDot((prev) => (prev + 1) % dotsCount);
        }, overlapDuration);

        return () => clearTimeout(timeout);
    }, [activeDot, isVisible]);

    if (!isVisible) return null;

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <Animatable.Image
                    animation="fadeInDown"
                    duration={1500}
                    source={require('../../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <View style={styles.dotsContainer}>
                    {[...Array(dotsCount)].map((_, i) => (
                        <Animatable.View
                            key={i}
                            ref={(ref) => (dotRefs.current[i] = ref)}
                            style={styles.dot}
                        />
                    ))}
                </View>
            </View>
        </Modal>
    );
};

export default Loader;