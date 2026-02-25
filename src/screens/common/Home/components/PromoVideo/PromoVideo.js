import { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, AppState } from 'react-native';
import { styles } from './PromoVideoStyles';
import { VideoView, useVideoPlayer } from 'expo-video';

const truckVideo = require("../../../../../../assets/videos/truck.mov");

const PromoVideo = () => {
    const [isReady, setIsReady] = useState(false);
    const appState = useRef(AppState.currentState);

    // Initialize player with local file
    const player = useVideoPlayer(truckVideo, (p) => {
        p.loop = true;
        p.volume = 0;
        p.play();
    });

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                // App came to foreground, resume playback
                if (player && player.play) {
                    player.play();
                }
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, [player]);

    return (
        <View style={styles.container}>
            {/* Spinner while video loads */}
            {!isReady && (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            )}

            {/* Video background */}
            <VideoView
                player={player}
                style={styles.video}
                onFirstFrameRender={() => setIsReady(true)}
                contentFit="cover"
                fullscreenOptions={{ enabled: false }}
                nativeControls={false}
            />
        </View>
    );
};

export default PromoVideo;
