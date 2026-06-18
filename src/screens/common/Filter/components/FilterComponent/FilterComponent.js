import React, { useEffect, useState } from "react";
import {
    View, Text, Pressable, TextInput, ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import { styles } from "./FilterComponentStyles";
import { countries } from "../../../../../data/countries";
import { truckSubCategories } from "../../../../../data/Content";

const RangeInput = ({ minKey, maxKey, placeholders = ["Min", "Max"], draftRanges, setDraftRanges, onApply }) => (
    <View style={styles.rangeRow}>
        <TextInput
            style={styles.rangeInput}
            placeholder={placeholders[0]}
            placeholderTextColor="#d1d5db"
            keyboardType="numeric"
            value={draftRanges[minKey]}
            onChangeText={(v) => setDraftRanges((prev) => ({ ...prev, [minKey]: v }))}
        />
        <TextInput
            style={styles.rangeInput}
            placeholder={placeholders[1]}
            placeholderTextColor="#d1d5db"
            keyboardType="numeric"
            value={draftRanges[maxKey]}
            onChangeText={(v) => setDraftRanges((prev) => ({ ...prev, [maxKey]: v }))}
        />
        <Pressable
            style={({ pressed }) => [styles.rangeSearchBtn, pressed && { opacity: 0.8 }]}
            onPress={() => onApply(minKey, maxKey)}
        >
            <Text style={styles.rangeSearchBtnText}>Search</Text>
        </Pressable>
    </View>
);

const FilterSection = ({ sectionKey, openSections, toggleSection, title, children }) => {
    const isOpen = openSections[sectionKey];
    return (
        <View style={styles.section}>
            <Pressable onPress={() => toggleSection(sectionKey)} style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={16} color="#6b7280" />
            </Pressable>
            {isOpen && <View style={styles.sectionContent}>{children}</View>}
        </View>
    );
};

const FilterComponent = ({ filters, setFilters, onFilterChange, onClose }) => {

    const [openSections, setOpenSections] = useState({
        listingType: false, category: false, subCategory: false,
        make: false, model: false, year: false, mileage: false,
        condition: false, country: false, engineManufacturer: false,
        engineModel: false, horsepower: false, wheelbase: false,
        suspension: false, typeofRearAxles: false, FrontAxleWeight: false,
        BackAxleWeight: false, transmissionType: false, noofSpeeds: false,
    });

    const [draftRanges, setDraftRanges] = useState({
        minYear: filters.minYear || "", maxYear: filters.maxYear || "",
        minMileage: filters.minMileage || "", maxMileage: filters.maxMileage || "",
        minHorsepower: filters.minHorsepower || "", maxHorsepower: filters.maxHorsepower || "",
        minWheelbase: filters.minWheelbase || "", maxWheelbase: filters.maxWheelbase || "",
        minFrontAxleWeight: filters.minFrontAxleWeight || "", maxFrontAxleWeight: filters.maxFrontAxleWeight || "",
        minBackAxleWeight: filters.minBackAxleWeight || "", maxBackAxleWeight: filters.maxBackAxleWeight || "",
    });

    useEffect(() => { onFilterChange?.(filters); }, [filters]);

    const toggleSection = (section) =>
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

    const updateFilter = (key, value) =>
        setFilters((prev) => ({ ...prev, [key]: value }));

    const applyRange = (minKey, maxKey) => {
        setFilters((prev) => ({
            ...prev,
            [minKey]: draftRanges[minKey],
            [maxKey]: draftRanges[maxKey],
        }));
    };

    const toggleCondition = (value) => {
        setFilters((prev) => {
            const current = Array.isArray(prev.condition) ? prev.condition : [];
            return {
                ...prev,
                condition: current.includes(value)
                    ? current.filter((v) => v !== value)
                    : [...current, value],
            };
        });
    };

    const clearAllFilters = () => {
        setFilters({
            listingType: "", truckCategory: "", truckSubCategory: "",
            country: "", model: "", vehicleManufacturer: "",
            minYear: "", maxYear: "", minMileage: "", maxMileage: "",
            engineManufacturer: "", engineModel: "",
            minHorsepower: "", maxHorsepower: "",
            minWheelbase: "", maxWheelbase: "",
            suspension: "", typeofRearAxles: "",
            minFrontAxleWeight: "", maxFrontAxleWeight: "",
            minBackAxleWeight: "", maxBackAxleWeight: "",
            transmissionType: "", noofSpeeds: "", condition: [],
        });
        setDraftRanges({
            minYear: "", maxYear: "", minMileage: "", maxMileage: "",
            minHorsepower: "", maxHorsepower: "", minWheelbase: "", maxWheelbase: "",
            minFrontAxleWeight: "", maxFrontAxleWeight: "",
            minBackAxleWeight: "", maxBackAxleWeight: "",
        });
    };

    const removeFilter = (key, value = null) => {
        setFilters((prev) => {
            if (value !== null && Array.isArray(prev[key]))
                return { ...prev, [key]: prev[key].filter((v) => v !== value) };
            return { ...prev, [key]: Array.isArray(prev[key]) ? [] : "" };
        });
    };

    const filterLabels = {
        listingType: "Listing", truckCategory: "Category",
        truckSubCategory: "Subcategory", country: "Country",
        model: "Model", vehicleManufacturer: "Make",
        minYear: "From", maxYear: "To",
        minMileage: "Min Mi", maxMileage: "Max Mi",
        engineManufacturer: "Engine", engineModel: "Eng Model",
        minHorsepower: "Min HP", maxHorsepower: "Max HP",
        minWheelbase: "Min WB", maxWheelbase: "Max WB",
        suspension: "Suspension", typeofRearAxles: "Axles",
        minFrontAxleWeight: "Min FA", maxFrontAxleWeight: "Max FA",
        minBackAxleWeight: "Min RA", maxBackAxleWeight: "Max RA",
        transmissionType: "Trans", noofSpeeds: "Speeds", condition: "Condition",
    };

    const activeEntries = Object.entries(filters).filter(
        ([, v]) => (Array.isArray(v) ? v.length > 0 : !!v)
    );

    // ─── Shared props for RangeInput ───
    const rangeProps = { draftRanges, setDraftRanges, onApply: applyRange };

    // ─── Shared props for FilterSection ───
    const sectionProps = { openSections, toggleSection };

    const listingTypes = [
        { label: "For Sale", value: "For Sale" },
        { label: "For Lease", value: "For Lease" },
        { label: "For Auction", value: "For Auction" },
    ];
    const truckCategoryData = [
        "Trucks", "Trailers", "Construction Equipment", "Logging Equipment",
        "Farm Equipment", "Aggregate and Mining Equipment", "Lifting Equipment",
        "Industrial Equipment", "RVs", "Others",
    ];
    const suspensionTypes = [
        { label: "Air Ride", value: "Air Ride" }, { label: "Spring", value: "Spring" },
        { label: "Leaf Spring", value: "Leaf Spring" }, { label: "Rubber Block", value: "Rubber Block" },
    ];
    const rearAxleTypes = [
        { label: "Single", value: "Single" }, { label: "Tandem", value: "Tandem" },
        { label: "Tridem", value: "Tridem" }, { label: "Tag", value: "Tag" },
    ];
    const transmissionTypes = [
        { label: "Manual", value: "Manual" }, { label: "Automatic", value: "Automatic" },
        { label: "Automated Manual", value: "Automated Manual" },
    ];
    const speedOptions = ["8", "9", "10", "12", "13", "15", "18"].map((v) => ({
        label: `${v} Speed`, value: v,
    }));
    const conditions = ["New", "Used", "Lease"];

    return (
        <View style={styles.container}>

            {/* ── Header ── */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Filters</Text>
                <Pressable onPress={onClose} hitSlop={10}>
                    <Ionicons name="close" size={24} color="#C8102E" />
                </Pressable>
            </View>

            {/* ── Applied Filters Card ── */}
            <View style={styles.appliedCard}>
                <View style={styles.appliedCardHeader}>
                    <Text style={styles.appliedCardTitle}>Applied Filters</Text>
                    <Pressable onPress={clearAllFilters}>
                        <Text style={styles.clearAllText}>Clear All</Text>
                    </Pressable>
                </View>
                {activeEntries.length === 0 ? (
                    <Text style={styles.noFiltersText}>No filters applied</Text>
                ) : (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
                        {activeEntries.map(([key, value]) => {
                            if (Array.isArray(value)) {
                                return value.map((v, i) => (
                                    <View key={`${key}-${i}`} style={styles.chip}>
                                        <Text style={styles.chipText} numberOfLines={1}>
                                            {filterLabels[key] || key}: {v}
                                        </Text>
                                        <Pressable onPress={() => removeFilter(key, v)} hitSlop={6}>
                                            <Ionicons name="close-circle" size={14} color="#fff" />
                                        </Pressable>
                                    </View>
                                ));
                            }
                            return (
                                <View key={key} style={styles.chip}>
                                    <Text style={styles.chipText} numberOfLines={1}>
                                        {filterLabels[key] || key}: {value}
                                    </Text>
                                    <Pressable onPress={() => removeFilter(key)} hitSlop={6}>
                                        <Ionicons name="close-circle" size={14} color="#fff" />
                                    </Pressable>
                                </View>
                            );
                        })}
                    </ScrollView>
                )}
            </View>

            {/* ── Filter Sections ── */}
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled style={styles.scrollArea}
                // ✅ Fix: prevent keyboard from dismissing on scroll inside modal
                keyboardShouldPersistTaps="handled"
            >
                <FilterSection {...sectionProps} sectionKey="listingType" title="Listing Type">
                    <Dropdown
                        style={styles.dropdown} placeholderStyle={styles.dropdownPlaceholder}
                        placeholder="Select listing type" data={listingTypes}
                        labelField="label" valueField="value" value={filters.listingType}
                        onChange={(item) => updateFilter("listingType", item.value)}
                    />
                </FilterSection>

                <FilterSection {...sectionProps} sectionKey="category" title="Category">
                    <Dropdown
                        style={styles.dropdown} placeholderStyle={styles.dropdownPlaceholder}
                        placeholder="Select category"
                        data={truckCategoryData.map((i) => ({ label: i, value: i }))}
                        labelField="label" valueField="value" value={filters.truckCategory}
                        onChange={(item) => updateFilter("truckCategory", item.value)}
                    />
                </FilterSection>

                <FilterSection {...sectionProps} sectionKey="subCategory" title="Subcategory">
                    <Dropdown
                        style={[styles.dropdown, !filters.truckCategory && styles.dropdownDisabled]}
                        placeholderStyle={styles.dropdownPlaceholder}
                        placeholder={filters.truckCategory ? "Select subcategory" : "Pick a category first"}
                        data={truckSubCategories[filters.truckCategory]?.map((i) => ({ label: i, value: i })) || []}
                        labelField="label" valueField="value" value={filters.truckSubCategory}
                        onChange={(item) => updateFilter("truckSubCategory", item.value)}
                        disable={!filters.truckCategory}
                    />
                </FilterSection>

                <FilterSection {...sectionProps} sectionKey="make" title="Make">
                    <TextInput
                        style={styles.input} placeholder="e.g. Freightliner, Volvo..."
                        placeholderTextColor="#d1d5db" value={filters.vehicleManufacturer}
                        onChangeText={(v) => updateFilter("vehicleManufacturer", v)}
                    />
                </FilterSection>

                <FilterSection {...sectionProps} sectionKey="model" title="Model">
                    <TextInput
                        style={styles.input} placeholder="e.g. Cascadia, VNL..."
                        placeholderTextColor="#d1d5db" value={filters.model}
                        onChangeText={(v) => updateFilter("model", v)}
                    />
                </FilterSection>

                <FilterSection {...sectionProps} sectionKey="year" title="Year">
                    <RangeInput {...rangeProps} minKey="minYear" maxKey="maxYear" placeholders={["Min", "Max"]} />
                </FilterSection>

                <FilterSection {...sectionProps} sectionKey="mileage" title="Mileage">
                    <RangeInput {...rangeProps} minKey="minMileage" maxKey="maxMileage" placeholders={["Min", "Max"]} />
                </FilterSection>

                <FilterSection {...sectionProps} sectionKey="condition" title="Condition">
                    {conditions.map((c) => {
                        const selected = Array.isArray(filters.condition) && filters.condition.includes(c);
                        return (
                            <Pressable key={c} style={styles.checkboxRow} onPress={() => toggleCondition(c)}>
                                <View style={[styles.checkbox, selected && styles.checkboxActive]}>
                                    {selected && <Ionicons name="checkmark" size={12} color="#fff" />}
                                </View>
                                <Text style={styles.checkboxLabel}>{c}</Text>
                            </Pressable>
                        );
                    })}
                </FilterSection>

                <FilterSection {...sectionProps} sectionKey="country" title="Country">
                    <Dropdown
                        style={styles.dropdown} placeholderStyle={styles.dropdownPlaceholder}
                        placeholder="Select country" search searchPlaceholder="Search..."
                        data={countries} labelField="label" valueField="value" value={filters.country}
                        onChange={(item) => updateFilter("country", item.value)}
                    />
                </FilterSection>

                <View style={styles.groupDivider}>
                    <Text style={styles.groupLabel}>ENGINE & PERFORMANCE</Text>
                </View>

                <FilterSection {...sectionProps} sectionKey="engineManufacturer" title="Engine Manufacturer">
                    <TextInput
                        style={styles.input} placeholder="e.g. Cummins, Detroit..."
                        placeholderTextColor="#d1d5db" value={filters.engineManufacturer}
                        onChangeText={(v) => updateFilter("engineManufacturer", v)}
                    />
                </FilterSection>

                <FilterSection {...sectionProps} sectionKey="engineModel" title="Engine Model">
                    <TextInput
                        style={styles.input} placeholder="e.g. ISX15, DD15..."
                        placeholderTextColor="#d1d5db" value={filters.engineModel}
                        onChangeText={(v) => updateFilter("engineModel", v)}
                    />
                </FilterSection>

                <FilterSection {...sectionProps} sectionKey="horsepower" title="Horsepower">
                    <RangeInput {...rangeProps} minKey="minHorsepower" maxKey="maxHorsepower" placeholders={["Min", "Max"]} />
                </FilterSection>

                <View style={styles.groupDivider}>
                    <Text style={styles.groupLabel}>DIMENSIONS & AXLES</Text>
                </View>

                <FilterSection {...sectionProps} sectionKey="wheelbase" title="Wheelbase">
                    <RangeInput {...rangeProps} minKey="minWheelbase" maxKey="maxWheelbase" placeholders={["Min", "Max"]} />
                </FilterSection>

                <FilterSection {...sectionProps} sectionKey="suspension" title="Suspension">
                    <Dropdown
                        style={styles.dropdown} placeholderStyle={styles.dropdownPlaceholder}
                        placeholder="Select suspension type" data={suspensionTypes}
                        labelField="label" valueField="value" value={filters.suspension}
                        onChange={(item) => updateFilter("suspension", item.value)}
                    />
                </FilterSection>

                <FilterSection {...sectionProps} sectionKey="typeofRearAxles" title="Type of Rear Axles">
                    <Dropdown
                        style={styles.dropdown} placeholderStyle={styles.dropdownPlaceholder}
                        placeholder="Select axle type" data={rearAxleTypes}
                        labelField="label" valueField="value" value={filters.typeofRearAxles}
                        onChange={(item) => updateFilter("typeofRearAxles", item.value)}
                    />
                </FilterSection>

                <FilterSection {...sectionProps} sectionKey="FrontAxleWeight" title="Front Axle Weight">
                    <RangeInput {...rangeProps} minKey="minFrontAxleWeight" maxKey="maxFrontAxleWeight" placeholders={["Min", "Max"]} />
                </FilterSection>

                <FilterSection {...sectionProps} sectionKey="BackAxleWeight" title="Rear Axle Weight">
                    <RangeInput {...rangeProps} minKey="minBackAxleWeight" maxKey="maxBackAxleWeight" placeholders={["Min", "Max"]} />
                </FilterSection>

                <View style={styles.groupDivider}>
                    <Text style={styles.groupLabel}>TRANSMISSION</Text>
                </View>

                <FilterSection {...sectionProps} sectionKey="transmissionType" title="Transmission Type">
                    <Dropdown
                        style={styles.dropdown} placeholderStyle={styles.dropdownPlaceholder}
                        placeholder="Select transmission" data={transmissionTypes}
                        labelField="label" valueField="value" value={filters.transmissionType}
                        onChange={(item) => updateFilter("transmissionType", item.value)}
                    />
                </FilterSection>

                <FilterSection {...sectionProps} sectionKey="noofSpeeds" title="Number of Speeds">
                    <Dropdown
                        style={styles.dropdown} placeholderStyle={styles.dropdownPlaceholder}
                        placeholder="Select speeds" data={speedOptions}
                        labelField="label" valueField="value" value={filters.noofSpeeds}
                        onChange={(item) => updateFilter("noofSpeeds", item.value)}
                    />
                </FilterSection>

                <View style={{ height: 30 }} />
            </ScrollView>
        </View>
    );
};

export default FilterComponent;