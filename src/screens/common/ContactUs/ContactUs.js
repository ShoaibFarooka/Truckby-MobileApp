import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { styles } from './ContactUsStyles';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const ContactUs = () => {
    const { user } = useSelector((state) => state.auth);

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Contact Truckby.com</Text>

            <View style={styles.textContainer}>
                <Text style={styles.paragraph}>
                    Looking for equipment?{' '}
                    <TouchableOpacity style={styles.clickable} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.link}>Find Equipment</Text>
                    </TouchableOpacity>
                </Text>

                <Text style={styles.paragraph}>
                    Have something for sale?{' '}
                    <TouchableOpacity style={styles.clickable} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={() => navigation.navigate(user?.email ? 'SellerListing' : 'Login')}>
                        <Text style={styles.link}>Sell Your Equipment</Text>
                    </TouchableOpacity>
                </Text>

                <Text style={styles.paragraph}>
                    We encourage you to contact us at any time with questions or comments.
                </Text>
            </View>

            <View style={styles.grid}>
                <View style={styles.gridItem}>
                    <Text style={styles.heading}>Address</Text>
                    <Text>641 Clearlake Rd Suite# 17</Text>
                    <Text>Cocoa, FL 32922-6309</Text>
                    <Text style={[styles.heading, { marginTop: 12 }]}>Phone Number</Text>
                    <TouchableOpacity style={styles.clickable} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={() => Linking.openURL('tel:+13522846314')}>
                        <Text style={styles.link}>352-284-6314</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.gridItem}>
                    <Text style={styles.heading}>Email</Text>
                    <TouchableOpacity style={styles.clickable} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={() => Linking.openURL('mailto:info@truckby.com')}>
                        <Text style={styles.emailLink}>info@truckby.com</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ContactUs;