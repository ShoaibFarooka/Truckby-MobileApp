import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 20,
        gap: 16
    },
    inputContainer: {
    },
    input: {
        paddingVertical: 12,
        paddingLeft: 40,
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    icon: {
        position: "absolute",
        top: 13,
        zIndex: 1
    },
    leftIcon: {
        left: 16,
    },
    rightIcon: {
        right: 16
    },
    inputError: {
        color: 'red',
        fontSize: 14,
    },
    button: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        backgroundColor: '#DF0805',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonPressed: {
        opacity: 0.7,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ffffff',
    },
    bottomText: {
        fontSize: 14,
        color: '#4B5563',
        alignSelf: "center"
    },
    link: {
        color: '#DF0805',
    }
});