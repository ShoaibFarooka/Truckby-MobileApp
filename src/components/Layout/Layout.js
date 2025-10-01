import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = ({ children, showHeader, showFooter }) => {
    return (
        <View style={styles.layout}>
            <View style={styles.layoutContent}>
                {children}
            </View>
        </View>
    )
};

export default Layout;

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: "white",
    },
    layoutContent: {
        flex: 1
    }
});