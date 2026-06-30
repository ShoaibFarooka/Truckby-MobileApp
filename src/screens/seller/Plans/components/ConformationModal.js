import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { fetchUserInfo } from "../../../../redux/userSlice";
import { styles } from "./ConformationModalStyles";

const SuccessPage = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, []);

    return (
        <View style={styles.screen}>
            <View style={styles.card}>
                <View style={styles.iconWrapper}>
                    <Ionicons name="checkmark-circle" size={64} color="#10B981" />
                </View>

                <Text style={styles.title}>Your Payment has been confirmed!</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("SellerListing")}
                >
                    <Text style={styles.buttonText}>Get started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SuccessPage;