import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 245,
        backgroundColor: '#000',
        overflow: 'hidden',
    },
    video: {
        ...StyleSheet.absoluteFillObject,
    },
    loader: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
});