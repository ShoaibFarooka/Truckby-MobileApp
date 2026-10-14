import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './EmptyStateStyles';

// Message shown in place of a list that loaded but has nothing to show
const EmptyState = ({ icon = 'search-outline', title, message, actionLabel, onAction }) => (
    <View style={styles.container}>
        <View style={styles.iconCircle}>
            <Ionicons name={icon} size={28} color="#DF0805" />
        </View>

        {!!title && <Text style={styles.title}>{title}</Text>}
        {!!message && <Text style={styles.message}>{message}</Text>}

        {!!actionLabel && !!onAction && (
            <Pressable
                onPress={onAction}
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            >
                <Text style={styles.buttonText}>{actionLabel}</Text>
            </Pressable>
        )}
    </View>
);

export default EmptyState;
