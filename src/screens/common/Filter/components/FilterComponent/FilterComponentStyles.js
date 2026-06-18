import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },

    headerTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#1a1a1a",
        letterSpacing: 0.2,
    },

    appliedCard: {
        margin: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e8e8e8",
        padding: 14,
        backgroundColor: "#fff",
        // subtle shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },

    appliedCardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    appliedCardTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1a1a1a",
    },

    clearAllText: {
        fontSize: 14,
        color: "#C8102E",
        fontWeight: "600",
    },

    noFiltersText: {
        fontSize: 13,
        color: "#bbb",
        fontStyle: "italic",
    },

    chipRow: {
        flexDirection: "row",
        gap: 8,
        flexWrap: "nowrap",
    },

    chip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2a2a2a",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        gap: 5,
        maxWidth: 200,
    },

    chipText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "500",
        flexShrink: 1,
    },

    // ── Scroll Area ──
    scrollArea: {
        flex: 1,
    },

    // ── Section Accordion ──
    section: {
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 16,
    },

    sectionTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1a1a1a",
    },

    sectionContent: {
        paddingHorizontal: 20,
        paddingBottom: 16,
    },

    // ── Group Divider ──
    groupDivider: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#f7f7f7",
        borderTopWidth: 1,
        borderTopColor: "#efefef",
        borderBottomWidth: 1,
        borderBottomColor: "#efefef",
    },

    groupLabel: {
        fontSize: 10,
        fontWeight: "700",
        color: "#aaa",
        letterSpacing: 1.5,
    },

    // ── Inputs ──
    input: {
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        color: "#333",
        backgroundColor: "#fafafa",
    },

    dropdown: {
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#fafafa",
    },

    dropdownPlaceholder: {
        color: "#bbb",
        fontSize: 14,
    },

    // ── Range ──
    rangeRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    rangeInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 9,
        fontSize: 13,
        color: "#333",
        backgroundColor: "#fafafa",
        textAlign: "center",
    },

    rangeDash: {
        fontSize: 18,
        color: "#ccc",
    },

    rangeUnit: {
        fontSize: 12,
        color: "#888",
        fontWeight: "600",
        minWidth: 28,
    },

    // ── Checkbox ──
    checkboxRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 9,
        gap: 12,
    },

    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },

    checkboxActive: {
        backgroundColor: "#C8102E",
        borderColor: "#C8102E",
    },

    checkboxLabel: {
        fontSize: 14,
        color: "#333",
        fontWeight: "500",
    },

});