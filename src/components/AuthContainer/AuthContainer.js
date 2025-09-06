import { View, ScrollView, Image, ImageBackground } from "react-native";
import { styles } from "./AuthContainerStyles";

const AuthContainer = ({ children }) => {
    return (
        <ScrollView style={styles.container}>
            <ImageBackground
                source={require("../../../assets/images/truck_image1.png")}
                style={styles.background}
                resizeMode="cover"
            />
            <View style={styles.box}>
                <Image
                    source={require("../../../assets/images/login_logo.png")}
                    style={styles.logo}
                    alt="Truckby"
                />
                {children}
            </View>
        </ScrollView>
    )
};

export default AuthContainer;