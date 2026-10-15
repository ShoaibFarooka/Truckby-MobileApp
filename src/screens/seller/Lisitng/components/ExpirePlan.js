import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./ExpirePlanStyles";


const alarm = require("../../../../../assets/images/expirePlan.png");

const ExpirePlan = () => {
    return (
        <View style={styles.container}>
            <Image source={alarm} style={styles.image} />
            <Text style={styles.title}>Your plan has expired</Text>
        </View>
    );
};

export default ExpirePlan;