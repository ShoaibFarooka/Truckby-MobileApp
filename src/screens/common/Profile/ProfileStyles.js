import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f3f4f6',
    },
    scrollContent: {
        paddingVertical: 32,
        paddingHorizontal: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 4,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 28,
        color: '#111',
    },

    // ── Avatar ──────────────────────────────────────────────────────────────
    avatarSubscriptionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 28,
    },
    avatarRow: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    avatarWrapper: {
        width: 108,
        height: 108,
        borderRadius: 54,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        backgroundColor: '#e5e7eb',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    avatarPlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarPlaceholderText: {
        color: '#6b7280',
        fontSize: 13,
    },
    avatarHint: {
        color: '#6b7280',
        fontSize: 13,
        flexShrink: 1,
    },

    // ── Subscription badge ───────────────────────────────────────────────────
    planBadge: {
        backgroundColor: '#dcfce7',
        borderColor: '#86efac',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginBottom: 12,
        alignSelf: 'flex-start',
    },
    planBadgeLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#166534',
    },
    planBadgeName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#14532d',
        marginTop: 2,
    },
    autoRenewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    autoRenewLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: '#111',
    },

    // ── Toggle ───────────────────────────────────────────────────────────────
    toggleTrack: {
        width: 48,
        height: 26,
        borderRadius: 13,
        padding: 3,
        justifyContent: 'center',
    },
    toggleTrackOn: {
        backgroundColor: '#22c55e',
    },
    toggleTrackOff: {
        backgroundColor: '#d1d5db',
    },
    toggleThumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 2,
    },
    toggleThumbOn: {
        alignSelf: 'flex-end',
    },
    toggleThumbOff: {
        alignSelf: 'flex-start',
    },

    // ── Form ─────────────────────────────────────────────────────────────────
    label: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#111',
        marginBottom: 8,
    },
    input: {
        height: 60,
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        fontSize: 15,
        color: '#111',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },

    // ── Save button ───────────────────────────────────────────────────────────
    saveButton: {
        backgroundColor: '#DF0805',
        borderRadius: 10,
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        alignSelf: 'flex-end',
        paddingHorizontal: 36,
        minWidth: 180,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});