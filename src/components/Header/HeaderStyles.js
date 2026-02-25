import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        zIndex: 1
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: 80,
        height: 65,
        resizeMode: "contain"
    },
    menuContainer: {
        backgroundColor: '#fff',
        padding: 16,
        gap: 8
    },
    menuItem: {
        paddingVertical: 8,
        alignSelf: "flex-start",
    },
    menuItemBorderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: "#df0805"
    },
    menuText: {
        fontSize: 16,
        color: '#333',
    },
    activeText: {
        color: "#df0805"
    },
    authButton: {
        paddingVertical: 12,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 6,
        marginTop: 12,
        alignItems: 'center',
    },
    authText: {
        color: '#000',
        fontWeight: '500',
    },
    sellButton: {
        backgroundColor: '#DF0805',
        paddingVertical: 12,
        borderRadius: 6,
        marginTop: 8,
        alignItems: 'center',
    },
    sellText: {
        color: '#fff',
        fontWeight: '500',
    },
    profileSection: {
        marginTop: 16,
        width: 200
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#0000004d",
        paddingRight: 16,
        paddingLeft: 12
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#8d8d8d1f"
    },
    profileName: {
        marginLeft: 8,
        marginRight: 16,
        fontWeight: '500',
    },
    profileIconConatiner: {
        marginLeft: "auto"
    },
    dropdown: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        alignItems: "flex-start",
        width: "100%",
        borderColor: "#ebe6e7",
        borderWidth: 1,
        elevation: 8,
        position: "absolute",
        top: "100%",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    dropdownItem: {
        paddingVertical: 8,
        fontSize: 14,
    },
});