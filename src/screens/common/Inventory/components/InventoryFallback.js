import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./InventoryFallbackStyles";

const InventoryFallback = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seller Not Found</Text>

            <Text style={styles.description}>
                The seller you're looking for may no longer exist, or the link
                you followed might be incorrect. Please check the URL or return
                to the Home page to browse available sellers.
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Home")}
            >
                <Text style={styles.buttonText}>Back To Home</Text>
            </TouchableOpacity>
        </View>
    );
};

export default InventoryFallback;