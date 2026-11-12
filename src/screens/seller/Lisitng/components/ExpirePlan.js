import React from "react";
import { View, Text, Image } from "react-native";
import WebPlanLink from "../../../../components/WebPlanLink/WebPlanLink";
import { styles } from "./ExpirePlanStyles";


const alarm = require("../../../../../assets/images/expirePlan.png");

const ExpirePlan = () => {
    return (
        <View style={styles.container}>
            <Image source={alarm} style={styles.image} />
            <Text style={styles.title}>Your plan has expired</Text>
            <WebPlanLink label="Renew your plan on truckby.com" />
        </View>
    );
};

export default ExpirePlan;