import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Toast } from "toastify-react-native";
import subscriptionService from "../../../services/subscriptionService";
import productService from "../../../services/productService";
import { showLoader, hideLoader } from "../../../redux/loaderSlice";
import { fetchUserInfo } from "../../../redux/userSlice";
import { styles } from "./PlansStyles";

const allFeatures = [
    "Advanced Analytics",
    "Business Branding",
    "Featured Listings",
    "Top Search Visibility",
    "Email Support",
    "Email Blast",
];

// Read-only view of the seller's current plan. Plans are purchased outside
// the mobile app, so this screen must not show prices or purchase options.
const Plans = () => {
    const [products, setProducts] = useState([]);
    const [info, setInfo] = useState({
        status: false,
        planName: "",
        productId: "",
        subscriptionId: "",
        amount: null,
    });
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    const fetchPlan = async () => {
        dispatch(showLoader());
        try {
            const [productsResponse, infoResponse] = await Promise.all([
                productService.fetchAllProducts(),
                subscriptionService.getUserSubscriptionInfo(),
            ]);
            if (productsResponse.products) setProducts(productsResponse.products);
            if (infoResponse.info) setInfo(infoResponse.info);
        } catch (error) {
            Toast.error(error?.response?.data?.error || "Something went wrong");
        } finally {
            setLoaded(true);
            dispatch(fetchUserInfo());
            dispatch(hideLoader());
        }
    };

    useEffect(() => {
        fetchPlan();
    }, []);

    // Fall back to the plan name alone if the plan isn't in the product list
    const currentPlan = info.status
        ? products.find((plan) => plan.productId === info.productId) || { name: info.planName }
        : null;
    const isExpired = !info.status && !!info.subscriptionId;

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Ionicons
                name={isExpired ? "alert-circle-outline" : "document-text-outline"}
                size={48}
                color="#9ca3af"
            />
            <Text style={styles.emptyStateTitle}>
                {isExpired ? "Your plan has expired" : "You don't have an active plan"}
            </Text>
        </View>
    );

    return (
        <View style={styles.screen}>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
                <View style={styles.card}>
                    <View style={styles.headingRow}>
                        <Text style={styles.headingText}>My Plan</Text>
                    </View>

                    {!loaded ? null : currentPlan ? (
                        <View style={[styles.planCard, styles.planCardCurrent]}>
                            <View style={styles.planCardHeader}>
                                <View style={styles.planNameWrap}>
                                    <Text style={styles.planName}>{currentPlan.name}</Text>
                                    <View style={styles.currentBadge}>
                                        <Text style={styles.currentBadgeText}>Active</Text>
                                    </View>
                                </View>
                            </View>

                            {currentPlan.listings != null && (
                                <View style={styles.listingsRow}>
                                    <Text style={styles.listingsLabel}>Listings Included</Text>
                                    <Text style={styles.listingsValue}>{currentPlan.listings}</Text>
                                </View>
                            )}

                            {currentPlan.features && (
                                <View style={styles.featureList}>
                                    {allFeatures.map((feature, i) => {
                                        const included = currentPlan.features.includes(feature);
                                        return (
                                            <View key={i} style={styles.featureRow}>
                                                {included ? (
                                                    <Ionicons name="checkmark" size={18} color="#10B981" />
                                                ) : (
                                                    <Ionicons name="close" size={18} color="#9ca3af" />
                                                )}
                                                <Text
                                                    style={[
                                                        styles.featureText,
                                                        !included && styles.featureTextDisabled,
                                                    ]}
                                                >
                                                    {feature}
                                                </Text>
                                            </View>
                                        );
                                    })}
                                </View>
                            )}
                        </View>
                    ) : (
                        renderEmptyState()
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default Plans;
