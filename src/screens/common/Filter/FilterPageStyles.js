import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },

    searchSection: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },

    searchInputContainer: {
        backgroundColor: "#fff",
        borderRadius: 16,
        height: 60,
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },

    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#000",
    },

    searchIconContainer: {
        paddingLeft: 10,
    },

    topFilterContainer: {
        marginTop: 24,
        backgroundColor: "#fff",
        borderRadius: 14,
        overflow: "hidden",

        marginHorizontal: 2,

        borderWidth: 1,
        borderColor: "#f6f6f6",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 6,

        elevation: 3,
    },

    topDropdown: {
        height: 70,
        paddingHorizontal: 24,
        justifyContent: "center",
    },

    dropdownPlaceholder: {
        color: "#000",
        fontSize: 18,
    },

    searchButton: {
        backgroundColor: "#DF0805",
        height: 55,

        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14,
    },

    heading: {
        fontSize: 28,
        fontWeight: "700",
        color: "#000",
        marginTop: 36,
        marginBottom: 20,
        paddingHorizontal: 16,
    },

    headingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 18,
        paddingBottom: 14,
    },

    resultsCount: {
        fontSize: 12,
        color: "#9ca3af",
        marginTop: 2,
    },

    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#C8102E",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 9,
        gap: 6,
    },

    filterButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },

    filterBadge: {
        backgroundColor: "#fff",
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
    },

    filterBadgeText: {
        color: "#C8102E",
        fontSize: 11,
        fontWeight: "700",
    },

    cardsContainer: {
        paddingHorizontal: 16,
        alignItems: "center",
    },

    paginationWrapper: {
        alignItems: "center",
        marginTop: 24,
        marginBottom: 8,
        gap: 8,
    },

    paginationContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    paginationArrow: {
        width: 36,
        height: 36,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },

    paginationDisabled: {
        opacity: 0.35,
    },

    paginationButton: {
        width: 36,
        height: 36,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },

    paginationButtonActive: {
        backgroundColor: "#C8102E",
        borderColor: "#C8102E",
    },

    paginationButtonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#374151",
    },

    paginationButtonTextActive: {
        color: "#fff",
        fontWeight: "700",
    },

    paginationInfo: {
        fontSize: 12,
        color: "#9ca3af",
    },

    modalOverlay: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.45)",
    },

    modalBackdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalPanel: {
        width: "82%",
        maxWidth: 250,
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: -3, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 20,
    },

});