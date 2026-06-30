import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { formatNumberWithCommas } from "../../../../utils/extra";
import { styles } from "./TruckCardStyles";


const placeholderImage = require("../../../../../assets/images/card.png");

export default function TruckCard({ data, handleDeleteClick }) {
    const navigation = useNavigation();

    const imageSource =
        data?.images && data.images.length > 0 ? { uri: data.images[0] } : placeholderImage;

    return (
        <View style={styles.card}>
            <Image source={imageSource} style={styles.image} />

            <View style={styles.body}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>{data?.vehicleName?.toUpperCase()}</Text>
                </View>

                <Text style={styles.price}>
                    {data?.vehiclePrice === 0
                        ? "Contact For Price"
                        : `$${formatNumberWithCommas(data?.vehiclePrice)}`}
                </Text>

                <View style={styles.metaRow}>
                    {!!data?.country && (
                        <>
                            <Ionicons
                                name="location-sharp"
                                size={14}
                                color="#374151"
                                style={styles.metaIcon}
                            />
                            <Text style={styles.metaText}>{data?.country}</Text>
                        </>
                    )}

                    {data?.mileage !== null && data?.mileage !== undefined && (
                        <>
                            <Ionicons
                                name="speedometer-outline"
                                size={14}
                                color="#374151"
                                style={[styles.metaIcon, { marginLeft: 24 }]}
                            />
                            {data?.mileage == 0 ? (
                                <Text style={styles.metaText}>N/A</Text>
                            ) : (
                                <Text style={styles.metaText}>
                                    {formatNumberWithCommas(data?.mileage)} Miles
                                </Text>
                            )}
                        </>
                    )}
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.viewButton}
                        onPress={() => navigation.navigate("Detail", { id: data._id, truckData: data })}
                        accessibilityLabel="View truck details"
                    >
                        <Text style={styles.viewButtonText}>View</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => navigation.navigate("EditTruck", { truckData: data })}
                        accessibilityLabel="Edit truck details"
                    >
                        <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteClick(data._id)}
                        accessibilityLabel="Delete truck"
                    >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}