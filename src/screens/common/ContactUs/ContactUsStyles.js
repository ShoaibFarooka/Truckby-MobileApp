import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        maxWidth: 900,
        alignSelf: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    textContainer: {
        marginBottom: 24,
    },
    paragraph: {
        fontSize: 16,
        color: '#1f2937', // Tailwind's gray-800
        marginBottom: 12,
    },
    link: {
        color: '#2563eb', // Tailwind's blue-600
        textDecorationLine: 'underline',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '48%',
        marginBottom: 24,
    },
    heading: {
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 6,
    },
    emailLink: {
        color: '#2563eb',
        textDecorationLine: 'underline',
    },
    clickable: {
        alignSelf: "flex-start"
    }
});