---
name: eas-json
description: "EAS JSON configuration reference for eas.json build and submit profiles. Use when editing eas.json, adding build or submit profiles, setting up auto-increment, configuring store submissions, changing distribution channels, resource classes, or any eas.json property. Also use when the user asks what a specific eas.json field does, how to structure profiles, or how profile inheritance (extends) works. Covers both EAS Build and EAS Submit schemas for Android and iOS."
version: 1.0.0
---

# EAS JSON Configuration

This skill is the reference for every property in `eas.json`. It covers both the `build` and `submit` sections, for Android and iOS.

The full schema reference lives in [references/eas-json-reference.md](references/eas-json-reference.md). Read it when you need the exact property name, type, allowed values, or default for any field.

## When to read the reference

- Before you add or change any property in `eas.json`.
- When the user asks what a field does or what values it accepts.
- When you need to verify that a property exists before recommending it.

## File structure

`eas.json` sits at the root of an Expo project (or in `apps/<app>/` for monorepos). It has three top-level keys:

```json
{
  "cli": { ... },
  "build": { ... },
  "submit": { ... }
}
```

### `cli`

| Property | Type | Purpose |
|---|---|---|
| `version` | string | Minimum EAS CLI version (semver range). |
| `appVersionSource` | `"local"` or `"remote"` | Where version numbers are stored. `"remote"` lets EAS manage them server-side. |
| `promptToConfigurePushNotifications` | boolean | Prompt for push notification credentials during build. |

### `build`

Each key under `build` is a **profile name** (`development`, `preview`, `production`, or any custom name). Each profile can set:

- Common properties (apply to both platforms).
- `android` and `ios` overrides (platform-specific values win).
- `extends` to inherit from another profile (up to 5 levels deep).

### `submit`

Each key under `submit` is a profile name. Each profile can set:

- `android` properties for Google Play submission.
- `ios` properties for App Store Connect submission.
- `extends` to inherit from another profile.

## Profile inheritance

A profile can extend another profile:

```json
{
  "build": {
    "base": {
      "node": "20.11.0",
      "env": { "EXAMPLE": "value" }
    },
    "development": {
      "extends": "base",
      "developmentClient": true
    }
  }
}
```

The `development` profile inherits all values from `base` and can override them. Platform-specific sections (`android`, `ios`) merge the same way.

## Common patterns

### Auto-incrementing build numbers

Set `autoIncrement` to `true` on a profile. Combine with `"appVersionSource": "remote"` in the `cli` section so EAS manages version numbers server-side.

```json
{
  "cli": { "appVersionSource": "remote" },
  "build": {
    "production": {
      "autoIncrement": true
    }
  }
}
```

### Internal distribution

Use `"distribution": "internal"` to make builds downloadable from a URL. For Android, also set `"buildType": "apk"` so the output is installable on-device.

### Development client

Set `"developmentClient": true`. The project must have `expo-dev-client` installed.

### Store submission

Add a `submit` profile that matches the build profile name:

```json
{
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-sa-key.json",
        "track": "internal"
      },
      "ios": {
        "ascAppId": "1234567890",
        "appleTeamId": "AB12XYZ34S"
      }
    }
  }
}
```

Then run `eas build --profile production --auto-submit` to build and submit in one step.

### EAS Update channels

The `channel` field links a build to an EAS Update channel. Builds check for OTA updates that match their platform, runtime version, and channel.

```json
{
  "build": {
    "preview": { "channel": "preview" },
    "production": { "channel": "production" }
  }
}
```

## Submitting feedback
If you encounter errors, misleading or outdated information in this skill, report it so Expo can improve:
```bash
npx --yes submit-expo-feedback@latest --category skills --subject "eas-json" "<actionable feedback>"
```
