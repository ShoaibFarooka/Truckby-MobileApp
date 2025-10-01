import { View, Text, StyleSheet } from "react-native";

const Unauthorized = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>401 Unauthorized</Text>
            <Text style={styles.para}>Oops! You don't have permission to access this page.</Text>
        </View>
    )
};

export default Unauthorized;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        height: "100%"
    },
    heading: {
        fontSize: 32,
        color: "#dc3545"
    },
    para: {
        fontSize: 16,
        marginTop: 16,
        color: "#495057",
        textAlign: "center"
    }
});