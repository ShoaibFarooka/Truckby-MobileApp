import ExpoModulesCore
import StoreKit

public class AppStoreCountryModule: Module {
  public func definition() -> ModuleDefinition {
    Name("AppStoreCountry")

    // ISO 3166-1 alpha-3 code of the user's App Store storefront (e.g. "USA"),
    // or nil when it can't be determined
    AsyncFunction("getCountryAsync") { () async -> String? in
      return await Storefront.current?.countryCode
    }
  }
}
