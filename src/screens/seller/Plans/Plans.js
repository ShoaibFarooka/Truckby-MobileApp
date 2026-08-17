import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Toast } from "toastify-react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import subscriptionService from "../../../services/subscriptionService";
import productService from "../../../services/productService";
import stripeService from "../../../services/stripeService";
import { showLoader, hideLoader } from "../../../redux/loaderSlice";
import { fetchUserInfo } from "../../../redux/userSlice";
import { styles } from "./PlansStyles";
import { useNavigation } from "@react-navigation/native";




const showToast = (type, message) => {
    switch (type) {
        case "success":
            Toast.success(message);
            break;
        case "error":
            Toast.error(message);
            break;
        case "info":
            Toast.info(message);
            break;
        case "warn":
        case "warning":
            Toast.warn(message);
            break;
        default:
            Toast.show?.(message);
    }
};

const allFeatures = [
    "Advanced Analytics",
    "Business Branding",
    "Featured Listings",
    "Top Search Visibility",
    "Email Support",
    "Email Blast",
];

const Plans = () => {
    const [products, setProducts] = useState([]);
    const [info, setInfo] = useState({
        status: false,
        planName: "",
        productId: "",
        subscriptionId: "",
        amount: null,
    });
    const [oldProductId, setOldProductId] = useState(null);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const getSubscriptionInfo = async () => {
        try {
            const response = await subscriptionService.getUserSubscriptionInfo();
            if (response.info) {
                setInfo(response.info);
                if (oldProductId && oldProductId === response.info.productId) {
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                    await getSubscriptionInfo();
                }
            }
        } catch (error) {
            showToast("error", error?.response?.data?.error || "Something went wrong");
        }
    };

    const fetchProducts = async () => {
        dispatch(showLoader());
        try {
            const response = await productService.fetchAllProducts();
            if (response.products) {
                setProducts(response.products);
                await getSubscriptionInfo();
            }
        } catch (error) {
            showToast("error", error?.response?.data?.error || "Something went wrong");
        } finally {
            dispatch(fetchUserInfo());
            dispatch(hideLoader());
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    const handleContinue = async (priceId) => {
        dispatch(showLoader());
        try {
            const successRedirectUrl = Linking.createURL("stripe/success");
            const cancelRedirectUrl = Linking.createURL("stripe/cancel");

            const response = await stripeService.createCheckoutSession({
                priceId,
                successRedirectUrl,
                cancelRedirectUrl,
            });

            if (!response.url) {
                showToast("error", "Unable to start checkout.");
                return;
            }

            dispatch(hideLoader());

            const result = await WebBrowser.openAuthSessionAsync(
                response.url,
                successRedirectUrl
            );

            if (result.type === "success") {
                if (result.url?.includes("stripe/cancel")) {
                    showToast("info", "Checkout cancelled.");
                } else {
                    navigation.navigate("Success");
                }
            } else if (result.type === "cancel" || result.type === "dismiss") {
                showToast("info", "Checkout cancelled.");
            }
        } catch (error) {
            showToast("error", error?.response?.data?.error || "Something went wrong");
            dispatch(hideLoader());
        }
    };

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.card}>
                    <View style={styles.headingRow}>
                        <Text style={styles.headingText}>Select a plan according to your needs</Text>
                        <Text style={styles.headingSubText}>
                            (Please contact sales for more than 50 listings)
                        </Text>
                    </View>

                    {products?.length > 0 ? (
                        <View style={styles.planList}>
                            {products.map((plan, idx) => {
                                const isCurrentPlan = info.status && plan.productId === info.productId;
                                return (
                                    <View
                                        key={idx}
                                        style={[styles.planCard, isCurrentPlan && styles.planCardCurrent]}
                                    >
                                        {/* Plan name + price */}
                                        <View style={styles.planCardHeader}>
                                            <View style={styles.planNameWrap}>
                                                <Text style={styles.planName}>{plan.name}</Text>
                                                {isCurrentPlan && (
                                                    <View style={styles.currentBadge}>
                                                        <Text style={styles.currentBadgeText}>Current Plan</Text>
                                                    </View>
                                                )}
                                            </View>
                                            <View style={styles.priceRow}>
                                                <Text style={styles.priceText}>${plan.price}</Text>
                                                <Text style={styles.priceSuffix}>
                                                    /{plan.duration > 1 ? plan.duration : ""}month
                                                </Text>
                                            </View>
                                        </View>

                                        {/* Listings included */}
                                        <View style={styles.listingsRow}>
                                            <Text style={styles.listingsLabel}>Listings Included</Text>
                                            <Text style={styles.listingsValue}>{plan.listings}</Text>
                                        </View>

                                        {/* Features */}
                                        <View style={styles.featureList}>
                                            {allFeatures.map((feature, i) => {
                                                const included = plan.features.includes(feature);
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

                                        <TouchableOpacity
                                            disabled={info.status}
                                            onPress={() => {
                                                if (info.status) {
                                                    showToast("error", "You already have a subscription");
                                                    return;
                                                }
                                                handleContinue(plan.priceId);
                                            }}
                                            style={[
                                                styles.planButton,
                                                isCurrentPlan && styles.planButtonDisabled,
                                            ]}
                                        >
                                            <Text style={styles.planButtonText}>{plan.name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </View>
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateText}>No plans available right now.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default Plans;