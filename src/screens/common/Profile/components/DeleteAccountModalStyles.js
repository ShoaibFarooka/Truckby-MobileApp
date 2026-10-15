import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContainer: {
        width: '100%',
        maxWidth: 436,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingHorizontal: 24,
        paddingVertical: 28,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
        textAlign: 'center',
        marginBottom: 12,
    },
    message: {
        fontSize: 15,
        color: '#333',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 20,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#111',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        fontSize: 15,
        color: '#111',
    },
    errorText: {
        color: '#DC2626',
        fontSize: 14,
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginTop: 24,
    },
    cancelButton: {
        flex: 1,
        height: 48,
        backgroundColor: '#6B7280',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
        flex: 1,
        height: 48,
        backgroundColor: '#D74042',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
