import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 700,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 95,
        height: 95,
        resizeMode: "cover",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        paddingVertical: 16,
        color: "#111827",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "500",
        color: "#111827",
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginTop: 24,
        backgroundColor: "#DF0805",
        borderRadius: 8,
    },
    buttonText: {
        color: "#ffffff",
        fontWeight: "500",
        fontSize: 14,
    },
});