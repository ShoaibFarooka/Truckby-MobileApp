import { StyleSheet, Platform } from "react-native";

export const pickerStyles = StyleSheet.create({
    wrapper: {
        height: 48,
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        backgroundColor: "#ffffff",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        justifyContent: "space-between",
    },
    disabled: {
        opacity: 0.5,
        backgroundColor: "#f3f4f6",
    },
    valueText: {
        fontSize: 14,
        color: "#111827",
        flex: 1,
        marginRight: 8,
    },
    placeholderText: {
        color: "#9ca3af",
    },

    // Modal sheet
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "flex-end",
    },
    sheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: "60%",
        paddingBottom: Platform.OS === "ios" ? 24 : 16,
    },
    sheetHandle: {
        width: 40,
        height: 4,
        backgroundColor: "#d1d5db",
        borderRadius: 2,
        alignSelf: "center",
        marginVertical: 12,
    },
    list: {
        flexGrow: 0,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#f3f4f6",
    },
    optionSelected: {
        backgroundColor: "#fff5f5",
    },
    optionText: {
        fontSize: 15,
        color: "#111827",
        flex: 1,
    },
    optionTextSelected: {
        color: "#DF0805",
        fontWeight: "600",
    },
});