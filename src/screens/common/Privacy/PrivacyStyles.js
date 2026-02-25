import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    sectionContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
    },
    date: {
        marginTop: 4,
        fontSize: 12,
        color: '#6B7280',
    },
    content: {
        marginTop: 24,
    },
    block: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
        color: '#111827',
    },
    paragraph: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 22,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 30,
    },
    link: {
        color: '#2563EB',
        textDecorationLine: 'underline',
        fontSize: 14,
    },
    italicNote: {
        fontStyle: 'italic',
        color: '#4B5563',
        marginTop: 20,
    },
    bold: {
        fontWeight: 'bold',
    },
    clickable: {
        alignSelf: "flex-start"
    }
});