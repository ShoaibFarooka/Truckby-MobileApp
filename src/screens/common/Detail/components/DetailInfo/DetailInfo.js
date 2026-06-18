import { View, Text } from 'react-native';
import { styles } from './DetailInfoStyles';

// ── InfoRow ──
const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{String(value)}</Text>
    </View>
);

// ── Section ──
const Section = ({ title, data }) => {
    const filteredData = Object.entries(data || {}).filter(
        ([, value]) =>
            value !== undefined && value !== null &&
            value !== '' && value !== 0 && value !== '0'
    );
    if (filteredData.length === 0) return null;

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
            </View>
            {filteredData.map(([label, value], index) => (
                <InfoRow key={index} label={label} value={value} />
            ))}
        </View>
    );
};

// ── DetailInfo ──
const DetailInfo = ({ data = {} }) => {
    // Filter out entirely empty sections
    const filteredSections = Object.entries(data).reduce((acc, [title, sectionData]) => {
        const validFields = Object.entries(sectionData || {}).filter(
            ([, value]) =>
                value !== undefined && value !== null &&
                value !== '' && value !== 0 && value !== '0'
        );
        if (validFields.length > 0) acc[title] = Object.fromEntries(validFields);
        return acc;
    }, {});

    if (Object.keys(filteredSections).length === 0) {
        return (
            <View style={styles.detailsContainer}>
                <Text style={styles.emptyText}>No vehicle details available.</Text>
            </View>
        );
    }

    return (
        <View style={styles.detailsContainer}>
            {Object.entries(filteredSections).map(([section, sectionData], index) =>
                section === 'Description' ? (
                    <View key={index} style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionHeaderText}>Description</Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                            {String(sectionData['Description'] || '')
                                .split(/[\n,;•\-]+/)
                                .map((point, idx) => {
                                    const trimmed = point.trim();
                                    return trimmed ? (
                                        <View key={idx} style={styles.bulletRow}>
                                            <Text style={styles.bullet}>{'\u2022'}</Text>
                                            <Text style={styles.bulletText}>{trimmed}</Text>
                                        </View>
                                    ) : null;
                                })}
                        </View>
                    </View>
                ) : (
                    <Section key={index} title={section} data={sectionData} />
                )
            )}
        </View>
    );
};

export default DetailInfo;