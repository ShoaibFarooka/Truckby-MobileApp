import { View, Text, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { useState, useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles, GRID_PADDING, GRID_GAP } from './TruckCardStyles';

const blurhash = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';
const AUTO_SLIDE_MS = 5000;

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
    const [pressed, setPressed] = useState(false);
    const scrollRef = useRef(null);
    // Small per-card offset so cards in the grid don't all slide at the same moment
    const slideDelay = useRef(AUTO_SLIDE_MS + Math.random() * 1500).current;

    const location = [state, country].filter(Boolean).join(', ');

    // Restarts on every index change, so a manual swipe also resets the timer
    useEffect(() => {
        if (images.length <= 1) return;
        const timeout = setTimeout(() => {
            const next = (activeIndex + 1) % images.length;
            scrollRef.current?.scrollTo({ x: next * cardWidth, animated: true });
            setActiveIndex(next);
        }, slideDelay);
        return () => clearTimeout(timeout);
    }, [activeIndex, images.length, cardWidth, slideDelay]);

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
                    ref={scrollRef}
                    keyboardShouldPersistTaps="handled"
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={images.length > 1}
                    onScrollBeginDrag={() => setPressed(false)}
                    onMomentumScrollEnd={(e) => {
                        setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / cardWidth));
                    }}
                >
                    {images.length > 0 ? (
                        images.map((img, index) => (
                            <Pressable key={index} {...pressProps}>
                                <Image
                                    source={{ uri: img }}
                                    style={{ width: cardWidth, height: imageHeight }}
                                    contentFit="cover"
                                    placeholder={{ blurhash }}
                                    transition={150}
                                    cachePolicy="disk"
                                    priority={index === 0 ? 'normal' : 'low'}
                                    recyclingKey={img}
                                />
                            </Pressable>
                        ))
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
