import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 24,
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    iconCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FDECEC',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1E1E1E',
        textAlign: 'center',
        marginBottom: 6,
    },
    message: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 20,
    },
    button: {
        marginTop: 18,
        backgroundColor: '#DF0805',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonPressed: {
        opacity: 0.85,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
});
