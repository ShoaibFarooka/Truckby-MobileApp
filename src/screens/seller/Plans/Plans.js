import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Linking } from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Toast } from "toastify-react-native";
import * as WebBrowser from "expo-web-browser";
import subscriptionService from "../../../services/subscriptionService";
import productService from "../../../services/productService";
import stripeService from "../../../services/stripeService";
import { showLoader, hideLoader } from "../../../redux/loaderSlice";
import { fetchUserInfo } from "../../../redux/userSlice";
import { styles } from "./PlansStyles";


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
            const response = await stripeService.createCheckoutSession(
                { priceId },
                { headers: { "x-platform": "mobile" } } // make sure your service sends this header
            );

            if (response.url) {
                const result = await WebBrowser.openAuthSessionAsync(
                    response.url,
                    "truckby://stripe/success" // must match your registered scheme + success path
                );

                if (result.type === "success") {
                    showToast("success", "Subscription successful!");
                    dispatch(fetchUserInfo());
                    getSubscriptionInfo();
                } else if (result.type === "cancel" || result.type === "dismiss") {
                    showToast("info", "Checkout cancelled");
                }
            }
        } catch (error) {
            showToast("error", error?.response?.data?.error || "Something went wrong");
        } finally {
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
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.table}>
                                {/* Header row: label + each plan's price/button */}
                                <View style={styles.row}>
                                    <View style={styles.labelCell}>
                                        <Text style={styles.labelCellText}>Compare plans</Text>
                                    </View>

                                    {products.map((plan, idx) => {
                                        const isCurrentPlan = info.status && plan.productId === info.productId;
                                        return (
                                            <View key={idx} style={styles.headerCell}>
                                                <View style={styles.priceRow}>
                                                    <Text style={styles.priceText}>${plan.price}</Text>
                                                    <Text style={styles.priceSuffix}>
                                                        /{plan.duration > 1 ? plan.duration : ""}month
                                                    </Text>
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

                                {/* Listings included row */}
                                <View style={styles.row}>
                                    <View style={styles.labelCell}>
                                        <Text style={styles.labelCellText}>Listings Included</Text>
                                    </View>
                                    {products.map((plan, i) => (
                                        <View key={i} style={styles.dataCell}>
                                            <Text style={styles.dataCellBoldText}>{plan.listings}</Text>
                                        </View>
                                    ))}
                                </View>

                                {/* Feature rows */}
                                {allFeatures.map((feature, idx) => (
                                    <View key={idx} style={styles.row}>
                                        <View style={styles.labelCell}>
                                            <Text style={styles.labelCellText}>{feature}</Text>
                                        </View>
                                        {products.map((plan, i) => (
                                            <View key={i} style={styles.dataCell}>
                                                {plan.features.includes(feature) ? (
                                                    <Ionicons name="checkmark" size={18} color="#10B981" />
                                                ) : (
                                                    <Text style={styles.dataCellText}>-</Text>
                                                )}
                                            </View>
                                        ))}
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
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