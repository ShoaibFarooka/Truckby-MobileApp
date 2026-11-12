import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Linking, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAppStoreCountryAsync } from "../../../modules/app-store-country";
import { styles } from "./WebPlanLinkStyles";

const PLANS_URL = "https://truckby.com/seller/plans";

// Links to buying a plan on the website. Apple only allows links to other ways
// of paying on the US App Store, so this renders nothing anywhere else: on
// other storefronts, on Android, and whenever the storefront is unknown.
const WebPlanLink = ({ label = "Get a plan on truckby.com" }) => {
    const [isUSStore, setIsUSStore] = useState(false);

    useEffect(() => {
        if (Platform.OS !== "ios") return;
        let active = true;
        getAppStoreCountryAsync().then((country) => {
            if (active) setIsUSStore(country === "USA");
        });
        return () => {
            active = false;
        };
    }, []);

    if (!isUSStore) return null;

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL(PLANS_URL)}
            accessibilityRole="link"
        >
            <Text style={styles.buttonText}>{label}</Text>
            <Ionicons name="open-outline" size={18} color="#ffffff" />
        </TouchableOpacity>
    );
};

export default WebPlanLink;
