import { View, ScrollView, Image, ImageBackground } from "react-native";
import { styles } from "./AuthContainerStyles";

const bg = require("../../../assets/images/truck_image1.png");
const logo = require("../../../assets/images/login_logo.png");

const AuthContainer = ({ children }) => {
    return (
        <ScrollView style={styles.container}>
            <ImageBackground
                source={bg}
                style={styles.background}
                resizeMode="cover"
            />
            <View style={styles.box}>
                <Image
                    source={logo}
                    style={styles.logo}
                    alt="Truckby"
                />
                {children}
            </View>
        </ScrollView>
    )
};

export default AuthContainer;