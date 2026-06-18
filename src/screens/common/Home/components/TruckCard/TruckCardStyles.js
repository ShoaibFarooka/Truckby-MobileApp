import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        margin: 4,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
        overflow: 'hidden',
    },

    // ── Image ──
    imageWrapper: {
        position: 'relative',
    },
    image: {
        height: 120,
    },
    imagePlaceholder: {
        height: 120,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // ── Dots ──
    dotsContainer: {
        position: 'absolute',
        bottom: 6,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        height: 5,
        borderRadius: 3,
        marginHorizontal: 2,
    },
    dotActive: {
        width: 12,
        backgroundColor: '#fff',
    },
    dotInactive: {
        width: 5,
        backgroundColor: 'rgba(255,255,255,0.55)',
    },

    // ── Details ──
    details: {
        padding: 10,
    },
    title: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1E1E1E',
        marginBottom: 4,
    },
    price: {
        fontSize: 13,
        fontWeight: '700',
        color: '#DF0805',
        marginBottom: 8,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    metaText: {
        fontSize: 10,
        color: '#4B5563',
        marginLeft: 3,
    },
});