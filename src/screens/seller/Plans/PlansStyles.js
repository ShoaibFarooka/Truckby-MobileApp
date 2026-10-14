import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#f3f4f6",
    },
    container: {
        paddingHorizontal: 16,
        paddingVertical: 32,
        maxWidth: 1147,
        width: "100%",
        alignSelf: "center",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    headingRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        marginBottom: 24,
        gap: 8,
    },
    headingText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#111827",
    },

    planCard: {
        borderWidth: 1,
        borderColor: "#E6E9F5",
        borderRadius: 14,
        padding: 16,
        backgroundColor: "#ffffff",
    },
    planCardCurrent: {
        borderColor: "#DF0805",
        backgroundColor: "#FEF6F6",
    },
    planCardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 8,
    },
    planNameWrap: {
        flexShrink: 1,
        gap: 6,
    },
    planName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111827",
    },
    currentBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 999,
        backgroundColor: "#DF0805",
    },
    currentBadgeText: {
        color: "#ffffff",
        fontSize: 11,
        fontWeight: "600",
    },

    /* Listings included */
    listingsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 14,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#E6E9F5",
    },
    listingsLabel: {
        fontSize: 14,
        color: "#6b7280",
    },
    listingsValue: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#111827",
    },

    /* Features */
    featureList: {
        marginTop: 12,
        gap: 8,
    },
    featureRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    featureText: {
        fontSize: 14,
        color: "#111827",
        flexShrink: 1,
    },
    featureTextDisabled: {
        color: "#9ca3af",
    },

    emptyState: {
        paddingVertical: 40,
        alignItems: "center",
    },
    emptyStateTitle: {
        marginTop: 12,
        color: "#111827",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },
});