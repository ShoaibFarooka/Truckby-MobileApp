import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Toast } from "toastify-react-native";

import styles from "./InventoryStyles";

import { showLoader, hideLoader } from "../../../redux/loaderSlice";
import truckService from "../../../services/truckService";
import { formatPhoneNumber } from "../../../utils/extra";

import InventoryTruckCard from "./components/InventoryTruckCard";
import InventoryFallback from "./components/InventoryFallback";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || "";

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
            Toast.info(message);
    }
};


const Inventory = () => {
    const route = useRoute();

    const userId = route.params?.userId;

    const dispatch = useDispatch();

    const [sellerInfo, setSellerInfo] = useState(null);
    const [trucks, setTrucks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const isValidUserId = /^[0-9a-fA-F]{24}$/.test(userId);


    const fetchInventory = async (currentPage = 1) => {
        try {
            dispatch(showLoader());

            const { user, trucks, totalPages } =
                await truckService.getUserInventory(userId, currentPage);

            setSellerInfo({
                id: user._id,
                name: user.companyName || user.name,
                address: `${user.city}, ${user.country === "United States"
                    ? user.state + ", "
                    : ""
                    }${user.country}`,
                phone: user.phone,
                companyName: user.companyName,
                contactName: user.name,
                image: user.image,
            });

            setTrucks(trucks);
            setTotalPages(totalPages);
        } catch (error) {
            showToast("error", "Unable to fetch Inventory try again!");
        } finally {
            dispatch(hideLoader());
        }
    };

    useEffect(() => {
        if (userId && isValidUserId) {
            fetchInventory();
        }
    }, [userId, page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            fetchInventory(newPage);
        }
    };

    const handleCopyLink = async () => {
        const shareableLink = `${BASE_URL}/inventory/${sellerInfo.id}`;

        try {
            await Clipboard.setStringAsync(shareableLink);
            showToast("success", "Link copied to ClipBoard");
        } catch (error) {
            showToast("error", "Unable to copy link try again!");
        }
    };

    if (!isValidUserId) {
        return <InventoryFallback />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <View style={styles.topSection}>
                    <Image
                        source={{ uri: sellerInfo?.image }}
                        style={styles.logo}
                    />

                    <View style={styles.info}>
                        <Text style={styles.companyName}>
                            {sellerInfo?.companyName?.toUpperCase()}
                        </Text>

                        <Text style={styles.text}>
                            <Text style={styles.bold}>Location: </Text>

                            {sellerInfo?.address || "N/A"}
                        </Text>

                        <Text style={styles.text}>
                            <Text style={styles.bold}>Phone: </Text>

                            {sellerInfo?.phone
                                ? formatPhoneNumber(sellerInfo.phone)
                                : "N/A"}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.shareButton}
                    onPress={handleCopyLink}
                >
                    <Ionicons
                        name="copy-outline"
                        size={20}
                        color="#fff"
                    />

                    <Text style={styles.shareText}>Share Link</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={trucks}
                scrollEnabled={false}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <InventoryTruckCard
                        data={item}
                        handleDeleteClick={() => { }}
                    />
                )}
            />

            <View style={styles.pagination}>
                <TouchableOpacity
                    disabled={page === 1}
                    style={[
                        styles.pageButton,
                        page === 1 && styles.disabledButton,
                    ]}
                    onPress={() => handlePageChange(page - 1)}
                >
                    <Text>Previous</Text>
                </TouchableOpacity>

                <Text style={styles.pageText}>
                    {page} / {totalPages}
                </Text>

                <TouchableOpacity
                    disabled={page === totalPages}
                    style={[
                        styles.pageButton,
                        page === totalPages &&
                        styles.disabledButton,
                    ]}
                    onPress={() => handlePageChange(page + 1)}
                >
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Inventory;