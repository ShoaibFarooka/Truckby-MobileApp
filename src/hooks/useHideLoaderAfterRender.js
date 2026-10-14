import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoader } from "../redux/loaderSlice";

// Returns a function that hides the global loader only after the next render
// has been committed and painted, so newly fetched content is laid out (and the
// page is scrollable) before the overlay disappears.
// Call it in the same tick as the state update that renders the data.
function useHideLoaderAfterRender() {
    const dispatch = useDispatch();
    const pendingRef = useRef(0);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const count = pendingRef.current;
        if (!count) return;
        pendingRef.current = 0;

        // Frame 1: layout of the committed render; frame 2: it has been painted
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                for (let i = 0; i < count; i++) dispatch(hideLoader());
            });
        });
    }, [tick, dispatch]);

    // Never leave the loader counter raised if the screen unmounts first
    useEffect(() => () => {
        for (let i = 0; i < pendingRef.current; i++) dispatch(hideLoader());
        pendingRef.current = 0;
    }, [dispatch]);

    return useCallback(() => {
        pendingRef.current += 1;
        setTick((t) => t + 1);
    }, []);
}

export default useHideLoaderAfterRender;
