import { StyleSheet } from "react-native";

export default StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e5e7eb", // border-gray-200, matches web's `border`
        overflow: "hidden",
        marginBottom: 15,
        // shadow-sm equivalent
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },

    imageWrapper: {
        height: 200,
    },

    image: {
        height: 200,
    },

    details: {
        padding: 16, // p-4
        flex: 1,
        justifyContent: "space-between",
    },

    title: {
        fontSize: 16, // text-base
        fontWeight: "600",
        marginBottom: 4,
    },

    price: {
        color: "#DF0805",
        fontWeight: "600",
        fontSize: 14, // text-sm
        marginBottom: 4,
    },

    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        gap: 8,
    },

    metaText: {
        marginLeft: 8,
        color: "#374151", // text-gray-700
        fontSize: 14, // text-sm
    },

    button: {
        marginTop: 16, // mt-4
        backgroundColor: "#000",
        paddingVertical: 10, // py-2
        borderRadius: 6, // rounded-md
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontSize: 14, // text-sm
        fontWeight: "600",
    },

    dotsContainer: {
        position: "absolute",
        bottom: 8,
        alignSelf: "center",
        flexDirection: "row",
        gap: 6,
    },

    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },

    dotActive: {
        backgroundColor: "#DF0805",
    },

    dotInactive: {
        backgroundColor: "#ccc",
    },
});