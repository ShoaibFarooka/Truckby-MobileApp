import { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    Modal, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Toast } from 'toastify-react-native';
import truckService from '../../../../../services/truckService';
import { getErrorMessage } from '../../../../../utils/apiError';
import { styles } from './ReportListingStyles';

// Must match REPORT_REASONS on the server
const REASONS = [
    'Spam or scam',
    'Misleading information',
    'Offensive content',
    'Already sold or no longer available',
    'Other',
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// "Report this listing" link and its popup. The report is emailed to the Truckby team.
const ReportListing = ({ truckId }) => {
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState('');
    const [details, setDetails] = useState('');
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);
    // Shown inside the popup: the global loader and toasts render behind a native Modal
    const [formError, setFormError] = useState('');

    const reset = () => {
        setReason('');
        setDetails('');
        setEmail('');
        setFormError('');
    };

    const handleCancel = () => {
        if (sending) return;
        setOpen(false);
        reset();
    };

    const handleSubmit = async () => {
        if (sending) return;

        const trimmedEmail = email.trim();
        if (!reason) {
            setFormError('Please choose a reason.');
            return;
        }
        if (trimmedEmail && !emailRegex.test(trimmedEmail)) {
            setFormError('Please enter a valid email address!');
            return;
        }

        const payload = { reason };
        if (details.trim()) payload.details = details.trim();
        if (trimmedEmail) payload.email = trimmedEmail;

        setFormError('');
        setSending(true);
        try {
            const response = await truckService.reportTruck(truckId, payload);
            setOpen(false);
            reset();
            Toast.success(response?.message || "Thanks, we'll review this listing.");
        } catch (error) {
            setFormError(getErrorMessage(error, 'Failed to send the report. Please try again.'));
        } finally {
            setSending(false);
        }
    };

    if (!truckId) return null;

    return (
        <>
            <TouchableOpacity
                style={styles.reportLink}
                onPress={() => setOpen(true)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                activeOpacity={0.7}
            >
                <Ionicons name="flag-outline" size={14} color="#6B7280" />
                <Text style={styles.reportLinkText}>Report this listing</Text>
            </TouchableOpacity>

            <Modal visible={open} transparent animationType="fade" onRequestClose={handleCancel}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalOverlay}
                >
                    <View style={styles.modalBox}>
                        <ScrollView keyboardShouldPersistTaps="handled">
                            <Text style={styles.modalTitle}>Report this listing</Text>

                            <Text style={styles.label}>Reason</Text>
                            {REASONS.map((item) => {
                                const selected = reason === item;
                                return (
                                    <TouchableOpacity
                                        key={item}
                                        style={styles.reasonRow}
                                        onPress={() => setReason(item)}
                                        disabled={sending}
                                        activeOpacity={0.7}
                                    >
                                        <Ionicons
                                            name={selected ? 'radio-button-on' : 'radio-button-off'}
                                            size={20}
                                            color={selected ? '#DF0805' : '#9CA3AF'}
                                        />
                                        <Text style={styles.reasonText}>{item}</Text>
                                    </TouchableOpacity>
                                );
                            })}

                            <Text style={[styles.label, styles.labelSpaced]}>Details (optional)</Text>
                            <TextInput
                                style={[styles.modalInput, styles.modalTextArea]}
                                placeholder="Tell us what's wrong with this listing"
                                placeholderTextColor="#9CA3AF"
                                multiline
                                numberOfLines={4}
                                maxLength={1000}
                                value={details}
                                onChangeText={setDetails}
                                editable={!sending}
                            />

                            <Text style={styles.label}>Your email (optional)</Text>
                            <TextInput
                                style={styles.modalInput}
                                placeholder="So we can follow up with you"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                editable={!sending}
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
                                    onPress={handleSubmit}
                                    disabled={sending}
                                    activeOpacity={0.8}
                                >
                                    {sending
                                        ? <ActivityIndicator size="small" color="#fff" />
                                        : <Text style={styles.sendText}>Submit</Text>}
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </>
    );
};

export default ReportListing;
