import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Toast } from "toastify-react-native";
import { showApiError } from "../../../utils/apiError";

import styles from "./InventoryStyles";

import { showLoader, hideLoader } from "../../../redux/loaderSlice";
import truckService from "../../../services/truckService";
import { formatPhoneNumber } from "../../../utils/extra";
import useHideLoaderAfterRender from "../../../hooks/useHideLoaderAfterRender";

import TruckCard from "../../../components/TruckCard/TruckCard";
import EmptyState from "../../../components/EmptyState/EmptyState";
import InventoryFallback from "./components/InventoryFallback";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || "";

const Inventory = () => {
    const route = useRoute();

    const userId = route.params?.userId;

    const dispatch = useDispatch();
    const hideLoaderAfterRender = useHideLoaderAfterRender();

    const [sellerInfo, setSellerInfo] = useState(null);
    const [trucks, setTrucks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // 'loading' | 'ready' | 'error'; the empty message only shows once loading is done
    const [listStatus, setListStatus] = useState('loading');

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

            setTrucks(trucks || []);
            setTotalPages(totalPages || 1);
            setListStatus('ready');
            // Keep the loader up until the new cards are laid out and painted
            hideLoaderAfterRender();
        } catch (error) {
            showApiError(error, "Unable to fetch Inventory try again!");
            setListStatus('error');
            dispatch(hideLoader());
        }
    };

    useEffect(() => {
        if (userId && isValidUserId) {
            fetchInventory(page);
        }
    }, [userId, page]);

    // The effect above fetches when page changes, so don't fetch here too
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleCopyLink = async () => {
        const shareableLink = `${BASE_URL}/inventory/${sellerInfo.id}`;

        try {
            await Clipboard.setStringAsync(shareableLink);
            Toast.success("Link copied to ClipBoard");
        } catch (error) {
            Toast.error("Unable to copy link try again!");
        }
    };

    if (!isValidUserId) {
        return <InventoryFallback />;
    }

    return (
        // Plain View: Layout already provides the ScrollView, and a nested
        // vertical ScrollView competes with it for touches
        <View style={styles.container}>
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
                keyboardShouldPersistTaps="handled"
                data={trucks}
                scrollEnabled={false}
                keyExtractor={(item, index) => item?._id || index.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <TruckCard
                        images={item?.images}
                        title={item?.vehicleName}
                        price={item?.vehiclePrice}
                        country={item?.country}
                        state={item?.state}
                        miles={item?.mileage}
                        featured={item?.Featured === true}
                        data={item}
                    />
                )}
            />

            {listStatus === 'ready' && trucks.length === 0 && (
                <EmptyState
                    icon="cube-outline"
                    title="No equipment listed yet"
                    message="This seller doesn't have any listings right now. Check back later."
                />
            )}

            {listStatus === 'error' && (
                <EmptyState
                    icon="cloud-offline-outline"
                    title="Couldn't load this inventory"
                    message="Please check your connection and try again."
                    actionLabel="Try Again"
                    onAction={() => fetchInventory(page)}
                />
            )}

            {trucks.length > 0 && (
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
            )}
        </View>
    );
};

export default Inventory;