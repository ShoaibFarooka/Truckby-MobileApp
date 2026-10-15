import { useCallback, useRef, useState } from "react";
import uploadService from "../services/uploadService";
import { resizeForUpload } from "../utils/imageUtils";

// Shrinks a picked photo on the device right away, but only uploads it when the form is
// submitted, so photos from abandoned forms never reach the server.
function useImageUpload() {
    const jobRef = useRef(null);
    // True only while a submit is waiting on the upload
    const [uploading, setUploading] = useState(false);

    const prepare = useCallback((asset) => {
        // Picking another photo replaces the job, so only the latest photo is uploaded
        const resized = resizeForUpload(asset);
        jobRef.current = { resized, url: null };
    }, []);

    const clear = useCallback(() => {
        jobRef.current = null;
    }, []);

    // Uploads the picked photo and resolves with its URL, or null when no photo was picked
    const upload = useCallback(async () => {
        const job = jobRef.current;
        if (!job) return null;
        // Already uploaded by an earlier submit whose save failed: reuse it instead of uploading a duplicate
        if (job.url) return job.url;
        setUploading(true);
        try {
            const form = new FormData();
            form.append("images", await job.resized);
            const res = await uploadService.uploadImg(form);
            const url = res?.success ? res.urls?.[0] : null;
            if (!url) throw new Error("Image upload failed");
            job.url = url;
            return url;
        } finally {
            setUploading(false);
        }
    }, []);

    // The shrunk photo as a FormData file, or null when no photo was picked. Used by
    // signup, which sends the photo with the registration request instead of uploading it.
    const getFile = useCallback(async () => {
        const job = jobRef.current;
        return job ? await job.resized : null;
    }, []);

    return { prepare, clear, upload, uploading, getFile };
}

export default useImageUpload;
