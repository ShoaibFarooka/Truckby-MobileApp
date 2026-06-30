import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    Platform,
    KeyboardAvoidingView,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "toastify-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import DraggableImageList from "./components/DraggableImageList";

import truckService from "../../../services/truckService";
import { uploadImg } from "../../../services/image";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import { truckCategory, truckSubCategories } from "../../../data/Content";
import { styles } from "./AddTruckStyles";
import CustomPicker from "./components/CustomPicker";
import { countries } from "../../../data/countries";

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

const AddTruck = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const oldTruckData = route.params?.truckData;
    const [previewImages, setPreviewImages] = useState([]);
    const user = useSelector((state) => state?.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (oldTruckData?.images && Array.isArray(oldTruckData.images)) {
            setPreviewImages(
                oldTruckData.images.map((img) => ({ uri: img, isLocal: false }))
            );
        }
    }, [oldTruckData]);

    const formik = useFormik({
        initialValues: {
            vehicleName: oldTruckData?.vehicleName || "",
            vehiclePrice: oldTruckData?.vehiclePrice ? String(oldTruckData.vehiclePrice) : "",
            truckCategory: oldTruckData?.truckCategory || "",
            truckSubCategory: oldTruckData?.truckSubCategory || "",
            listingType: oldTruckData?.listingType || "",
            name: oldTruckData?.name || user?.name || "",
            phone: oldTruckData?.phone ? String(oldTruckData.phone) : user?.phone ? String(user.phone) : "",
            email: oldTruckData?.email || user?.email || "",
            companyName: oldTruckData?.companyName || user?.companyName || "",
            address: oldTruckData?.address || user?.city || "",
            modelYear: oldTruckData?.modelYear ? String(oldTruckData.modelYear) : "",
            mileage: oldTruckData?.mileage != null ? String(oldTruckData.mileage) : "",
            vehicleManufacturer: oldTruckData?.vehicleManufacturer || "",
            hours: oldTruckData?.hours || "",
            vin: oldTruckData?.vin || "",
            condition: oldTruckData?.condition || "",
            wheelbase: oldTruckData?.wheelbase != null ? String(oldTruckData.wheelbase) : "",
            steering: oldTruckData?.steering || "",
            color: oldTruckData?.color || "",
            suspension: oldTruckData?.suspension || "",
            engineManufacturer: oldTruckData?.engineManufacturer || "",
            engineModel: oldTruckData?.engineModel || "",
            grossVehicleWeight: oldTruckData?.grossVehicleWeight != null ? String(oldTruckData.grossVehicleWeight) : "",
            hoursPower: oldTruckData?.hoursPower != null ? String(oldTruckData.hoursPower) : "",
            description: oldTruckData?.description || "",
            transmissionType: oldTruckData?.transmissionType || "",
            noofSpeeds: oldTruckData?.noofSpeeds || "",
            transmissionManufacturer: oldTruckData?.transmissionManufacturer || "",
            typeofRearAxles: oldTruckData?.typeofRearAxles || "",
            frontAxleWeight: oldTruckData?.frontAxleWeight != null ? String(oldTruckData.frontAxleWeight) : "",
            backAxleWeight: oldTruckData?.backAxleWeight || "",
            country: oldTruckData?.country || "",
            images: oldTruckData?.images || [],
            model: oldTruckData?.model || "",
            unitNumber: oldTruckData?.unitNumber || "",
        },
        validationSchema: Yup.object({
            vehicleName: Yup.string().required("Listing Title is required"),
            name: Yup.string().required("Name is required"),
            companyName: Yup.string().required("Company name is required"),
            phone: Yup.string().required("Phone number is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            country: Yup.string().required("Country is required"),
            listingType: Yup.string().required("Listing type is required"),
            truckCategory: Yup.string().required("Category is required"),
            truckSubCategory: Yup.string().required("Subcategory is required"),
            condition: Yup.string().required("Condition is required"),
            vehicleManufacturer: Yup.string().required("Make is required"),
            modelYear: Yup.string().required("Model year is required"),
            model: Yup.string().required("Model is required"),
            vehiclePrice: Yup.string().required("Price is required"),
            description: Yup.string().required("Description is required"),
            images: Yup.array().min(1, "At least one image is required"),
        }),

        onSubmit: async (values, { setSubmitting, resetForm }) => {
            dispatch(showLoader());
            setSubmitting(true);

            const numericFields = [
                "vehiclePrice", "modelYear", "mileage", "wheelbase",
                "hoursPower", "frontAxleWeight", "backAxleWeight",
                "grossVehicleWeight", "phone",
            ];

            let imageUrls = [];

            try {
                const localImages = previewImages.filter((img) => img.isLocal);
                const remoteImages = previewImages.filter((img) => !img.isLocal);

                if (localImages.length > 0) {
                    const form = new FormData();
                    localImages.forEach((img, idx) => {
                        const uriParts = img.uri.split(".");
                        const fileType = uriParts[uriParts.length - 1];
                        form.append("images", {
                            uri: img.uri,
                            name: `photo_${idx}.${fileType}`,
                            type: `image/${fileType === "jpg" ? "jpeg" : fileType}`,
                        });
                    });

                    const res = await uploadImg(form);
                    if (res?.success) {
                        const uploaded = Array.isArray(res.urls) ? res.urls : res.urls ? [res.urls] : [];
                        let uploadedIdx = 0;
                        imageUrls = previewImages.map((img) =>
                            img.isLocal ? uploaded[uploadedIdx++] : img.uri
                        );
                    } else {
                        showToast("error", "Failed to upload images");
                        setSubmitting(false);
                        dispatch(hideLoader());
                        return;
                    }
                } else {
                    imageUrls = remoteImages.map((img) => img.uri);
                }

                const truckData = { ...values, images: imageUrls };
                numericFields.forEach((field) => {
                    if (truckData[field] !== "") truckData[field] = Number(truckData[field]);
                });

                if (oldTruckData?._id) {
                    await truckService.updateTruck(oldTruckData._id, truckData);
                    showToast("success", "Equipment updated successfully!");
                } else {
                    await truckService.createTruck(truckData);
                    showToast("success", "Equipment listed successfully!");
                    resetForm();
                    setPreviewImages([]);
                }
                navigation.navigate("Listing");
            } catch (error) {
                showToast("error", error?.response?.data?.error || "Listing failed");
                console.error("Listing error:", error);
            } finally {
                dispatch(hideLoader());
                setSubmitting(false);
            }
        },
    });

    const validImageTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    const maxSize = 6 * 1024 * 1024;
    const maxImages = 20;

    const pickImages = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            showToast("error", "Permission to access photos is required");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            // eslint-disable-next-line deprecation/deprecation
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 0.8,
            selectionLimit: maxImages - previewImages.length,
            orderedSelection: true,
        });

        if (result.canceled) return;

        const assets = result.assets || [];
        const accepted = [];

        for (const asset of assets) {
            const type = asset.mimeType ?? asset.type ?? "image/jpeg";
            const normalizedType = type.startsWith("image/") ? type : `image/${type}`;

            if (!validImageTypes.includes(normalizedType)) {
                showToast("error", `Unsupported format: ${normalizedType}`);
                continue;
            }
            if (asset.fileSize && asset.fileSize > maxSize) {
                showToast("error", `"${asset.fileName || "Image"}" exceeds 6MB`);
                continue;
            }
            accepted.push({ uri: asset.uri, isLocal: true });
        }

        if (accepted.length === 0) return;

        const combined = [...previewImages, ...accepted].slice(0, maxImages);
        setPreviewImages(combined);
        formik.setFieldValue("images", combined.map((img) => img.uri));
    };

    const handleRemoveImage = (index) => {
        const updated = previewImages.filter((_, i) => i !== index);
        setPreviewImages(updated);
        formik.setFieldValue("images", updated.map((img) => img.uri));
    };

    const handleSubmit = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length > 0) {
            showToast("error", "Please fill out all required fields");
            return;
        }
        formik.handleSubmit();
    };

    const subCategories = truckSubCategories[formik.values.truckCategory] || [];

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.card}>
                    <Text style={styles.title}>
                        {oldTruckData ? "Update Your Equipment" : "List Your Equipment"}
                    </Text>

                    {/* ── Vehicle Details ── */}
                    <View style={styles.grid}>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Listing Title *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Listing Title"
                                onChangeText={formik.handleChange("vehicleName")}
                                onBlur={formik.handleBlur("vehicleName")}
                                value={formik.values.vehicleName}
                            />
                            {!!formik.errors.vehicleName && formik.touched.vehicleName && (
                                <Text style={styles.errorText}>{formik.errors.vehicleName}</Text>
                            )}
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>
                                Price *{" "}
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="$"
                                keyboardType="numeric"
                                onChangeText={formik.handleChange("vehiclePrice")}
                                onBlur={formik.handleBlur("vehiclePrice")}
                                value={formik.values.vehiclePrice}
                            />
                            {!!formik.errors.vehiclePrice && formik.touched.vehiclePrice && (
                                <Text style={styles.errorText}>{formik.errors.vehiclePrice}</Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.grid}>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Category *</Text>
                            <CustomPicker
                                placeholder="Select Equipment Type"
                                selectedValue={formik.values.truckCategory}
                                onValueChange={(val) => {
                                    formik.setFieldValue("truckCategory", val);
                                    formik.setFieldValue("truckSubCategory", "");
                                }}
                                items={truckCategory.map((c) => ({ label: c, value: c }))}
                            />
                            {!!formik.errors.truckCategory && formik.touched.truckCategory && (
                                <Text style={styles.errorText}>{formik.errors.truckCategory}</Text>
                            )}
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Subcategory *</Text>
                            <CustomPicker
                                placeholder="Select a Subcategory"
                                enabled={!!formik.values.truckCategory}
                                selectedValue={formik.values.truckSubCategory}
                                onValueChange={(val) => formik.setFieldValue("truckSubCategory", val)}
                                items={subCategories.map((s) => ({ label: s, value: s }))}
                            />
                            {!formik.values.truckCategory ? (
                                <Text style={styles.errorText}>First select the Category</Text>
                            ) : (
                                !!formik.errors.truckSubCategory &&
                                formik.touched.truckSubCategory && (
                                    <Text style={styles.errorText}>{formik.errors.truckSubCategory}</Text>
                                )
                            )}
                        </View>
                    </View>

                    <View style={styles.grid}>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Listing Type *</Text>
                            <CustomPicker
                                placeholder="Select Listing Type"
                                selectedValue={formik.values.listingType}
                                onValueChange={(val) => formik.setFieldValue("listingType", val)}
                                items={[
                                    { label: "For Sale", value: "For Sale" },
                                    { label: "For Lease", value: "For Lease" },
                                    { label: "For Auction", value: "For Auction" },
                                ]}
                            />
                            {!!formik.errors.listingType && formik.touched.listingType && (
                                <Text style={styles.errorText}>{formik.errors.listingType}</Text>
                            )}
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Country *</Text>
                            <CustomPicker
                                placeholder="Select Country"
                                selectedValue={formik.values.country}
                                onValueChange={(val) => formik.setFieldValue("country", val)}
                                items={countries}
                            />
                            {!!formik.errors.country && formik.touched.country && (
                                <Text style={styles.errorText}>{formik.errors.country}</Text>
                            )}
                        </View>
                    </View>

                    {/* Image upload */}
                    <View style={styles.fullWidthItem}>
                        <TouchableOpacity style={styles.uploadBox} onPress={pickImages}>
                            <Ionicons name="image-outline" size={28} color="#9ca3af" />
                            <Text style={styles.uploadText}>Tap to upload media</Text>
                            <Text style={styles.uploadSubText}>
                                {previewImages.length}/{maxImages} images · max 6 MB each
                            </Text>
                        </TouchableOpacity>

                        {previewImages.length > 0 && (
                            <DraggableImageList
                                images={previewImages}
                                onRemove={handleRemoveImage}
                                onReorderComplete={(reordered) => {
                                    setPreviewImages(reordered);
                                    formik.setFieldValue("images", reordered.map((img) => img.uri));
                                }}
                            />
                        )}
                        {!!formik.errors.images && formik.touched.images && (
                            <Text style={styles.errorText}>{formik.errors.images}</Text>
                        )}
                    </View>

                    {/* ── Contact Information ── */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>Contact Information</Text>
                    </View>
                    <View style={styles.grid}>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Name *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Name"
                                onChangeText={formik.handleChange("name")}
                                onBlur={formik.handleBlur("name")}
                                value={formik.values.name}
                            />
                            {!!formik.errors.name && formik.touched.name && (
                                <Text style={styles.errorText}>{formik.errors.name}</Text>
                            )}
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Phone *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Phone Number"
                                keyboardType="numeric"
                                onChangeText={formik.handleChange("phone")}
                                onBlur={formik.handleBlur("phone")}
                                value={formik.values.phone}
                            />
                            {!!formik.errors.phone && formik.touched.phone && (
                                <Text style={styles.errorText}>{formik.errors.phone}</Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.grid}>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Email *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={formik.handleChange("email")}
                                onBlur={formik.handleBlur("email")}
                                value={formik.values.email}
                            />
                            {!!formik.errors.email && formik.touched.email && (
                                <Text style={styles.errorText}>{formik.errors.email}</Text>
                            )}
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Company Name *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Company Name"
                                onChangeText={formik.handleChange("companyName")}
                                onBlur={formik.handleBlur("companyName")}
                                value={formik.values.companyName}
                            />
                            {!!formik.errors.companyName && formik.touched.companyName && (
                                <Text style={styles.errorText}>{formik.errors.companyName}</Text>
                            )}
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Location</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Address"
                                onChangeText={formik.handleChange("address")}
                                value={formik.values.address}
                            />
                        </View>
                    </View>

                    {/* ── General ── */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>General</Text>
                    </View>
                    <View style={styles.grid}>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Year *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Year"
                                keyboardType="numeric"
                                onChangeText={formik.handleChange("modelYear")}
                                onBlur={formik.handleBlur("modelYear")}
                                value={formik.values.modelYear}
                            />
                            {!!formik.errors.modelYear && formik.touched.modelYear && (
                                <Text style={styles.errorText}>{formik.errors.modelYear}</Text>
                            )}
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Mileage</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Mileage"
                                keyboardType="numeric"
                                onChangeText={formik.handleChange("mileage")}
                                value={formik.values.mileage}
                            />
                        </View>
                    </View>

                    <View style={styles.grid}>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Make *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Make"
                                onChangeText={formik.handleChange("vehicleManufacturer")}
                                onBlur={formik.handleBlur("vehicleManufacturer")}
                                value={formik.values.vehicleManufacturer}
                            />
                            {!!formik.errors.vehicleManufacturer && formik.touched.vehicleManufacturer && (
                                <Text style={styles.errorText}>{formik.errors.vehicleManufacturer}</Text>
                            )}
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Hours</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Hours"
                                onChangeText={formik.handleChange("hours")}
                                value={formik.values.hours}
                            />
                        </View>
                    </View>

                    <View style={styles.grid}>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>VIN</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter VIN"
                                onChangeText={formik.handleChange("vin")}
                                value={formik.values.vin}
                            />
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Condition *</Text>
                            <CustomPicker
                                placeholder="Select Condition"
                                selectedValue={formik.values.condition}
                                onValueChange={(val) => formik.setFieldValue("condition", val)}
                                items={[
                                    { label: "New", value: "New" },
                                    { label: "Used", value: "Used" },
                                    { label: "Salvaged", value: "Salvaged" },
                                ]}
                            />
                            {!!formik.errors.condition && formik.touched.condition && (
                                <Text style={styles.errorText}>{formik.errors.condition}</Text>
                            )}
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Model *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Model"
                                onChangeText={formik.handleChange("model")}
                                onBlur={formik.handleBlur("model")}
                                value={formik.values.model}
                            />
                            {!!formik.errors.model && formik.touched.model && (
                                <Text style={styles.errorText}>{formik.errors.model}</Text>
                            )}
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Unit Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Unit Number"
                                onChangeText={formik.handleChange("unitNumber")}
                                value={formik.values.unitNumber}
                            />
                        </View>
                    </View>

                    {/* ── Vehicle Info ── */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>Vehicle Info</Text>
                    </View>
                    <View style={styles.grid}>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Wheelbase</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Wheelbase"
                                keyboardType="numeric"
                                onChangeText={formik.handleChange("wheelbase")}
                                value={formik.values.wheelbase}
                            />
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Steering</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Steering"
                                onChangeText={formik.handleChange("steering")}
                                value={formik.values.steering}
                            />
                        </View>
                    </View>

                    <View style={styles.grid}>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Color</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Color"
                                onChangeText={formik.handleChange("color")}
                                value={formik.values.color}
                            />
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Suspension</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Suspension"
                                onChangeText={formik.handleChange("suspension")}
                                value={formik.values.suspension}
                            />
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Engine Manufacturer</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Engine Manufacturer"
                                onChangeText={formik.handleChange("engineManufacturer")}
                                value={formik.values.engineManufacturer}
                            />
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Horse Power</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Horse Power"
                                keyboardType="numeric"
                                onChangeText={formik.handleChange("hoursPower")}
                                value={formik.values.hoursPower}
                            />
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Engine Model</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Engine Model"
                                onChangeText={formik.handleChange("engineModel")}
                                value={formik.values.engineModel}
                            />
                        </View>
                    </View>

                    {/* ── Powertrain ── */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>Powertrain</Text>
                    </View>
                    <View style={styles.grid}>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Transmission Type</Text>
                            <CustomPicker
                                placeholder="Select transmission type"
                                selectedValue={formik.values.transmissionType}
                                onValueChange={(val) => formik.setFieldValue("transmissionType", val)}
                                items={[
                                    { label: "Automatic", value: "Automatic" },
                                    { label: "Manual", value: "Manual" },
                                    { label: "Semi Auto", value: "Semi Auto" },
                                ]}
                            />
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Number of Speeds</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Speed"
                                onChangeText={formik.handleChange("noofSpeeds")}
                                value={formik.values.noofSpeeds}
                            />
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Transmission Manufacturer</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Transmission Manufacturer"
                                onChangeText={formik.handleChange("transmissionManufacturer")}
                                value={formik.values.transmissionManufacturer}
                            />
                        </View>
                    </View>

                    {/* ── Chassis ── */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>Chassis</Text>
                    </View>
                    <View style={styles.grid}>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Axle</Text>
                            <CustomPicker
                                placeholder="Select axle type"
                                selectedValue={formik.values.typeofRearAxles}
                                onValueChange={(val) => formik.setFieldValue("typeofRearAxles", val)}
                                items={[
                                    { label: "Single Axle", value: "Single Axle" },
                                    { label: "Regular Tandem", value: "Regular Tandem" },
                                    { label: "Tri Axle", value: "Tri Axle" },
                                    { label: "Quad Axle", value: "Quad Axle" },
                                    { label: "Other", value: "Other" },
                                ]}
                            />
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Front Axle Weight</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g lbs"
                                keyboardType="numeric"
                                onChangeText={formik.handleChange("frontAxleWeight")}
                                value={formik.values.frontAxleWeight}
                            />
                        </View>
                    </View>

                    <View style={styles.grid}>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Rear Axle Weight</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g lbs"
                                keyboardType="numeric"
                                onChangeText={formik.handleChange("backAxleWeight")}
                                value={formik.values.backAxleWeight}
                            />
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Gross Vehicle Weight</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g Heavy Weight"
                                keyboardType="numeric"
                                onChangeText={formik.handleChange("grossVehicleWeight")}
                                value={formik.values.grossVehicleWeight}
                            />
                        </View>
                    </View>

                    {/* ── Description ── */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>Description</Text>
                    </View>
                    <View style={styles.fullWidthItem}>
                        <Text style={styles.label}>Description *</Text>
                        <TextInput
                            style={styles.textArea}
                            placeholder="Enter your Description"
                            multiline
                            numberOfLines={7}
                            onChangeText={formik.handleChange("description")}
                            onBlur={formik.handleBlur("description")}
                            value={formik.values.description}
                        />
                        {!!formik.errors.description && formik.touched.description && (
                            <Text style={styles.errorText}>{formik.errors.description}</Text>
                        )}
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.submitButton,
                            formik.isSubmitting && styles.submitButtonDisabled,
                        ]}
                        onPress={handleSubmit}
                        disabled={formik.isSubmitting}
                    >
                        <Text style={styles.submitButtonText}>
                            {formik.isSubmitting
                                ? "Listing..."
                                : oldTruckData
                                    ? "Update Equipment"
                                    : "List Equipment"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddTruck;