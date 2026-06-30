import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    image: {
        width: "100%",
        height: 230,
        resizeMode: "cover",
    },
    body: {
        padding: 16,
    },
    headerRow: {
        flexDirection: "column",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#111827",
    },
    price: {
        color: "#DF0805",
        fontSize: 18,
        fontWeight: "600",
        marginTop: 12,
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
        flexWrap: "wrap",
    },
    metaIcon: {
        marginRight: 4,
    },
    metaText: {
        fontSize: 13,
        color: "#374151",
    },
    metaTextSpaced: {
        fontSize: 13,
        color: "#374151",
        marginLeft: 24,
    },
    buttonRow: {
        flexDirection: "row",
        marginTop: 16,
        flexWrap: "wrap",
        gap: 10,
    },
    viewButton: {
        backgroundColor: "#000000",
        minWidth: 120,
        height: 39,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        flex: 1,
    },
    viewButtonText: {
        color: "#ffffff",
        fontWeight: "500",
    },
    editButton: {
        backgroundColor: "#DF0805",
        minWidth: 120,
        height: 39,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        flex: 1,
    },
    editButtonText: {
        color: "#ffffff",
        fontWeight: "500",
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: "#000000",
        minWidth: 120,
        height: 39,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        flex: 1,
    },
    deleteButtonText: {
        color: "#000000",
        fontWeight: "500",
    },
});