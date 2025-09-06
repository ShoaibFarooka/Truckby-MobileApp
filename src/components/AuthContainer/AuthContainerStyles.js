import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "60%"
    },
    box: {
        alignSelf: "center",
        zIndex: 10,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: "20%",
        backgroundColor: "white",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        borderRadius: 12,
        width: "100%",
        maxWidth: "90%",
        minHeight: 619,
        paddingHorizontal: 16,
        paddingVertical: 30
    },
    logo: {
        width: 177,
        height: 127
    }
});