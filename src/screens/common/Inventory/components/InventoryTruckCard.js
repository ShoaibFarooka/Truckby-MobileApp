import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import fallback from "../../../../../assets/images/card.png";
import { formatNumberWithCommas } from "../../../../utils/extra";
import styles from "./InventoryTruckCardStyles";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 32;

export default function InventoryTruckCard({ data }) {
    const navigation = useNavigation();

    const [activeIndex, setActiveIndex] = useState(0);

    const scrollRef = useRef(null);

    const images =
        data?.images?.length > 0
            ? data.images
            : [Image.resolveAssetSource(fallback).uri];

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => {
                const next = prev + 1 >= images.length ? 0 : prev + 1;

                scrollRef.current?.scrollTo({
                    x: next * CARD_WIDTH,
                    animated: true,
                });

                return next;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [images]);

    const handleView = () => {
        navigation.navigate("Detail", {
            id: data._id,
            data,
        });
    };

    return (
        <View style={[styles.card, { width: CARD_WIDTH }]}>
            {/* Images */}
            <View style={styles.imageWrapper}>
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={images.length > 1}
                    onMomentumScrollEnd={(e) => {
                        const index = Math.round(
                            e.nativeEvent.contentOffset.x / CARD_WIDTH
                        );
                        setActiveIndex(index);
                    }}
                >
                    {images.map((img, index) => (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.9}
                            onPress={handleView}
                        >
                            <Image
                                source={{ uri: img }}
                                style={[styles.image, { width: CARD_WIDTH }]}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {images.length > 1 && (
                    <View style={styles.dotsContainer}>
                        {images.map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.dot,
                                    i === activeIndex
                                        ? styles.dotActive
                                        : styles.dotInactive,
                                ]}
                            />
                        ))}
                    </View>
                )}
            </View>

            {/* Details */}

            <View style={styles.details}>
                <Text
                    style={styles.title}
                    numberOfLines={1}
                >
                    {data?.vehicleName?.toUpperCase()}
                </Text>

                <Text style={styles.price}>
                    {data?.vehiclePrice === 0
                        ? "Contact for Price"
                        : `$${formatNumberWithCommas(data.vehiclePrice)}`}
                </Text>

                {data?.country && (
                    <View style={styles.metaItem}>
                        <Ionicons
                            name="location-sharp"
                            size={14}
                            color="#333"
                        />

                        <Text style={styles.metaText}>
                            {data.country}
                        </Text>
                    </View>
                )}

                <View style={styles.metaItem}>
                    <Ionicons
                        name="speedometer-outline"
                        size={14}
                        color="#333"
                    />

                    <Text style={styles.metaText}>
                        {data?.mileage === 0
                            ? "N/A"
                            : `${formatNumberWithCommas(
                                data.mileage
                            )} Miles`}
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleView}
                >
                    <Text style={styles.buttonText}>
                        View
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}