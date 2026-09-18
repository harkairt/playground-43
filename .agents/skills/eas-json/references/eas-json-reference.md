# EAS JSON Complete Reference

Source: https://docs.expo.dev/eas/json/ and the Expo schema files at
`docs/public/static/schemas/unversioned/eas-json-*-schema.js`.

---

## EAS Build

### Common properties (both platforms)

| Property | Type | Description |
|---|---|---|
| `withoutCredentials` | boolean | If `true`, EAS CLI will not require credentials. Useful for custom builds. Default: `false`. |
| `extends` | string | Name of the build profile to inherit values from. Cannot be set per platform. |
| `credentialsSource` | `"local"` \| `"remote"` | Source of signing credentials. `local` uses your own `credentials.json`. `remote` uses EAS-managed credentials (default). |
| `releaseChannel` | string | **Deprecated.** Classic Updates release channel (SDK 49 and lower). Use `channel` instead. |
| `channel` | string | EAS Update channel where this build looks for updates. No effect when `developmentClient` is `true`. |
| `distribution` | `"store"` \| `"internal"` | Distribution method. `internal` makes build URLs shareable; `store` produces store uploads. |
| `developmentClient` | boolean | If `true`, produces a development build. Requires `expo-dev-client`. Default: `false`. |
| `resourceClass` | `"default"` \| `"medium"` \| `"large"` | Build machine resource class. `large` is not available on the free plan. |
| `prebuildCommand` | string | Override of the prebuild command. `--platform` and `--non-interactive` are added automatically. |
| `buildArtifactPaths` | string[] | Glob patterns for build artifact locations. Artifacts upload even if the build fails. |
| `uploadSourceMaps` | boolean | If `true`, uploads the JS source map to EAS for error symbolication. Default: `false`. |
| `node` | string | Node.js version for the build. |
| `corepack` | boolean | If `true`, enables corepack at build start. Default: `false`. |
| `yarn` | string | Yarn version for the build. |
| `pnpm` | string | pnpm version for the build. |
| `bun` | string | Bun version for the build. |
| `expoCli` | string | **Deprecated.** `expo-cli` version for prebuild (SDK 45 and lower). |
| `env` | object | Environment variables set during the build. For values you would commit to git. Do not put secrets here. |
| `autoIncrement` | boolean | If `true`, bumps `versionCode` (Android) or the last component of `buildNumber` (iOS). Default: `false`. |
| `cache` | object | Cache configuration (see sub-properties below). |
| `cache.disabled` | boolean | Disables caching. Default: `false`. |
| `cache.key` | string | Cache key. Change it to invalidate the cache. |
| `cache.paths` | string[] | Paths to save after a successful build and restore at the start of the next. |
| `config` | string | Custom workflow file name in `.eas/build/`. |
| `environment` | `"development"` \| `"preview"` \| `"production"` | Environment for applying environment variables. |

### Android build properties

| Property | Type | Description |
|---|---|---|
| `withoutCredentials` | boolean | If `true`, skips credential configuration. Useful when the debug keystore is in the repo. Default: `false`. |
| `image` | string | Build environment image. |
| `resourceClass` | `"default"` \| platform values | Android-specific resource class. |
| `ndk` | string | Android NDK version. |
| `autoIncrement` | boolean \| `"version"` \| `"versionCode"` | `"version"` bumps `expo.version` patch. `"versionCode"` (or `true`) bumps `expo.android.versionCode`. `false` does nothing (default). |
| `buildType` | `"app-bundle"` \| `"apk"` | Artifact type. `app-bundle` runs `:app:bundleRelease` (.aab). `apk` runs `:app:assembleRelease` (.apk). |
| `gradleCommand` | string | Custom Gradle task. Takes priority over `buildType` and `developmentClient`. |
| `applicationArchivePath` | string | Glob pattern for the application archive. Default: `android/app/build/outputs/**/*.{apk,aab}`. |
| `config` | string | Android-specific custom workflow file name. |

### iOS build properties

| Property | Type | Description |
|---|---|---|
| `withoutCredentials` | boolean | If `true`, skips credential configuration. Default: `false`. |
| `simulator` | boolean | If `true`, creates a simulator build. Default: `false`. |
| `enterpriseProvisioning` | `"universal"` \| `"adhoc"` | Provisioning method for `distribution: "internal"` with an Apple Enterprise account. `universal` is recommended. |
| `autoIncrement` | boolean \| `"version"` \| `"buildNumber"` | `"version"` bumps `expo.version` patch. `"buildNumber"` (or `true`) bumps the last component of `expo.ios.buildNumber`. `false` does nothing (default). |
| `image` | string | Build environment image. |
| `resourceClass` | `"default"` \| platform values | iOS-specific resource class. |
| `bundler` | string | Bundler (Ruby) version. |
| `fastlane` | string | Fastlane version. |
| `cocoapods` | string | CocoaPods version. |
| `scheme` | string | Xcode scheme. Auto-detected if the project has only one. |
| `buildConfiguration` | string | Xcode Build Configuration (`"Release"` or `"Debug"`). Defaults to `"Release"` for Expo projects. Takes priority over `developmentClient`. |
| `applicationArchivePath` | string | Glob pattern for the archive. Default: `ios/build/*.ipa` (or `*-iphonesimulator/*.app` for simulator). |
| `config` | string | iOS-specific custom workflow file name. |

---

## EAS Submit

### Android submit properties

| Property | Type | Description |
|---|---|---|
| `serviceAccountKeyPath` | string | Path to the JSON file with the Google Service Account Key for Google Play authentication. |
| `track` | `"production"` \| `"beta"` \| `"alpha"` \| `"internal"` | The release track to submit to. |
| `releaseStatus` | `"completed"` \| `"draft"` \| `"halted"` \| `"inProgress"` | Status of the release on Google Play. |
| `rollout` | number | Fraction of users who receive the release (0 to 1). Use only with `inProgress` release status. |
| `changesNotSentForReview` | boolean | If `true`, changes will not be sent for review until you do so manually from the Google Play Console. Default: `false`. |
| `applicationId` | string | Application ID for Expo-managed Service Account credentials. Usually auto-detected. Required with multiple product flavors. |

### iOS submit properties

| Property | Type | Description |
|---|---|---|
| `appleId` | string | Apple ID username. Also settable via `EXPO_APPLE_ID` env var. |
| `ascAppId` | string | App Store Connect unique application Apple ID number. If set, skips the app creation step. |
| `appleTeamId` | string | Apple Developer Team ID. |
| `sku` | string | Unique app identifier (not visible on the App Store). Auto-generated if omitted. |
| `language` | string | Primary language. Default: `"en-US"`. |
| `companyName` | string | Organization name. Required only for the first App Store submission. |
| `appName` | string | App name on the App Store. Defaults to `expo.name` from app config. |
| `ascApiKeyPath` | string | Path to the App Store Connect API Key `.p8` file. |
| `ascApiKeyIssuerId` | string | Issuer ID for the ASC API Key. |
| `ascApiKeyId` | string | Key ID of the ASC API Key. |
| `bundleIdentifier` | string | Bundle identifier for Expo-managed credentials. Usually auto-detected. Required with multiple Xcode schemes/targets. |
| `metadataPath` | string | Path to the store configuration metadata file. |
| `groups` | string[] | TestFlight internal group names. The build is also added to groups with automatic distribution enabled. |

---

## Profile inheritance

Any profile can set `"extends": "<other-profile>"` to inherit that profile's values. The chain can go up to 5 levels deep. Circular references are not allowed.

Platform-specific sections (`android`, `ios`) merge independently: the child's `android` block merges with the parent's `android` block.

## Examples

### Multi-profile build configuration

```json
{
  "build": {
    "base": {
      "node": "20.11.0",
      "pnpm": "9.7.0",
      "env": { "EXAMPLE_ENV": "value" },
      "android": { "image": "latest" },
      "ios": { "image": "latest" }
    },
    "development": {
      "extends": "base",
      "developmentClient": true,
      "distribution": "internal",
      "android": { "buildType": "apk" },
      "ios": { "simulator": true }
    },
    "staging": {
      "extends": "base",
      "distribution": "internal",
      "channel": "staging"
    },
    "production": {
      "extends": "base",
      "autoIncrement": true,
      "channel": "production"
    }
  }
}
```

### Submit with both platforms

```json
{
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-sa-key.json",
        "track": "production",
        "releaseStatus": "completed"
      },
      "ios": {
        "ascAppId": "1234567890",
        "appleTeamId": "AB12XYZ34S",
        "groups": ["Internal Testers"]
      }
    }
  }
}
```

### Staged Android rollout

```json
{
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-sa-key.json",
        "track": "production",
        "releaseStatus": "inProgress",
        "rollout": 0.1
      }
    }
  }
}
```

This sends the release to 10% of users. Increase the rollout from the Google Play Console.
