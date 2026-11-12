import { View, ScrollView, Image } from "react-native";
import { styles } from "./AuthContainerStyles";

const bg = require("../../../assets/images/truck_image1.png");
const logo = require("../../../assets/images/login_logo.png");

const AuthContainer = ({ children }) => {
    return (
        <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
            <View style={styles.background}>
                <Image
                    source={bg}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                />
            </View>
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