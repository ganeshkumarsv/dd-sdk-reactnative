## Overview

The RUM React Native SDK supports Expo and Expo Go. The minimum supported version is [**@datadog/dd-sdk-reactnative:1.0.0-rc9**][1].

Datadog recommends using **Expo SDK 45** as a minimum version; previous versions may require manual steps.

## Setup

No configuration plugins are needed. To get started, see [React Native Monitoring][2].

## Expo Go

If you are using Expo Go, switch to development builds (recommended), or keep using Expo Go without Datadog while having it run on your standalone application (not recommended).

### Switch from Expo Go to development builds

Your application's [development builds][3] are debug builds that contain the `expo-dev-client` package.

1. Enable the [custom native code to run][4] with `expo run:android` and `expo run:ios`.
2. To start using your development application, run `expo install expo-dev-client` and `expo start --dev-client`. This installs and starts the [`expo-dev-client` package][5] to execute the added native code in dev mode.

### Develop with Expo Go

When your application runs inside of Expo Go, you are unable to add any custom native code that is not part of the Expo Go application. Because the RUM React Native SDK relies on some custom native code to run, you can develop your application inside Expo Go without Datadog, and use Datadog in your standalone builds.

Your application crashes in Expo Go when some native code (that is not included) is called. To use Datadog with your standalone application and continue using Expo Go in development, add the following TypeScript file to your project:

```typescript
// mockDatadog.ts
// Datadog does not recommend this approach, consider moving to Expo development builds instead.
// This file is not officially maintained and might not be up-to-date with new releases.

import {
    DdLogs,
    DdTrace,
    DdRum,
    DdSdkReactNative
} from '@datadog/mobile-react-native';

if (__DEV__) {
    const emptyAsyncFunction = () => new Promise<void>(resolve => resolve());

    DdLogs.debug = emptyAsyncFunction;
    DdLogs.info = emptyAsyncFunction;
    DdLogs.warn = emptyAsyncFunction;
    DdLogs.error = emptyAsyncFunction;

    DdTrace.startSpan = () =>
        new Promise<string>(resolve => resolve('fakeSpanId'));
    DdTrace.finishSpan = emptyAsyncFunction;
    DdRum.startView = emptyAsyncFunction;
    DdRum.stopView = emptyAsyncFunction;
    DdRum.startAction = emptyAsyncFunction;
    DdRum.stopAction = emptyAsyncFunction;
    DdRum.addAction = emptyAsyncFunction;
    DdRum.startResource = emptyAsyncFunction;
    DdRum.stopResource = emptyAsyncFunction;
    DdRum.addError = emptyAsyncFunction;
    DdRum.addTiming = emptyAsyncFunction;

    DdSdkReactNative.initialize = emptyAsyncFunction;
    DdSdkReactNative.setUser = emptyAsyncFunction;
    DdSdkReactNative.setAttributes = emptyAsyncFunction;
    DdSdkReactNative.setTrackingConsent = emptyAsyncFunction;
}
```

Then, import it before initializing the SDK:

```typescript
import './mockDatadog';
import { DdSdkReactNative } from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(/* your config */);
DdSdkReactNative.initialize(config);
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/1.0.0-rc9
[2]: https://docs.datadoghq.com/real_user_monitoring/reactnative/#setup
[3]: https://docs.expo.dev/development/introduction/
[4]: https://docs.expo.dev/workflow/customizing/#releasing-apps-with-custom-native-code-to
[5]: https://docs.expo.dev/development/getting-started/
