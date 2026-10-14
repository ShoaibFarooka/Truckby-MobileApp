import { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, AppState } from 'react-native';
import { styles } from './PromoVideoStyles';
import { VideoView, useVideoPlayer } from 'expo-video';

const truckVideo = require("../../../../../../assets/videos/truck.mov");

const PromoVideo = () => {
    const [isReady, setIsReady] = useState(false);
    const appState = useRef(AppState.currentState);

    // Create the player empty: passing the source here loads it synchronously on
    // the iOS UI thread, which freezes scrolling until the video has loaded
    const player = useVideoPlayer(null, (p) => {
        p.loop = true;
        p.volume = 0;
    });

    useEffect(() => {
        let cancelled = false;

        // replaceAsync loads the asset off the UI thread
        player.replaceAsync(truckVideo)
            .then(() => {
                if (!cancelled) player.play();
            })
            .catch((error) => console.log('PromoVideo load error:', error?.message));

        return () => {
            cancelled = true;
        };
    }, [player]);

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
