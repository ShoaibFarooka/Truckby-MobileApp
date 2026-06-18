import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    detailsContainer: {
        paddingHorizontal: 16,
        paddingBottom: 30,
        backgroundColor: '#fff',
    },
    section: {
        marginTop: 22,
    },
    sectionHeader: {
        backgroundColor: '#DF0805',
        height: 46,
        borderRadius: 6,
        justifyContent: 'center',
        paddingHorizontal: 14,
    },
    sectionHeaderText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    infoLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1E1E1E',
        flex: 1,
    },
    infoValue: {
        fontSize: 15,
        color: '#1E1E1E',
        flex: 1,
        textAlign: 'right',
    },
    descriptionContainer: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    bulletRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    bullet: {
        fontSize: 15,
        color: '#1E1E1E',
        lineHeight: 22,
        marginRight: 8,
    },
    bulletText: {
        fontSize: 15,
        color: '#1E1E1E',
        flex: 1,
        lineHeight: 22,
    },
    emptyText: {
        textAlign: 'center',
        paddingVertical: 40,
        color: '#9CA3AF',
        fontSize: 15,
    },
});