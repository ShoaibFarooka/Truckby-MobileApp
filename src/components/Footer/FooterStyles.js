import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        paddingHorizontal: 8,
        paddingTop: 24,
        paddingBottom: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 100,
        height: 120,
        resizeMode: "contain"
    },
    subContainer: {
        marginTop: 40
    },
    inputLabel: {
        color: "#d1d5dc",
        marginBottom: 8
    },
    input: {
        backgroundColor: "white",
        color: "#101828",
        paddingLeft: 16,
        paddingRight: 48,
        paddingVertical: 12,
        borderRadius: 6,
        fontSize: 16,
        width: 256,
        marginBottom: 24,
    },
    iconContainer: {
        backgroundColor: "#e7000b",
        alignSelf: "flex-start",
        padding: 8,
        borderRadius: 9999,
        position: "absolute",
        right: 8,
        top: 5
    },
    menuContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 24,
        width: 256,
        columnGap: 25,
        rowGap: 5
    },
    menuItem: {
        paddingVertical: 4,
        alignSelf: "flex-start",
    },
    menuItemBorderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: "#df0805"
    },
    menuText: {
        fontSize: 14,
        color: '#fff',
    },
    activeText: {
        color: "#df0805"
    },
    socialLinksContainer: {
        flexDirection: "row",
        gap: 30,
        marginBottom: 24
    },
    socialLink: {

    },
    copyrightText: {
        color: "#fff"
    }
});