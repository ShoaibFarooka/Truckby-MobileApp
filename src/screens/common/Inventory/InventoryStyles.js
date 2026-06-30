import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 40,
        backgroundColor: "#f7f7f7",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        elevation: 3,
    },

    topSection: {
        flexDirection: "row",
    },

    logo: {
        width: 80,
        height: 80,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        marginRight: 15,
    },

    info: {
        flex: 1,
        justifyContent: "center",
    },

    companyName: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },

    text: {
        fontSize: 15,
        color: "#333",
        marginBottom: 4,
    },

    bold: {
        fontWeight: "700",
    },

    shareButton: {
        marginTop: 16,
        backgroundColor: "#d32f2f",
        borderRadius: 8,
        paddingVertical: 12,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    shareText: {
        color: "#fff",
        fontWeight: "600",
        marginLeft: 8,
    },

    row: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 15,
    },

    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },

    pageButton: {
        backgroundColor: "#e5e5e5",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 6,
    },

    disabledButton: {
        opacity: 0.5,
    },

    pageText: {
        marginHorizontal: 20,
        fontSize: 16,
        fontWeight: "600",
    },
});