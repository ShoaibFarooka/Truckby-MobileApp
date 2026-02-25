import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { styles } from './PrivacyStyles';

const Privacy = () => {
    const openEmail = () => {
        Linking.openURL('mailto:info@truckby.com');
    };

    return (
        <View style={styles.container}>
            {/* Privacy Policy */}
            <View style={styles.sectionContainer}>
                <Text style={styles.title}>TRUCKBY PRIVACY POLICY</Text>
                <Text style={styles.date}>Last Updated: May 5, 2025</Text>

                <View style={styles.content}>
                    <View style={styles.block}>
                        <Text style={styles.heading}>1. INTRODUCTION</Text>
                        <Text style={styles.paragraph}>
                            Truckby ("we", "our", or "us") is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform, including www.truckby.com.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>2. INFORMATION WE COLLECT</Text>
                        <Text style={styles.paragraph}>
                            We may collect personal information such as your name, email, phone number, location, IP address, device information, cookies, and usage data. This includes data submitted by you and data collected automatically.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>3. USE OF INFORMATION</Text>
                        <Text style={styles.paragraph}>
                            We use your data to operate and improve our services, connect buyers with sellers, provide customer support, process payments via third-party providers, display targeted ads, analyze usage, comply with law, and communicate with you.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>4. SHARING OF INFORMATION</Text>
                        <Text style={styles.paragraph}>We may share your information with:</Text>
                        <Text style={styles.paragraph}>{`\u2022`} Sellers and advertisers you engage with</Text>
                        <Text style={styles.paragraph}>{`\u2022`} Third-party service providers (e.g., hosting, analytics, payment processors)</Text>
                        <Text style={styles.paragraph}>{`\u2022`} Legal authorities where required</Text>
                        <Text style={styles.paragraph}>{`\u2022`} Our affiliates for internal business purposes</Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>5. COOKIES & TRACKING</Text>
                        <Text style={styles.paragraph}>
                            We use cookies and analytics (including Google Analytics) to enhance your experience. You may opt out by changing your browser settings or using industry opt-out tools.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>6. DATA SECURITY</Text>
                        <Text style={styles.paragraph}>
                            We employ industry-standard measures to protect your personal data but cannot guarantee 100% security. Use is at your own risk.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>7. YOUR RIGHTS</Text>
                        <Text style={styles.paragraph}>
                            You may request access, correction, or deletion of your personal data by contacting us. California residents may have additional rights under the CCPA.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>8. CHILDREN</Text>
                        <Text style={styles.paragraph}>
                            Our services are not intended for users under 18. We do not knowingly collect personal data from minors.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>9. CHANGES</Text>
                        <Text style={styles.paragraph}>
                            We may update this policy periodically. Continued use of our services constitutes acceptance.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>10. CONTACT US</Text>
                        <TouchableOpacity
                            style={styles.clickable}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            onPress={openEmail}
                        >
                            <Text style={styles.link}>info@truckby.com</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.divider} />

            {/* Return & Refund Policy */}
            <View style={styles.sectionContainer}>
                <Text style={styles.title}>TRUCKBY RETURN & REFUND POLICY</Text>
                <Text style={styles.date}>Last Updated: May 5, 2025</Text>

                <View style={styles.content}>
                    <Text style={styles.paragraph}>
                        Truckby provides an online platform for listing commercial vehicles, equipment, and trailers. All advertising and listing fees paid to Truckby are <Text style={styles.bold}>non-refundable</Text>.
                    </Text>

                    <View style={styles.block}>
                        <Text style={styles.heading}>1. NO RETURNS OR REFUNDS</Text>
                        <Text style={styles.paragraph}>
                            Once a listing is activated on our platform, <Text style={styles.bold}>no refunds or returns</Text> will be issued. This applies regardless of listing duration, user activity, or outcome.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>2. CONFIRMATION PRIOR TO ACTIVATION</Text>
                        <Text style={styles.paragraph}>
                            Users are responsible for reviewing and confirming all details before activating any listing. Once activated, your payment is final.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>3. NON-TRANSFERABLE</Text>
                        <Text style={styles.paragraph}>
                            Listing credits or payments cannot be transferred to other users or listings once used.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>4. CONTACT</Text>
                        <TouchableOpacity
                            style={styles.clickable}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            onPress={openEmail}
                        >
                            <Text style={styles.link}>info@truckby.com</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.italicNote}>
                        Thank you for understanding and supporting a fair marketplace.
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            {/* Terms of Use */}
            <View style={styles.sectionContainer}>
                <Text style={styles.title}>TRUCKBY TERMS OF USE</Text>
                <Text style={styles.date}>Last Updated: May 5, 2025</Text>

                <View style={styles.content}>
                    <View style={styles.block}>
                        <Text style={styles.heading}>1. ACCEPTANCE</Text>
                        <Text style={styles.paragraph}>
                            By accessing or using Truckby.com, you agree to these Terms of Use. If you do not agree, do not use the platform.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>2. ELIGIBILITY</Text>
                        <Text style={styles.paragraph}>
                            You must be 18 or older and legally able to enter into contracts.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>3. SERVICES</Text>
                        <Text style={styles.paragraph}>
                            Truckby is a listing platform connecting buyers and sellers of commercial vehicles and equipment. We do not broker, sell, or guarantee the quality of listed items.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>4. USER ACCOUNTS</Text>
                        <Text style={styles.paragraph}>
                            You are responsible for maintaining account security. Provide accurate information. Truckby may terminate accounts for violations.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>5. LISTINGS & PAYMENTS</Text>
                        <Text style={styles.paragraph}>
                            Listings are subject to fees. Once activated, listing fees are non-refundable. Sellers are responsible for listing accuracy and compliance with applicable law.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>6. PROHIBITED USES</Text>
                        <Text style={styles.paragraph}>
                            You may not use the site for unlawful, harmful, or fraudulent purposes. Do not post false content, infringe intellectual property, or interfere with the platform.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>7. INTELLECTUAL PROPERTY</Text>
                        <Text style={styles.paragraph}>
                            All content on Truckby is owned by Truckby or its licensors. You may not copy or reproduce content without permission.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>8. DISCLAIMERS</Text>
                        <Text style={styles.paragraph}>
                            Truckby provides its platform "as is". We disclaim all warranties and are not liable for damages or disputes between users.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>9. TERMINATION</Text>
                        <Text style={styles.paragraph}>
                            Truckby reserves the right to suspend or terminate your access at any time, with or without cause.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>10. GOVERNING LAW</Text>
                        <Text style={styles.paragraph}>
                            These terms are governed by the laws of the State of Florida. Any disputes shall be resolved through arbitration in Florida.
                        </Text>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.heading}>11. CONTACT</Text>
                        <TouchableOpacity
                            style={styles.clickable}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            onPress={openEmail}
                        >
                            <Text style={styles.link}>info@truckby.com</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Privacy;