import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },

    modalContainer: {
        width: "100%",
        maxWidth: 436,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingHorizontal: 24,
        paddingVertical: 32,
        alignItems: "center",
    },

    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#000",
        textAlign: "center",
        marginBottom: 16,
    },

    message: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        marginBottom: 28,
        lineHeight: 24,
    },

    deleteText: {
        color: "#DC2626",
        fontWeight: "600",
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },

    cancelButton: {
        width: 131,
        height: 48,
        backgroundColor: "#6B7280",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    deleteButton: {
        width: 131,
        height: 48,
        backgroundColor: "#D74042",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});