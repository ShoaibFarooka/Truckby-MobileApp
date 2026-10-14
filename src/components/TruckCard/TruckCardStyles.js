import { StyleSheet } from 'react-native';

// Grid containers must use this horizontal padding for card widths to add up
export const GRID_PADDING = 16;
export const GRID_GAP = 12;

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: GRID_GAP,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
        overflow: 'hidden',
    },
    cardPressed: {
        transform: [{ scale: 0.97 }],
        opacity: 0.95,
    },

    // ── Image ──
    imagePlaceholder: {
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // ── Badges ──
    featuredBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        backgroundColor: '#DF0805',
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 6,
    },
    featuredText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '700',
    },
    photoBadge: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        backgroundColor: 'rgba(0,0,0,0.55)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    photoBadgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '600',
    },

    // ── Details ──
    details: {
        padding: 10,
        gap: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: '800',
        color: '#DF0805',
    },
    title: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1E1E1E',
        lineHeight: 17,
        minHeight: 34, // reserve two lines so cards in a row line up
    },
    metaColumn: {
        marginTop: 2,
        gap: 3,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        flex: 1,
        fontSize: 12,
        color: '#4B5563',
    },
});
