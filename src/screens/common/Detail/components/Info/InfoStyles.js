import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 16,
        backgroundColor: '#fff',
    },

    // ── Vehicle Name ──
    vehicleName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1E1E1E',
        letterSpacing: 0.3,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E5E5',
        marginTop: 14,
        marginBottom: 14,
    },

    // ── Price top row (Price label + Mileage) ──
    priceTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    priceLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1E1E1E',
    },
    mileageRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mileageText: {
        fontSize: 13,
        color: '#1E1E1E',
        marginLeft: 5,
    },

    // ── Price value + Location ──
    priceLocationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 28,
    },
    priceRed: {
        fontSize: 26,
        fontWeight: '700',
        color: '#DF0805',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 13,
        color: '#1E1E1E',
        marginLeft: 3,
    },

    // ── Contact Card ──
    contactCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E1E1E',
        marginBottom: 14,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    contactText: {
        fontSize: 14,
        color: '#374151',
        marginLeft: 8,
        flex: 1,
    },
    companyButtonRow: {
        flexDirection: 'column',
        alignItems: 'space-between',
        marginTop: 2,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DF0805',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    contactButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
        marginRight: 8,
    },

    // ── Modal ──
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalBox: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        width: '100%',
        maxWidth: 440,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1E1E1E',
        marginBottom: 16,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        color: '#1E1E1E',
        marginBottom: 12,
    },
    modalTextArea: {
        height: 110,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    cancelButton: {
        backgroundColor: '#D1D5DB',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        marginRight: 10,
    },
    cancelText: {
        color: '#1E1E1E',
        fontWeight: '500',
    },
    sendButton: {
        backgroundColor: '#DF0805',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
    },
    sendText: {
        color: '#fff',
        fontWeight: '500',
    },
});