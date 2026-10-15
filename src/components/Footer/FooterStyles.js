import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 28,
    },

    // ── Brand ──
    brand: {
        alignItems: "center",
        marginBottom: 28,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    tagline: {
        color: "#d1d5dc",
        fontSize: 14,
        lineHeight: 20,
        textAlign: "center",
        marginTop: 8,
        maxWidth: 280,
    },

    // ── Shared ──
    sectionTitle: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 12,
    },

    // ── Newsletter ──
    newsletter: {
        marginBottom: 28,
    },
    newsletterText: {
        color: "#d1d5dc",
        fontSize: 13,
        marginTop: -6,
        marginBottom: 12,
    },
    inputWrapper: {
        justifyContent: "center",
    },
    input: {
        backgroundColor: "#fff",
        color: "#101828",
        paddingLeft: 16,
        paddingRight: 52,
        paddingVertical: 12,
        borderRadius: 8,
        fontSize: 15,
    },
    sendButton: {
        position: "absolute",
        right: 6,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#e7000b",
        justifyContent: "center",
        alignItems: "center",
    },

    // ── Links ──
    linkColumns: {
        flexDirection: "row",
        gap: 24,
        marginBottom: 24,
    },
    linkColumn: {
        flex: 1,
    },
    linkItem: {
        paddingVertical: 6,
        alignSelf: "flex-start",
    },
    linkText: {
        color: "#d1d5dc",
        fontSize: 14,
    },
    linkTextActive: {
        color: "#df0805",
        fontWeight: "600",
    },

    // ── Bottom bar ──
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#4b5563",
        marginBottom: 20,
    },
    bottomBar: {
        alignItems: "center",
        gap: 16,
    },
    socialRow: {
        flexDirection: "row",
        gap: 14,
    },
    socialButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#4b5563",
        justifyContent: "center",
        alignItems: "center",
    },
    copyrightText: {
        color: "#9ca3af",
        fontSize: 12,
        textAlign: "center",
    },
});
