import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({

    scrollContainer: {
        paddingBottom: 40,
        backgroundColor: "#f5f5f5",
    },

    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },

    heroContainer: {
        paddingHorizontal: 16,
        marginTop: 20,
    },

    leftSection: {
        width: "100%",
    },

    heading: {
        fontSize: width > 768 ? 54 : 34,
        lineHeight: width > 768 ? 60 : 40,
        fontWeight: "700",
        color: "#000",
    },

    subHeading: {
        fontSize: 20,
        color: "#6b7280",
        marginTop: 12,
    },

    searchContainer: {
        position: "relative",
        marginTop: 20,
    },

    searchInput: {
        height: 60,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingRight: 60,
        fontSize: 16,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,

        elevation: 3,
    },

    searchIconContainer: {
        position: "absolute",
        right: 16,
        top: 18,
    },

    filtersContainer: {
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

    dropdown: {
        height: 70,
        paddingHorizontal: 20,
        justifyContent: "center",
        backgroundColor: "#fff",
    },

    dropdownPlaceholder: {
        color: "#000",
        fontSize: 17,
    },

    filterButton: {
        backgroundColor: "#DF0805",
        height: 55,

        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14,
    },

    buttonPressed: {
        opacity: 0.7,
    },

    typeSection: {
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 70,
    },

    sectionHeading: {
        fontSize: 32,
        fontWeight: "700",
        color: "#000",
        marginBottom: 24,
    },

    categoryWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },

    categoryCard: {
        width: 170,
        height: 210,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },

    categoryImage: {
        width: 130,
        height: 90,
    },

    categoryText: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 30,
        paddingHorizontal: 8,
    },

    featuredSection: {
        paddingHorizontal: 16,
        paddingTop: 40,
        paddingBottom: 70,
    },

    truckContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },

    paginationWrapper: {
        alignItems: "center",
        marginTop: 28,
        gap: 10,
    },

    paginationInnerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    paginationArrow: {
        width: 38,
        height: 38,
        borderRadius: 10,

        backgroundColor: "#fff",

        borderWidth: 1,
        borderColor: "#e5e7eb",

        justifyContent: "center",
        alignItems: "center",
    },

    paginationDisabled: {
        opacity: 0.35,
    },

    paginationButton: {
        width: 38,
        height: 38,
        borderRadius: 10,

        backgroundColor: "#fff",

        borderWidth: 1,
        borderColor: "#e5e7eb",

        justifyContent: "center",
        alignItems: "center",
    },

    paginationButtonActive: {
        backgroundColor: "#C8102E",
        borderColor: "#C8102E",
    },

    paginationButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
    },

    paginationButtonTextActive: {
        color: "#fff",
    },

    paginationInfo: {
        fontSize: 13,
        color: "#9ca3af",
    },

});