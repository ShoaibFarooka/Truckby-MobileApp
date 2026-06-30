import { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../../../redux/loaderSlice';
import truckService from '../../../services/truckService';
import ImageCarousel from './components/ImageCarousel/ImageCarousel';
import Info from './components/Info/Info';
import DetailInfo from './components/DetailInfo/DetailInfo';
import { styles } from './DetailPageStyles';

const formatNumberWithCommas = (num) => {
    if (num === null || num === undefined || num === '') return '';
    return Number(num).toLocaleString();
};

const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    const cleaned = String(phone).replace(/\D/g, '');
    if (cleaned.length === 10)
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    if (cleaned.length === 11)
        return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    return String(phone);
};

const DetailPage = ({ route }) => {
    const { id, data: routeData } = route.params || {};
    const [data, setData] = useState(routeData || {});
    const dispatch = useDispatch();

    useEffect(() => {
        if (!routeData && id) {
            const fetchData = async () => {
                try {
                    dispatch(showLoader());
                    const response = await truckService.getTruckById(id);
                    setData(response);
                } catch (err) {
                    console.error('Error fetching truck:', err);
                } finally {
                    dispatch(hideLoader());
                }
            };
            fetchData();
        }
    }, [id, routeData]);

    const sampleData = {
        General: {
            'Equipment Category': data?.truckCategory,
            'Equipment Subcategory': data?.truckSubCategory,
            'Listing Type': data?.listingType,
            'Country': data?.country,
            'Year': data?.modelYear,
            'Make': data?.vehicleManufacturer,
            'Model': data?.model,
            'Unit Number': data?.unitNumber,
            'Mileage': formatNumberWithCommas(data?.mileage),
            'VIN': data?.vin,
            'Condition': data?.condition,
            'Hours': formatNumberWithCommas(data?.hours),
        },
        'Contact Information': {
            'Name': data?.name,
            'Phone': formatPhoneNumber(data?.phone),
            'Address': data?.address,
            'Company Name': data?.companyName,
        },
        'Vehicle Info': {
            'Wheelbase': data?.wheelbase,
            'Steering': data?.steering,
            'Color': data?.color,
            'Suspension': data?.suspension,
            'Engine Model': data?.engineModel,
            'Engine Manufacturer': data?.engineManufacturer,
            'Engine Horsepower': formatNumberWithCommas(data?.hoursPower),
        },
        'Powertrain': {
            'Transmission Manufacturer': data?.transmissionManufacturer,
            'Transmission Type': data?.transmissionType,
            'No of Speeds': data?.noofSpeeds,
        },
        'Chassis': {
            'Front Axle Weight': formatNumberWithCommas(data?.frontAxleWeight),
            'Rear Axle Weight': formatNumberWithCommas(data?.backAxleWeight),
            'Gross Vehicle Weight': formatNumberWithCommas(data?.grossVehicleWeight),
            'Axle': data?.typeofRearAxles,
        },
        'Description': {
            'Description': data?.description,
        },
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <ImageCarousel images={data?.images || []} />
            <Info data={data} />
            <DetailInfo data={sampleData} />
        </ScrollView>
    );
};

export default DetailPage;