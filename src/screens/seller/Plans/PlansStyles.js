import { StyleSheet } from "react-native";

const LABEL_COL_WIDTH = 160;
const PLAN_COL_WIDTH = 150;

export const COLUMN_WIDTHS = {
    LABEL_COL_WIDTH,
    PLAN_COL_WIDTH,
};

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
    headingSubText: {
        fontSize: 13,
        color: "#6b7280",
        fontWeight: "400",
    },

    table: {
        borderWidth: 1,
        borderColor: "#E6E9F5",
    },
    row: {
        flexDirection: "row",
    },

    /* Label column (left-most, sticky-feeling fixed width) */
    labelCell: {
        width: LABEL_COL_WIDTH,
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: "#E6E9F5",
        justifyContent: "center",
    },
    labelCellText: {
        fontSize: 14,
        color: "#111827",
        textAlign: "left",
    },

    /* Plan/price column header cell */
    headerCell: {
        width: PLAN_COL_WIDTH,
        paddingHorizontal: 10,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: "#E6E9F5",
        alignItems: "center",
        justifyContent: "center",
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    priceText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#111827",
    },
    priceSuffix: {
        fontSize: 14,
        color: "#6b7280",
        marginLeft: 2,
    },
    planButton: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 6,
        backgroundColor: "#DF0805",
        width: "100%",
        alignItems: "center",
    },
    planButtonDisabled: {
        backgroundColor: "#9ca3af",
    },
    planButtonText: {
        color: "#ffffff",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center",
    },

    /* Data cell */
    dataCell: {
        width: PLAN_COL_WIDTH,
        paddingHorizontal: 10,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: "#E6E9F5",
        alignItems: "center",
        justifyContent: "center",
    },
    dataCellBoldText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#111827",
    },
    dataCellText: {
        fontSize: 14,
        color: "#111827",
    },
    tickIcon: {
        width: 16,
        height: 16,
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