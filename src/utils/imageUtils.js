import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';

// Profile photos only show as small circles, so 512px is plenty and keeps uploads around 50-100 KB
const AVATAR_MAX_SIZE = 512;

// Shrinks a picked photo to a small JPEG and returns the file object FormData expects.
// Falls back to the original photo if resizing fails, so the user can still upload it.
export const resizeForUpload = async (asset, maxSize = AVATAR_MAX_SIZE) => {
    try {
        const isLandscape = (asset.width || 0) >= (asset.height || 0);
        const longSide = isLandscape ? asset.width : asset.height;
        const context = ImageManipulator.manipulate(asset.uri);
        // Only shrink, never enlarge a photo that is already small
        if (!longSide || longSide > maxSize) {
            context.resize(isLandscape ? { width: maxSize } : { height: maxSize });
        }
        const image = await context.renderAsync();
        const result = await image.saveAsync({ compress: 0.7, format: SaveFormat.JPEG });
        return { uri: result.uri, name: 'photo.jpg', type: 'image/jpeg' };
    } catch (error) {
        console.log('Image resize failed, uploading original: ', error?.message);
        const ext = asset.uri.split('.').pop();
        return {
            uri: asset.uri,
            name: asset.fileName || `photo.${ext}`,
            type: asset.mimeType || `image/${ext === 'jpg' ? 'jpeg' : ext}`,
        };
    }
};
