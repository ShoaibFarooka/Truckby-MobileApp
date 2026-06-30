import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./ExpirePlanStyles";


const alarm = require("../../../../../assets/images/expirePlan.png");

const ExpirePlan = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image source={alarm} style={styles.image} />
            <Text style={styles.title}>Your plan has expired</Text>
            <Text style={styles.subtitle}>Upgrade your plan now</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SellerPlans")}>
                <Text style={styles.buttonText}>Upgrade Now</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ExpirePlan;