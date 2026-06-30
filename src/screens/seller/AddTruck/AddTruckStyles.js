import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#f3f4f6",
    },
    container: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        maxWidth: 900,
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
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
        color: "#111827",
    },

    /* Section headers */
    sectionHeader: {
        backgroundColor: "#DF0805",
        height: 48,
        borderRadius: 5,
        justifyContent: "center",
        paddingHorizontal: 14,
        marginTop: 24,
        marginBottom: 18,
    },
    sectionHeaderText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "600",
    },

    /* Grid */
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    gridItem: {
        flexGrow: 1,
        flexBasis: "47%",
        marginBottom: 18,
    },
    fullWidthItem: {
        width: "100%",
        marginBottom: 18,
    },

    /* Form fields */
    label: {
        fontWeight: "600",
        fontSize: 14,
        marginBottom: 6,
        color: "#111827",
    },
    helperText: {
        fontSize: 12,
        color: "#6b7280",
        fontWeight: "400",
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 14,
        color: "#111827",
        backgroundColor: "#ffffff",
    },
    inputDisabled: {
        opacity: 0.5,
        backgroundColor: "#f3f4f6",
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        color: "#111827",
        backgroundColor: "#ffffff",
        minHeight: 140,
        textAlignVertical: "top",
    },

    errorText: {
        color: "#ef4444",
        fontSize: 12,
        marginTop: 4,
    },

    /* Upload box */
    uploadBox: {
        borderWidth: 2,
        borderColor: "#9ca3af",
        borderStyle: "dashed",
        borderRadius: 10,
        paddingVertical: 24,
        paddingHorizontal: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    uploadText: {
        color: "#6b7280",
        marginTop: 8,
        fontWeight: "500",
        fontSize: 14,
    },
    uploadSubText: {
        fontSize: 12,
        color: "#9ca3af",
        marginTop: 2,
    },

    /* Image previews */
    previewRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        marginTop: 16,
    },
    previewWrapper: {
        width: 90,
        height: 90,
        position: "relative",
    },
    previewImage: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    removeBadge: {
        position: "absolute",
        top: -6,
        right: -6,
        backgroundColor: "#ef4444",
        borderRadius: 12,
        width: 22,
        height: 22,
        alignItems: "center",
        justifyContent: "center",
    },
    moveRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 4,
    },
    moveButton: {
        backgroundColor: "rgba(0,0,0,0.55)",
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 1,
    },
    moveButtonText: {
        color: "#fff",
        fontSize: 10,
    },

    /* Submit button */
    submitButton: {
        backgroundColor: "#DF0805",
        borderRadius: 10,
        marginTop: 16,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
        paddingHorizontal: 24,
        minWidth: 180,
    },
    submitButtonDisabled: {
        opacity: 0.6,
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
    },
});