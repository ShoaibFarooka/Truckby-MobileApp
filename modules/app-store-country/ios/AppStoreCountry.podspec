Pod::Spec.new do |s|
  s.name           = 'AppStoreCountry'
  s.version        = '1.0.0'
  s.summary        = 'Reads the country of the App Store the app was installed from'
  s.description    = s.summary
  s.author         = 'Truckby'
  s.homepage       = 'https://truckby.com'
  s.platforms      = { :ios => '16.4' }
  s.swift_version  = '5.9'
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES'
  }

  s.source_files = "**/*.{h,m,swift}"
end
