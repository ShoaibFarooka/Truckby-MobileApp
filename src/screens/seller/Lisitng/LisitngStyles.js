import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
        maxWidth: 993,
        width: "100%",
        alignSelf: "center",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 24,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#111827",
    },
    addButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: "#DF0805",
        borderRadius: 8,
    },
    addButtonText: {
        color: "#ffffff",
        fontWeight: "600",
        fontSize: 14,
    },
    cardSpacing: {
        marginTop: 16,
    },
    paginationRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        marginVertical: 24,
    },
    pageButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: "#e5e7eb",
        borderRadius: 6,
    },
    pageButtonDisabled: {
        opacity: 0.5,
    },
    pageButtonText: {
        color: "#111827",
        fontWeight: "500",
    },
    pageLabel: {
        fontWeight: "600",
        color: "#111827",
    },
    emptyState: {
        paddingVertical: 40,
        alignItems: "center",
    },
    emptyStateText: {
        color: "#6b7280",
        fontSize: 14,
    },
});