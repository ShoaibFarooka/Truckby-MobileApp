import { useState, useRef, useEffect } from 'react';
import {
    View, Text, Image, ScrollView,
    TouchableOpacity, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './ImageCarouselStyles';

const { width: screenWidth } = Dimensions.get('window');

const ImageCarousel = ({ images = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);

    // Auto-swipe every 3 seconds
    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => {
                const next = prev + 1 >= images.length ? 0 : prev + 1;
                scrollRef.current?.scrollTo({ x: next * screenWidth, animated: true });
                return next;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);

    const goTo = (index) => {
        const clamped = Math.max(0, Math.min(index, images.length - 1));
        scrollRef.current?.scrollTo({ x: clamped * screenWidth, animated: true });
        setActiveIndex(clamped);
    };

    if (!images || images.length === 0) return null;

    return (
        <View style={styles.wrapper}>
            {/* Images */}
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
                    setActiveIndex(index);
                }}
            >
                {images.map((img, index) => (
                    <Image
                        key={index}
                        source={{ uri: img }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>

            {/* Left Arrow */}
            {activeIndex > 0 && (
                <TouchableOpacity
                    style={[styles.arrow, styles.arrowLeft]}
                    onPress={() => goTo(activeIndex - 1)}
                    activeOpacity={0.8}
                >
                    <Ionicons name="chevron-back" size={22} color="#fff" />
                </TouchableOpacity>
            )}

            {/* Right Arrow */}
            {activeIndex < images.length - 1 && (
                <TouchableOpacity
                    style={[styles.arrow, styles.arrowRight]}
                    onPress={() => goTo(activeIndex + 1)}
                    activeOpacity={0.8}
                >
                    <Ionicons name="chevron-forward" size={22} color="#fff" />
                </TouchableOpacity>
            )}

            {/* Dots */}
            {images.length > 1 && (
                <View style={styles.dotsContainer}>
                    {images.map((_, index) => (
                        <TouchableOpacity key={index} onPress={() => goTo(index)}>
                            <View
                                style={[
                                    styles.dot,
                                    index === activeIndex ? styles.dotActive : styles.dotInactive,
                                ]}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

export default ImageCarousel;