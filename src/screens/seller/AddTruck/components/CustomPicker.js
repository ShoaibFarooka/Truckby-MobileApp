import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { pickerStyles } from "./CustomPickerStyles";

const CustomPicker = ({
    selectedValue,
    onValueChange,
    items,
    placeholder = "Select an option",
    enabled = true,
}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const selectedLabel = items.find((i) => i.value === selectedValue)?.label || "";

    const handleSelect = (value) => {
        onValueChange(value);
        setModalVisible(false);
    };

    const closeModal = () => setModalVisible(false);

    return (
        <>
            <TouchableOpacity
                style={[pickerStyles.wrapper, !enabled && pickerStyles.disabled]}
                onPress={() => enabled && setModalVisible(true)}
                activeOpacity={enabled ? 0.7 : 1}
            >
                <Text
                    style={[
                        pickerStyles.valueText,
                        !selectedLabel && pickerStyles.placeholderText,
                    ]}
                    numberOfLines={1}
                >
                    {selectedLabel || placeholder}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#6b7280" />
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={closeModal}
            >
                {/* Backdrop — tap outside sheet to close */}
                <TouchableOpacity
                    style={pickerStyles.overlay}
                    activeOpacity={1}
                    onPress={closeModal}
                >
                    {/* Sheet — inner touchable stops taps bubbling to backdrop */}
                    <View style={pickerStyles.sheet}>
                        <TouchableOpacity activeOpacity={1}>
                            <View style={pickerStyles.sheetHandle} />
                        </TouchableOpacity>

                        <FlatList
                            data={items}
                            keyExtractor={(item) => String(item.value)}
                            style={pickerStyles.list}
                            keyboardShouldPersistTaps="handled"
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        pickerStyles.option,
                                        item.value === selectedValue && pickerStyles.optionSelected,
                                    ]}
                                    onPress={() => handleSelect(item.value)}
                                >
                                    <Text
                                        style={[
                                            pickerStyles.optionText,
                                            item.value === selectedValue && pickerStyles.optionTextSelected,
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                    {item.value === selectedValue && (
                                        <Ionicons name="checkmark" size={18} color="#DF0805" />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
};

export default CustomPicker;