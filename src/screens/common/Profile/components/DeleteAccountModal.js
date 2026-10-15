import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { styles } from './DeleteAccountModalStyles';

// Asks for the password before deleting the account. Errors are shown inside the
// modal because toasts and the global loader can render behind a Modal.
const DeleteAccountModal = ({ visible, deleting, error, onClose, onConfirm }) => {
    const [password, setPassword] = useState('');

    // Start empty every time the modal opens
    useEffect(() => {
        if (visible) setPassword('');
    }, [visible]);

    const canDelete = password.trim().length > 0 && !deleting;

    const handleClose = () => {
        if (!deleting) onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
            <TouchableWithoutFeedback onPress={handleClose}>
                <KeyboardAvoidingView
                    style={styles.overlay}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <Text style={styles.title}>Delete Account</Text>

                            <Text style={styles.message}>
                                This permanently deletes your account, your listings and their photos.
                                If you have an active plan, it ends immediately and the remaining time
                                isn't refunded. This can't be undone.
                            </Text>

                            <Text style={styles.label}>Enter your password to confirm</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#767676"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={!deleting}
                            />

                            {!!error && <Text style={styles.errorText}>{error}</Text>}

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.cancelButton, deleting && styles.buttonDisabled]}
                                    onPress={handleClose}
                                    disabled={deleting}
                                >
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.deleteButton, !canDelete && styles.buttonDisabled]}
                                    onPress={() => onConfirm(password)}
                                    disabled={!canDelete}
                                >
                                    {deleting ? (
                                        <ActivityIndicator color="#FFFFFF" />
                                    ) : (
                                        <Text style={styles.buttonText}>Delete</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default DeleteAccountModal;
