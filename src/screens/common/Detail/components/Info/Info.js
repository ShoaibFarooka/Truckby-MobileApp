import { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    Modal, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Toast } from 'toastify-react-native';
import truckService from '../../../../../services/truckService';
import { getErrorMessage, isSessionExpiredError } from '../../../../../utils/apiError';
import ReportListing from '../ReportListing/ReportListing';
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Info = ({ data }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    // Shown inside the popup: the global loader and toasts render behind a native Modal
    const [formError, setFormError] = useState('');

    const handleSend = async () => {
        if (sending) return;

        const trimmedEmail = email.trim();
        const trimmedMessage = message.trim();
        if (!trimmedEmail || !trimmedMessage) {
            setFormError('Both Email and Message are required!');
            return;
        }
        if (!emailRegex.test(trimmedEmail)) {
            setFormError('Please enter a valid email address!');
            return;
        }
        if (!data?.email) {
            setFormError('Seller contact details are unavailable. Please try again later.');
            return;
        }

        const payload = {
            email: trimmedEmail,
            message: trimmedMessage,
            sellerEmail: data.email,
            vehicleName: data?.vehicleName,
        };

        setFormError('');
        setSending(true);
        try {
            const response = await truckService.sendMessage(payload);
            setShowPopup(false);
            setEmail('');
            setMessage('');
            Toast.success(response?.message || 'Message sent successfully!');
        } catch (error) {
            console.log('Error sending message:', error?.response?.data || error?.message);
            if (isSessionExpiredError(error)) {
                // The session-expired toast is already shown; close the popup so it's visible
                setShowPopup(false);
                return;
            }
            setFormError(getErrorMessage(error, 'Failed to send message. Please try again.'));
        } finally {
            setSending(false);
        }
    };

    const handleCancel = () => {
        if (sending) return;
        setShowPopup(false);
        setEmail('');
        setMessage('');
        setFormError('');
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

            <ReportListing truckId={data?._id} />

            {/* ── Modal ── */}
            <Modal visible={showPopup} transparent animationType="fade" onRequestClose={handleCancel}>
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

                        {!!formError && <Text style={styles.errorText}>{formError}</Text>}

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.cancelButton, sending && styles.buttonDisabled]}
                                onPress={handleCancel}
                                disabled={sending}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.sendButton, sending && styles.buttonDisabled]}
                                onPress={handleSend}
                                disabled={sending}
                                activeOpacity={0.8}
                            >
                                {sending
                                    ? <ActivityIndicator size="small" color="#fff" />
                                    : <Text style={styles.sendText}>Send</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

        </View>
    );
};

export default Info;