import { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    Modal, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
/* import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import truckService from '../../../../services/truckService'; */
import { styles } from './InfoStyles';

const formatNumberWithCommas = (num) => {
    if (num === null || num === undefined || num === '') return '';
    return Number(num).toLocaleString();
};

const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    const cleaned = String(phone).replace(/\D/g, '');
    if (cleaned.length === 10)
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    if (cleaned.length === 11)
        return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    return String(phone);
};

const Info = ({ data }) => {
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSend = async () => {
        if (!email.trim() || !message.trim()) {
            alert('Both Email and Message are required!');
            return;
        }
        const payload = {
            email,
            message,
            sellerEmail: data?.email,
            vehicleName: data?.vehicleName,
        };
        dispatch(ShowLoading());
        try {
            await truckService.sendMessage(payload);
            setEmail('');
            setMessage('');
            alert('Message sent successfully!');
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            dispatch(HideLoading());
        }
        setShowPopup(false);
    };

    const handleCancel = () => {
        setShowPopup(false);
        setEmail('');
        setMessage('');
    };

    return (
        <View style={styles.container}>

            {/* ── Vehicle Name ── */}
            <Text style={styles.vehicleName}>
                {data?.vehicleName ? data.vehicleName.toUpperCase() : ''}
            </Text>

            <View style={styles.divider} />

            {/* ── Price Row ── */}
            <View style={styles.priceTopRow}>
                <Text style={styles.priceLabel}>Price</Text>
                <View style={styles.mileageRow}>
                    <Ionicons name="speedometer-outline" size={15} color="#1E1E1E" />
                    <Text style={styles.mileageText}>
                        {data?.mileage
                            ? `${formatNumberWithCommas(data.mileage)} Miles`
                            : 'N/A'}
                    </Text>
                </View>
            </View>

            {/* ── Price Value + Location ── */}
            <View style={styles.priceLocationRow}>
                <Text style={[styles.priceValue, !data?.vehiclePrice || data.vehiclePrice === 0 ? styles.priceRed : styles.priceRed]}>
                    {data?.vehiclePrice && data.vehiclePrice !== 0
                        ? `$${data.vehiclePrice.toLocaleString()}`
                        : 'Contact for Price'}
                </Text>
                <View style={styles.locationRow}>
                    <Ionicons name="location-sharp" size={13} color="#1E1E1E" />
                    <Text style={styles.locationText}>
                        {`${data?.country || ''}${data?.state ? `, ${data.state}` : ''}`}
                    </Text>
                </View>
            </View>

            {/* ── Contact Card ── */}
            <View style={styles.contactCard}>
                <Text style={styles.contactTitle}>Contact Information</Text>

                {/* Name */}
                <View style={styles.contactRow}>
                    <FontAwesome name="user" size={14} color="#374151" />
                    <Text style={styles.contactText}>{data?.name || ''}</Text>
                </View>

                {/* Address */}
                {!!data?.address && (
                    <View style={styles.contactRow}>
                        <Ionicons name="location-sharp" size={14} color="#374151" />
                        <Text style={styles.contactText}>{data.address}</Text>
                    </View>
                )}

                {/* Phone */}
                {!!data?.phone && (
                    <View style={styles.contactRow}>
                        <FontAwesome name="phone" size={14} color="#374151" />
                        <Text style={styles.contactText}>{formatPhoneNumber(data.phone)}</Text>
                    </View>
                )}

                {/* Company + Button row */}
                <View style={styles.companyButtonRow}>
                    {!!data?.companyName && (
                        <View style={styles.contactRow}>
                            <MaterialIcons name="business" size={15} color="#374151" />
                            <Text style={styles.contactText}>{data.companyName}</Text>
                        </View>
                    )}
                    <TouchableOpacity
                        style={styles.contactButton}
                        onPress={() => setShowPopup(true)}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.contactButtonText}>Contact Seller</Text>
                        <FontAwesome5 name="comment" size={13} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* ── Modal ── */}
            <Modal visible={showPopup} transparent animationType="fade">
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalOverlay}
                >
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Contact Seller</Text>

                        <TextInput
                            style={styles.modalInput}
                            placeholder="Your Email"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />

                        <TextInput
                            style={[styles.modalInput, styles.modalTextArea]}
                            placeholder="Your Message"
                            placeholderTextColor="#9CA3AF"
                            multiline
                            numberOfLines={4}
                            value={message}
                            onChangeText={setMessage}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={handleCancel}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.sendButton}
                                onPress={handleSend}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.sendText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

        </View>
    );
};

export default Info;