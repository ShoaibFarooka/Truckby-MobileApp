import { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator } from "react-native";
import { styles } from "./HomeStyles";
import PromoVideo from './components/PromoVideo/PromoVideo';

const Home = () => {
    return (
        <View>
            <PromoVideo />
            <Text>Home Screen</Text>

        </View>
    )
};

export default Home;
