import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
        paddingHorizontal: 24,
    },
    card: {
        width: "100%",
        maxWidth: 420,
        paddingVertical: 40,
        paddingHorizontal: 24,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    iconWrapper: {
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#111827",
        marginBottom: 24,
    },
    button: {
        backgroundColor: "#DF0805",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: "#ffffff",
        fontWeight: "600",
        fontSize: 15,
    },
});