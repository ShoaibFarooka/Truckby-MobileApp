import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "toastify-react-native";
import TruckCard from "./components/TruckCard";
import ExpirePlan from "./components/ExpirePlan";
import DeleteConfirmationModal from "../../../components/Delete/DeleteConformationModal.js";
import truckService from "../../../services/truckService";
import subscriptionService from "../../../services/subscriptionService";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import { styles } from "./LisitngStyles.js";

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


const Listing = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [listData, setListData] = useState([]);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteTruckId, setDeleteTruckId] = useState(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;
    const [productData, setProductData] = useState(null);
    const [info, setInfo] = useState({
        status: false,
        planName: "",
        productId: "",
        subscriptionId: "",
        amount: null,
    });

    const fetchAllTrucks = async (currentPage = 1) => {
        dispatch(showLoader());
        try {
            const response = await truckService.getAllTrucksByUser(currentPage, limit);
            setListData(response.data);
            setTotalPages(response.totalPages || 1);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            dispatch(hideLoader());
        }
    };

    useEffect(() => {
        fetchAllTrucks(page);
    }, [page]);

    const handleDeleteClick = (id) => {
        setDeleteTruckId(id);
        setDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteTruckId) return;
        dispatch(showLoader());
        try {
            await truckService.deleteTruck(deleteTruckId);
            setListData((prev) => prev.filter((list) => list._id !== deleteTruckId));
            showToast("success", "Equipment deleted successfully");
            await fetchAllTrucks(page);
        } catch (error) {
            console.error("Error deleting service:", error);
            showToast("error", "Failed to delete service");
        } finally {
            dispatch(hideLoader());
            setDeleteOpen(false);
        }
    };

    useEffect(() => {
        const getSubscriptionInfo = async () => {
            dispatch(showLoader());
            try {
                const response = await subscriptionService.getUserSubscriptionInfo();
                if (response.info) {
                    setInfo(response.info);
                    setProductData(response.productData);
                }
            } catch (error) {
                showToast("error", error?.response?.data?.error || "Something went wrong");
            } finally {
                dispatch(hideLoader());
            }
        };

        getSubscriptionInfo();
    }, []);

    const isLimitExceeded = () => {
        if (listData.length >= productData?.listings) {
            showToast(
                "error",
                `Your current membership allows only up to ${productData?.listings} listing${productData?.listings > 1 ? "s" : ""
                }. You can't exceed this limit.`
            );
            return true;
        }
        return false;
    };

    const handleAddEquipment = () => {
        if (info.status) {
            if (!isLimitExceeded()) navigation.navigate("AddTruck");
        } else {
            navigation.navigate("Plans");
        }
    };

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerRow}>
                    <Text style={styles.headerTitle}>My Listings</Text>
                    <TouchableOpacity style={styles.addButton} onPress={handleAddEquipment}>
                        <Text style={styles.addButtonText}>Add Equipment</Text>
                    </TouchableOpacity>
                </View>

                {listData?.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>No listings yet.</Text>
                    </View>
                ) : (
                    listData.map((item, index) => (
                        <View key={item?._id || String(index)} style={styles.cardSpacing}>
                            <TruckCard data={item} handleDeleteClick={handleDeleteClick} />
                        </View>
                    ))
                )}

                {listData?.length > 0 && (
                    <View style={styles.paginationRow}>
                        <TouchableOpacity
                            style={[styles.pageButton, page === 1 && styles.pageButtonDisabled]}
                            onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >
                            <Text style={styles.pageButtonText}>Previous</Text>
                        </TouchableOpacity>

                        <Text style={styles.pageLabel}>
                            Page {page} of {totalPages}
                        </Text>

                        <TouchableOpacity
                            style={[styles.pageButton, page === totalPages && styles.pageButtonDisabled]}
                            onPress={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                        >
                            <Text style={styles.pageButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {info.subscriptionId !== "" && !info.status && <ExpirePlan />}
            </ScrollView>

            <DeleteConfirmationModal
                visible={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </View>
    );
};

export default Listing;