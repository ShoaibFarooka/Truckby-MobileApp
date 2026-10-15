import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    reportLink: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 6,
        marginTop: 14,
    },
    reportLinkText: {
        color: '#6B7280',
        fontSize: 13,
        textDecorationLine: 'underline',
    },
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
        maxHeight: '90%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1E1E1E',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E1E1E',
        marginBottom: 8,
    },
    labelSpaced: {
        marginTop: 8,
    },
    reasonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 7,
    },
    reasonText: {
        fontSize: 14,
        color: '#1E1E1E',
        flexShrink: 1,
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
        height: 100,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 4,
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
        minWidth: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DF0805',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
    },
    sendText: {
        color: '#fff',
        fontWeight: '500',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    errorText: {
        color: '#DF0805',
        fontSize: 13,
        marginBottom: 10,
    },
});
