import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    Image,
    ScrollView,
    FlatList,
} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from "./HomeStyles";
import PromoVideo from './components/PromoVideo/PromoVideo';
import TruckCard from './components/TruckCard/TruckCard';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../redux/loaderSlice';
import truckService from '../../../services/truckService';
import { useNavigation } from '@react-navigation/native';

import Aggregateandmining from '../../../../assets/images/trucks/Aggregateandmining.png';
import Constructionequipment from '../../../../assets/images/trucks/Constructionequipment.png';
import Farmequipment from '../../../../assets/images/trucks/Farmequipment.png';
import IndustrialEquipment from '../../../../assets/images/trucks/Industrial Equipment.png';
import Liftingequipment from '../../../../assets/images/trucks/Liftingequipment.png';
import Loggingequipment from '../../../../assets/images/trucks/Loggingequipment.png';
import others from '../../../../assets/images/trucks/others.png';
import RV from '../../../../assets/images/trucks/RV.png';
import Trailer from '../../../../assets/images/trucks/Trailer.png';
import trucks from '../../../../assets/images/trucks/trucks.png';

import { truckSubCategories } from '../../../data/Content';
import { countries } from '../../../data/countries';


const Home = () => {

    const [listData, setListData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchCountry, setSearchCountry] = useState('');
    const [listingType, setListingType] = useState('');
    const [truckCategory, settruckCategory] = useState('');
    const [truckSubCategory, setTruckSubCategory] = useState('');

    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState({
        totalPages: 0,
        totalCount: 0,
        currentPage: 1
    });


    const dispatch = useDispatch();
    const navigation = useNavigation();

    const listingTypes = [
        { label: 'For Sale', value: 'For Sale' },
        { label: 'For Lease', value: 'For Lease' },
        { label: 'For Auction', value: 'For Auction' },
    ];

    const truckCategoryData = [
        { label: 'Trucks', value: 'Trucks' },
        { label: 'Trailers', value: 'Trailers' },
        { label: 'Construction Equipment', value: 'Construction Equipment' },
        { label: 'Logging Equipment', value: 'Logging Equipment' },
        { label: 'Farm Equipment', value: 'Farm Equipment' },
        { label: 'Aggregate and Mining Equipment', value: 'Aggregate and Mining Equipment' },
        { label: 'Lifting Equipment', value: 'Lifting Equipment' },
        { label: 'Industrial Equipment', value: 'Industrial Equipment' },
        { label: 'RVs', value: 'RVs' },
        { label: 'Others', value: 'Others' },
    ];

    const truckCategoryDataWithImage = [
        { name: 'Trucks', image: trucks },
        { name: 'Trailers', image: Trailer },
        { name: 'Construction Equipment', image: Constructionequipment },
        { name: 'Logging Equipment', image: Loggingequipment },
        { name: 'Farm Equipment', image: Farmequipment },
        { name: 'Aggregate and Mining Equipment', image: Aggregateandmining },
        { name: 'Lifting Equipment', image: Liftingequipment },
        { name: 'Industrial Equipment', image: IndustrialEquipment },
        { name: 'RVs', image: RV },
        { name: 'Others', image: others },
    ];

    const fetchAllTrucks = async (pageIndex = 1) => {
        dispatch(showLoader());
        try {
            const response = await truckService.getAllTrucksWithFilter({
                pageIndex,
                limit: 5,
                Featured: true,
                searchText,
                country: searchCountry,
                listingType,
                truckCategory
            });
            setListData(response.trucks);
            setPagination({
                totalPages: response.totalPages || 0,
                totalCount: response.totalCount || 0,
                currentPage: pageIndex
            });
            setPage(pageIndex);
        } catch (error) {
            console.log('ERROR:', error.message);
        } finally {
            dispatch(hideLoader());
        }
    };



    useEffect(() => {
        fetchAllTrucks();
    }, []);

    const handlePageChange = useCallback((newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchAllTrucks(newPage);
        }
    }, [pagination.totalPages]);

    const handleSearch = () => {
        navigation.navigate("Filter", {
            searchText,
            country: searchCountry,
            listingType,
            truckCategory,
            truckSubCategory
        });
    };

    const renderPagination = () => {

        if (!listData || listData.length === 0 || pagination.totalPages <= 1) {
            return null;
        }

        const maxVisible = 5;

        let startPage = Math.max(
            1,
            page - Math.floor(maxVisible / 2)
        );

        let endPage = Math.min(
            pagination.totalPages,
            startPage + maxVisible - 1
        );

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(
                1,
                endPage - maxVisible + 1
            );
        }

        const pages = [];

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return (
            <View style={styles.paginationWrapper}>

                <View style={styles.paginationInnerContainer}>

                    <Pressable
                        style={[
                            styles.paginationArrow,
                            page === 1 && styles.paginationDisabled
                        ]}
                        onPress={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={18}
                            color={page === 1 ? "#ccc" : "#333"}
                        />
                    </Pressable>

                    {pages.map((item) => (

                        <Pressable
                            key={item}
                            style={[
                                styles.paginationButton,
                                page === item &&
                                styles.paginationButtonActive
                            ]}
                            onPress={() => handlePageChange(item)}
                        >
                            <Text
                                style={[
                                    styles.paginationButtonText,
                                    page === item &&
                                    styles.paginationButtonTextActive
                                ]}
                            >
                                {item}
                            </Text>
                        </Pressable>

                    ))}

                    <Pressable
                        style={[
                            styles.paginationArrow,
                            page === pagination.totalPages &&
                            styles.paginationDisabled
                        ]}
                        onPress={() => handlePageChange(page + 1)}
                        disabled={page === pagination.totalPages}
                    >
                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color={
                                page === pagination.totalPages
                                    ? "#ccc"
                                    : "#333"
                            }
                        />
                    </Pressable>

                </View>

                <Text style={styles.paginationInfo}>
                    Page {page} of {pagination.totalPages}
                    {" · "}
                    {pagination.totalCount} results
                </Text>

            </View>
        );
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
        >

            <View style={styles.container}>

                <PromoVideo />

                {/* Hero Section */}

                <View style={styles.heroContainer}>

                    <View style={styles.leftSection}>

                        <Text style={styles.heading}>
                            Drive Your{"\n"}Business Forward
                        </Text>

                        <Text style={styles.subHeading}>
                            Sell Equipment with Confidence!
                        </Text>

                        {/* Search Input */}

                        <View style={styles.searchContainer}>

                            <TextInput
                                placeholder='Search for Equipment'
                                placeholderTextColor="#9ca3af"
                                value={searchText}
                                onChangeText={setSearchText}
                                style={styles.searchInput}
                            />

                            <Pressable
                                onPress={handleSearch}
                                style={({ pressed }) => [
                                    styles.searchIconContainer,
                                    pressed && styles.buttonPressed
                                ]}
                            >
                                <Ionicons
                                    name='search'
                                    size={22}
                                    color="#8E8E8E"
                                />
                            </Pressable>

                        </View>

                        {/* Filters */}

                        <View style={styles.filtersContainer}>

                            <Dropdown
                                style={styles.dropdown}
                                placeholder="Listing Type"
                                placeholderStyle={styles.dropdownPlaceholder}
                                data={listingTypes}
                                labelField="label"
                                valueField="value"
                                value={listingType}
                                onChange={(item) => setListingType(item.value)}
                            />

                            <Dropdown
                                style={styles.dropdown}
                                placeholder="Category"
                                placeholderStyle={styles.dropdownPlaceholder}
                                data={truckCategoryData}
                                labelField="label"
                                valueField="value"
                                value={truckCategory}
                                onChange={(item) => settruckCategory(item.value)}
                            />

                            <Dropdown
                                style={styles.dropdown}
                                placeholder="Subcategory"
                                placeholderStyle={styles.dropdownPlaceholder}
                                data={
                                    truckCategory
                                        ? truckSubCategories[truckCategory]?.map((item) => ({
                                            label: item,
                                            value: item
                                        }))
                                        : []
                                }
                                labelField="label"
                                valueField="value"
                                value={truckSubCategory}
                                onChange={(item) => setTruckSubCategory(item.value)}
                            />

                            <Dropdown
                                style={styles.dropdown}
                                placeholder="All Countries"
                                placeholderStyle={styles.dropdownPlaceholder}
                                data={countries}
                                labelField="label"
                                valueField="value"
                                value={searchCountry}
                                search
                                searchPlaceholder="Search country..."
                                onChange={(item) => setSearchCountry(item.value)}
                            />

                            <Pressable
                                onPress={handleSearch}
                                style={({ pressed }) => [
                                    styles.filterButton,
                                    pressed && styles.buttonPressed
                                ]}
                            >
                                <Ionicons
                                    name='search'
                                    size={22}
                                    color="#fff"
                                />
                            </Pressable>

                        </View>

                    </View>

                </View>

                {/* Browse by Type */}

                <View style={styles.typeSection}>

                    <Text style={styles.sectionHeading}>
                        Browse by Type
                    </Text>

                    <View style={styles.categoryWrapper}>

                        {truckCategoryDataWithImage.map((truck, index) => (

                            <Pressable
                                key={index}
                                onPress={() => {
                                    navigation.navigate("Filter", {
                                        searchText,
                                        country: searchCountry,
                                        listingType,
                                        truckCategory: truck.name
                                    });
                                }}
                                style={({ pressed }) => [
                                    styles.categoryCard,
                                    pressed && styles.buttonPressed
                                ]}
                            >

                                <Image
                                    source={truck.image}
                                    style={styles.categoryImage}
                                    resizeMode='contain'
                                />

                                <Text style={styles.categoryText}>
                                    {truck.name}
                                </Text>

                            </Pressable>

                        ))}

                    </View>

                </View>

                {/* Featured Listings */}

                <View style={styles.featuredSection}>

                    <Text style={styles.sectionHeading}>
                        Featured Listings
                    </Text>

                    <View style={styles.truckContainer}>

                        {listData?.map((truck, index) => (
                            <TruckCard
                                key={index}
                                images={truck?.images}
                                title={truck?.vehicleName}
                                price={truck?.vehiclePrice}
                                location={truck?.country}
                                miles={truck?.mileage}
                                data={truck}
                            />
                        ))}

                    </View>

                    {renderPagination()}

                </View>

            </View>

        </ScrollView>
    )
};

export default Home;