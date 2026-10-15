import { View, Text, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Skeleton from '../Skeleton/Skeleton';
import { styles, GRID_PADDING, GRID_GAP } from './TruckCardStyles';

const formatNumberWithCommas = (num) => {
    if (num === null || num === undefined || num === '') return '';
    return Number(num).toLocaleString();
};

// Width of one card in a 2-column grid inside a container with GRID_PADDING on each side
export const useTruckCardWidth = () => {
    const { width } = useWindowDimensions();
    return Math.floor((width - GRID_PADDING * 2 - GRID_GAP) / 2);
};

const TruckCard = ({ images = [], title, price, country, state, miles, featured = false, data }) => {
    const navigation = useNavigation();
    const cardWidth = useTruckCardWidth();
    const imageHeight = Math.round(cardWidth * 0.75); // 4:3
    const [activeIndex, setActiveIndex] = useState(0);
    // Only photos that have been shown are rendered. Listings have ~20 full-size
    // photos (3-5MB each); loading all of them for every card at once kept the
    // phone busy and delayed scrolling after navigation
    const [maxLoaded, setMaxLoaded] = useState(0);
    const loadedUpTo = activeIndex;
    const renderUpTo = Math.max(maxLoaded, loadedUpTo);
    const [pressed, setPressed] = useState(false);
    // Per-photo status: 'loaded' | 'error'; anything else is still loading
    const [photoStatus, setPhotoStatus] = useState({});

    const setStatus = (index, status) => {
        setPhotoStatus((prev) => (prev[index] === status ? prev : { ...prev, [index]: status }));
    };

    const location = [state, country].filter(Boolean).join(', ');

    // Keep already-loaded photos mounted so swiping back doesn't reload them.
    // No auto-slide: with many cards it loaded a new full-size photo per card
    // every few seconds and made the app lag; photos change on swipe only.
    useEffect(() => {
        if (loadedUpTo > maxLoaded) setMaxLoaded(loadedUpTo);
    }, [loadedUpTo, maxLoaded]);

    const handlePress = () => {
        navigation.navigate('Detail', { id: data._id, data });
    };

    // Press handlers sit on each photo and on the details instead of wrapping the
    // carousel, so the ScrollView can cancel the tap when the user swipes.
    // The press-in delay lets a swipe or page scroll cancel it before the card scales.
    const pressProps = {
        onPress: handlePress,
        onPressIn: () => setPressed(true),
        onPressOut: () => setPressed(false),
        unstable_pressDelay: 130,
    };

    return (
        <View style={[styles.card, { width: cardWidth }, pressed && styles.cardPressed]}>
            {/* ── Image Carousel ── */}
            <View style={{ height: imageHeight }}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={images.length > 1}
                    onScrollBeginDrag={() => setPressed(false)}
                    // Update while scrolling (not on momentum end) so the counter and photo
                    // loading keep up with quick swipes; same index = no re-render
                    scrollEventThrottle={16}
                    onScroll={(e) => {
                        const index = Math.round(e.nativeEvent.contentOffset.x / cardWidth);
                        setActiveIndex(Math.max(0, Math.min(index, images.length - 1)));
                    }}
                >
                    {images.length > 0 ? (
                        images.map((img, index) => {
                            const status = photoStatus[index];
                            // Animate only the current and next slot (the one revealed while
                            // swiping); hidden slots further away stay static
                            const showSkeleton = status !== 'loaded' && status !== 'error' && index <= activeIndex + 1;

                            return (
                                <Pressable
                                    key={index}
                                    {...pressProps}
                                    // Same-size slot keeps paging offsets correct
                                    style={[styles.imagePlaceholder, { width: cardWidth, height: imageHeight }]}
                                >
                                    {showSkeleton && <Skeleton style={styles.imageFill} />}

                                    {status === 'error' && (
                                        <Ionicons name="image-outline" size={28} color="#9CA3AF" />
                                    )}

                                    {index <= renderUpTo && status !== 'error' && (
                                        <Image
                                            source={{ uri: img }}
                                            style={styles.imageFill}
                                            contentFit="cover"
                                            transition={200}
                                            cachePolicy="disk"
                                            priority={index === activeIndex ? 'normal' : 'low'}
                                            recyclingKey={img}
                                            onLoad={() => setStatus(index, 'loaded')}
                                            onError={() => setStatus(index, 'error')}
                                        />
                                    )}
                                </Pressable>
                            );
                        })
                    ) : (
                        <Pressable {...pressProps} style={[styles.imagePlaceholder, { width: cardWidth, height: imageHeight }]}>
                            <Ionicons name="image-outline" size={32} color="#9CA3AF" />
                        </Pressable>
                    )}
                </ScrollView>

                {featured && (
                    <View style={styles.featuredBadge} pointerEvents="none">
                        <Ionicons name="star" size={10} color="#fff" />
                        <Text style={styles.featuredText}>Featured</Text>
                    </View>
                )}

                {images.length > 1 && (
                    <View style={styles.photoBadge} pointerEvents="none">
                        <Ionicons name="camera" size={11} color="#fff" />
                        <Text style={styles.photoBadgeText}>{`${activeIndex + 1}/${images.length}`}</Text>
                    </View>
                )}
            </View>

            {/* ── Details ── */}
            <Pressable {...pressProps} style={styles.details}>
                <Text style={styles.price} numberOfLines={1}>
                    {!price || price === 0
                        ? 'Contact for Price'
                        : `$${formatNumberWithCommas(price)}`}
                </Text>

                <Text style={styles.title} numberOfLines={2}>
                    {title || ''}
                </Text>

                <View style={styles.metaColumn}>
                    {!!location && (
                        <View style={styles.metaItem}>
                            <Ionicons name="location-outline" size={13} color="#6B7280" />
                            <Text style={styles.metaText} numberOfLines={1}>
                                {location}
                            </Text>
                        </View>
                    )}
                    {miles > 0 && (
                        <View style={styles.metaItem}>
                            <Ionicons name="speedometer-outline" size={13} color="#6B7280" />
                            <Text style={styles.metaText} numberOfLines={1}>
                                {`${formatNumberWithCommas(miles)} mi`}
                            </Text>
                        </View>
                    )}
                </View>
            </Pressable>
        </View>
    );
};

export default TruckCard;
