import { requireOptionalNativeModule } from "expo";

// Missing on Android and in Expo Go, where the country is reported as unknown
const AppStoreCountry = requireOptionalNativeModule("AppStoreCountry");

// The App Store storefront country as an ISO 3166-1 alpha-3 code (e.g. "USA"),
// or null when it's unknown
export async function getAppStoreCountryAsync() {
    if (!AppStoreCountry) return null;
    try {
        return await AppStoreCountry.getCountryAsync();
    } catch {
        return null;
    }
}
