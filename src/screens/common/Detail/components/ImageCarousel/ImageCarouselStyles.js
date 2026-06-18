import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
    wrapper: {
        width: screenWidth,
        height: 280,
        backgroundColor: '#000',
        position: 'relative',
    },
    image: {
        width: screenWidth,
        height: 280,
    },

    // ── Arrows ──
    arrow: {
        position: 'absolute',
        top: '50%',
        marginTop: -20,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowLeft: {
        left: 12,
    },
    arrowRight: {
        right: 12,
    },

    // ── Dots ──
    dotsContainer: {
        position: 'absolute',
        bottom: 12,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        height: 7,
        borderRadius: 4,
        marginHorizontal: 3,
    },
    dotActive: {
        width: 18,
        backgroundColor: '#fff',
    },
    dotInactive: {
        width: 7,
        backgroundColor: 'rgba(255,255,255,0.55)',
    },
});