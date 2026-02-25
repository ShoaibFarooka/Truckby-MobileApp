import { StyleSheet, View, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ children, showHeader, showFooter }) => {
    return (
        <SafeAreaView edges={Platform.OS == "ios" ? ['top'] : ['top', 'bottom']} style={styles.layout}>
            {showHeader && <Header />}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.layoutContent}>
                    {children}
                </View>
                {showFooter && <Footer />}
            </ScrollView>
        </SafeAreaView>
    )
};

export default Layout;

const styles = StyleSheet.create({
    layout: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    layoutContent: {
        flex: 1,
    }
});