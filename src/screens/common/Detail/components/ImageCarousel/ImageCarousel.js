import { useState, useRef } from 'react';
import {
    View, ScrollView,
    TouchableOpacity, useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import Skeleton from '../../../../../components/Skeleton/Skeleton';
import { styles } from './ImageCarouselStyles';

// Listings have ~20 full-size photos (3-5MB, ~4000px each). Loading several at
// once, or auto-sliding through them, made the screen lag, so only the photo on
// screen is loaded and photos change on swipe/arrow/dot only. expo-image keeps
// viewed photos in its disk cache, so going back to one is quick.
const ImageCarousel = ({ images = [] }) => {
    const { width: screenWidth } = useWindowDimensions();
    const [activeIndex, setActiveIndex] = useState(0);
    // Photo the slider last came to rest on; kept mounted during a swipe so the
    // outgoing photo doesn't vanish halfway through
    const [settledIndex, setSettledIndex] = useState(0);
    // Per-photo status: 'loaded' | 'error'; anything else is still loading
    const [photoStatus, setPhotoStatus] = useState({});
    const scrollRef = useRef(null);

    const clampIndex = (index) => Math.max(0, Math.min(index, images.length - 1));

    const goTo = (index) => {
        const target = clampIndex(index);
        scrollRef.current?.scrollTo({ x: target * screenWidth, animated: true });
        setActiveIndex(target);
        setSettledIndex(target);
    };

    const setStatus = (index, status) => {
        setPhotoStatus((prev) => (prev[index] === status ? prev : { ...prev, [index]: status }));
    };

    if (!images || images.length === 0) return null;

    return (
        <View style={[styles.wrapper, { width: screenWidth }]}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                ref={scrollRef}
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                // Track the photo while scrolling so the dots and arrows keep up with
                // quick swipes; same index = no re-render
                onScroll={(e) => {
                    setActiveIndex(clampIndex(Math.round(e.nativeEvent.contentOffset.x / screenWidth)));
                }}
                onMomentumScrollEnd={(e) => {
                    setSettledIndex(clampIndex(Math.round(e.nativeEvent.contentOffset.x / screenWidth)));
                }}
            >
                {images.map((img, index) => {
                    const isActive = index === activeIndex;
                    const isMounted = isActive || index === settledIndex;
                    const status = photoStatus[index];
                    const isError = status === 'error';
                    // Skeleton on the current slot until it loads, and on its neighbours,
                    // which are what the user sees while swiping
                    const isNear = Math.abs(index - activeIndex) <= 1;
                    const showSkeleton = isNear && !isError && !(isMounted && status === 'loaded');

                    return (
                        // Same-size slot for every photo keeps paging offsets correct
                        <View key={index} style={[styles.slide, { width: screenWidth }]}>
                            {showSkeleton && <Skeleton style={styles.slideFill} />}

                            {isError && (
                                <Ionicons name="image-outline" size={40} color="#9CA3AF" />
                            )}

                            {isMounted && !isError && (
                                <Image
                                    source={img}
                                    style={styles.slideFill}
                                    contentFit="cover"
                                    cachePolicy="disk"
                                    transition={200}
                                    priority="high"
                                    recyclingKey={typeof img === 'string' ? img : undefined}
                                    onLoad={() => setStatus(index, 'loaded')}
                                    onError={() => setStatus(index, 'error')}
                                />
                            )}
                        </View>
                    );
                })}
            </ScrollView>

            {activeIndex > 0 && (
                <TouchableOpacity
                    style={[styles.arrow, styles.arrowLeft]}
                    onPress={() => goTo(activeIndex - 1)}
                    activeOpacity={0.8}
                >
                    <Ionicons name="chevron-back" size={22} color="#fff" />
                </TouchableOpacity>
            )}

            {activeIndex < images.length - 1 && (
                <TouchableOpacity
                    style={[styles.arrow, styles.arrowRight]}
                    onPress={() => goTo(activeIndex + 1)}
                    activeOpacity={0.8}
                >
                    <Ionicons name="chevron-forward" size={22} color="#fff" />
                </TouchableOpacity>
            )}

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
