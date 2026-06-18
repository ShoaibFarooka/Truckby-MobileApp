import React, { useEffect, useRef, useState } from "react";

import {
    View,
    Text,
    ScrollView,
    TextInput,
    Pressable,
    FlatList,
    Modal,
} from "react-native";

import { useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from "./FilterPageStyles";
import FilterComponent from "./components/FilterComponent/FilterComponent";
import TruckCard from "./components/TruckCard/TruckCard";
import { countries } from "../../../data/countries";
import { truckSubCategories } from "../../../data/Content";
import truckService from "../../../services/truckService";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../redux/loaderSlice";

const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
};

const FilterPage = () => {


    const route = useRoute();
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();

    const {
        searchText: initialSearchText = "",
        listingType: initialListingType = "",
        truckCategory: initialTruckCategory = "",
        truckSubCategory: initialTruckSubCategory = "",
        country: initialCountry = "",
    } = route.params ?? {};

    const [showFilters, setShowFilters] = useState(false);
    const [searchText, setSearchText] = useState(initialSearchText);
    const debouncedSearchText = useDebounce(searchText, 500);
    const [currentPage, setCurrentPage] = useState(1);

    const [filters, setFilters] = useState({
        listingType: initialListingType,
        truckCategory: initialTruckCategory,
        truckSubCategory: initialTruckSubCategory,
        country: initialCountry,
        model: "",
        vehicleManufacturer: "",
        minYear: "",
        maxYear: "",
        minMileage: "",
        maxMileage: "",
        engineManufacturer: "",
        engineModel: "",
        minHorsepower: "",
        maxHorsepower: "",
        minWheelbase: "",
        maxWheelbase: "",
        suspension: "",
        typeofRearAxles: "",
        minFrontAxleWeight: "",
        maxFrontAxleWeight: "",
        minBackAxleWeight: "",
        maxBackAxleWeight: "",
        transmissionType: "",
        noofSpeeds: "",
        condition: [],
    });

    const listingTypes = [
        { label: "For Sale", value: "For Sale" },
        { label: "For Lease", value: "For Lease" },
        { label: "For Auction", value: "For Auction" },
    ];

    const truckCategoryData = [
        "Trucks", "Trailers", "Construction Equipment",
        "Logging Equipment", "Farm Equipment",
        "Aggregate and Mining Equipment", "Lifting Equipment",
        "Industrial Equipment", "RVs", "Others",
    ];

    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [pagination, setPagination] = useState({
        totalPages: 0,
        totalCount: 0,
        currentPage: 1
    });



    const fetchTrucks = async (pageIndex = 1) => {
        setLoading(true);
        dispatch(showLoader());

        try {
            const combinedFilters = {
                pageIndex,
                limit: 5,
                searchText: debouncedSearchText,
                listingType: filters.listingType,
                truckCategory: filters.truckCategory,
                truckSubCategory: filters.truckSubCategory,
                country: filters.country,
            };

            const response = await truckService.getAllTrucksWithFilter(combinedFilters);

            setListData(response?.trucks || []);

            setPagination({
                totalPages: response?.totalPages || 0,
                totalCount: response?.totalCount || 0,
                currentPage: pageIndex,
            });

            setCurrentPage(pageIndex);

        } catch (error) {
            console.log("FETCH TRUCK ERROR:", error?.message);
        } finally {
            setLoading(false);
            dispatch(hideLoader());
        }
    };

    useEffect(() => {
        fetchTrucks(1);
    }, []);

    useEffect(() => {
        fetchTrucks(1);
    }, [
        debouncedSearchText,
        filters.listingType,
        filters.truckCategory,
        filters.truckSubCategory,
        filters.country
    ]);

    const totalPages = pagination.totalPages;

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchTrucks(newPage);
        }
    };

    const activeFilterCount = Object.entries(filters).filter(
        ([, v]) => (Array.isArray(v) ? v.length > 0 : !!v)
    ).length;

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) pages.push(i);

        return (
            <View style={styles.paginationWrapper}>
                <View style={styles.paginationContainer}>

                    <Pressable
                        style={[styles.paginationArrow, currentPage === 1 && styles.paginationDisabled]}
                        onPress={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <Ionicons name="chevron-back" size={18} color={currentPage === 1 ? "#ccc" : "#333"} />
                    </Pressable>

                    {pages.map((page) => (
                        <Pressable
                            key={page}
                            style={[styles.paginationButton, currentPage === page && styles.paginationButtonActive]}
                            onPress={() => handlePageChange(page)}
                        >
                            <Text style={[styles.paginationButtonText, currentPage === page && styles.paginationButtonTextActive]}>
                                {page}
                            </Text>
                        </Pressable>
                    ))}

                    <Pressable
                        style={[styles.paginationArrow, currentPage === totalPages && styles.paginationDisabled]}
                        onPress={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <Ionicons name="chevron-forward" size={18} color={currentPage === totalPages ? "#ccc" : "#333"} />
                    </Pressable>

                </View>

                <Text style={styles.paginationInfo}>
                    Page {pagination.currentPage} of {pagination.totalPages}
                    {" · "}
                    {pagination.totalCount} results
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Top Search Section */}
                <View style={styles.searchSection}>

                    <View style={styles.topFilterContainer}>

                        <Dropdown
                            style={styles.topDropdown}
                            placeholder="Listing Type"
                            placeholderStyle={styles.dropdownPlaceholder}
                            data={listingTypes}
                            labelField="label"
                            valueField="value"
                            value={filters.listingType}
                            onChange={(item) =>
                                setFilters((prev) => ({ ...prev, listingType: item.value }))
                            }
                        />

                        <Dropdown
                            style={styles.topDropdown}
                            placeholder="Category"
                            placeholderStyle={styles.dropdownPlaceholder}
                            data={truckCategoryData.map((item) => ({ label: item, value: item }))}
                            labelField="label"
                            valueField="value"
                            value={filters.truckCategory}
                            onChange={(item) =>
                                setFilters((prev) => ({ ...prev, truckCategory: item.value }))
                            }
                        />

                        <Dropdown
                            style={styles.topDropdown}
                            placeholder="Subcategory"
                            placeholderStyle={styles.dropdownPlaceholder}
                            data={
                                truckSubCategories[filters.truckCategory]?.map((item) => ({
                                    label: item,
                                    value: item,
                                })) || []
                            }
                            labelField="label"
                            valueField="value"
                            value={filters.truckSubCategory}
                            onChange={(item) =>
                                setFilters((prev) => ({ ...prev, truckSubCategory: item.value }))
                            }
                        />

                        <Dropdown
                            style={styles.topDropdown}
                            placeholder="All Countries"
                            placeholderStyle={styles.dropdownPlaceholder}
                            search
                            searchPlaceholder="Search country..."
                            data={countries}
                            labelField="label"
                            valueField="value"
                            value={filters.country}
                            onChange={(item) =>
                                setFilters((prev) => ({ ...prev, country: item.value }))
                            }
                        />

                    </View>

                    <View style={styles.searchInputContainer}>
                        <TextInput
                            placeholder="Search for Equipment"
                            placeholderTextColor="#8E8E8E"
                            value={searchText}
                            onChangeText={setSearchText}
                            style={styles.searchInput}
                        />
                        <Pressable style={styles.searchIconContainer}>
                            <Ionicons name="search" size={24} color="#8E8E8E" />
                        </Pressable>
                    </View>

                </View>

                <Text style={styles.heading}>Equipment For Sale</Text>

                <View style={styles.headingRow}>
                    <Pressable
                        style={styles.filterButton}
                        onPress={() => setShowFilters(true)}
                    >
                        <Ionicons name="options-outline" size={18} color="#fff" />
                        <Text style={styles.filterButtonText}>Filters</Text>

                        {activeFilterCount > 0 && (
                            <View style={styles.filterBadge}>
                                <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
                            </View>
                        )}
                    </Pressable>
                </View>

                <View style={styles.cardsContainer}>
                    <FlatList
                        data={listData}
                        keyExtractor={(item) => item._id}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TruckCard
                                images={item.images}
                                title={item.vehicleName}
                                price={item.vehiclePrice}
                                location={item.country}
                                miles={item.mileage}
                                data={item}
                            />
                        )}
                        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
                    />
                </View>

                {renderPagination()}

                <View style={{ height: 40 }} />

            </ScrollView>

            {/* Filter Modal */}
            <Modal
                visible={showFilters}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowFilters(false)}
            >
                <View style={styles.modalOverlay}>
                    <Pressable
                        style={styles.modalBackdrop}
                        onPress={() => setShowFilters(false)}
                    />
                    <View style={[
                        styles.modalPanel,
                        {
                            marginTop: insets.top,
                            marginBottom: insets.bottom,
                        }
                    ]}>
                        <FilterComponent
                            filters={filters}
                            setFilters={setFilters}
                            onClose={() => setShowFilters(false)}
                        />
                    </View>
                </View>
            </Modal>

        </View>
    );
};

export default FilterPage;