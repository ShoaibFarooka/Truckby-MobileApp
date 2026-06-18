import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './TruckCardStyles';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = (screenWidth - 24) / 2; // 2 columns with padding

const formatNumberWithCommas = (num) => {
    if (num === null || num === undefined || num === '') return '';
    return Number(num).toLocaleString();
};

const TruckCard = ({ images = [], title, price, location, miles, data }) => {
    const navigation = useNavigation();
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => {
                const next = prev + 1 >= images.length ? 0 : prev + 1;
                scrollRef.current?.scrollTo({ x: next * CARD_WIDTH, animated: true });
                return next;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);

    const handlePress = () => {
        navigation.navigate('Detail', { id: data._id, data });
    };

    return (
        <TouchableOpacity
            style={[styles.card, { width: CARD_WIDTH }]}
            onPress={handlePress}
            activeOpacity={0.92}
        >
            {/* ── Image Carousel ── */}
            <View style={styles.imageWrapper}>
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={images.length > 1}
                    onMomentumScrollEnd={(e) => {
                        const index = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
                        setActiveIndex(index);
                    }}
                >
                    {images.length > 0 ? (
                        images.map((img, index) => (
                            <Image
                                key={index}
                                source={{ uri: img }}
                                style={[styles.image, { width: CARD_WIDTH }]}
                                resizeMode="cover"
                            />
                        ))
                    ) : (
                        <View style={[styles.imagePlaceholder, { width: CARD_WIDTH }]}>
                            <Ionicons name="image-outline" size={32} color="#9CA3AF" />
                        </View>
                    )}
                </ScrollView>

                {/* Dots */}
                {images.length > 1 && (
                    <View style={styles.dotsContainer}>
                        {images.map((_, i) => (
                            <View
                                key={i}
                                style={[styles.dot, i === activeIndex ? styles.dotActive : styles.dotInactive]}
                            />
                        ))}
                    </View>
                )}
            </View>

            {/* ── Details ── */}
            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={1}>
                    {title ? title.toUpperCase() : ''}
                </Text>

                <Text style={styles.price}>
                    {!price || price === 0
                        ? 'Contact for Price'
                        : `$${formatNumberWithCommas(price)}`}
                </Text>

                <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                        <Ionicons name="location-sharp" size={11} color="#1E1E1E" />
                        <Text style={styles.metaText} numberOfLines={1}>
                            {location || ''}
                        </Text>
                    </View>
                    {miles > 0 && (
                        <View style={styles.metaItem}>
                            <Ionicons name="speedometer-outline" size={11} color="#1E1E1E" />
                            <Text style={styles.metaText}>
                                {`${formatNumberWithCommas(miles)} mi`}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default TruckCard;