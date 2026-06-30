import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        backgroundColor: "#fff",
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#111",
        marginBottom: 20,
        textAlign: "center",
    },

    description: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        lineHeight: 24,
        marginBottom: 30,
    },

    button: {
        backgroundColor: "#2563EB",
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 8,
        elevation: 2,
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});