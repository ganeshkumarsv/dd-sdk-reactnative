import type { ConfigPlugin } from '@expo/config-plugins';
import { withAppBuildGradle } from '@expo/config-plugins';

const withSourcemapsAndroid: ConfigPlugin<void> = config => {
    return withAppBuildGradle(config, async config => {
        // config = { modResults, modRequest, ...expoConfig }

        const appBuildGradle = config.modResults;
        appBuildGradle.contents = appBuildGradle.contents.replace(
            /apply from: "..\/..\/node_modules\/react-native\/react.gradle"/,
            `apply from: "../../node_modules/react-native/react.gradle"\napply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"`
        );
        console.log(
            '🚀 ~ file: withSourcemapsAndroid.ts ~ line 13 ~ appBuildGradle.contents',
            appBuildGradle.contents
        );

        return config;
    });
};

export default withSourcemapsAndroid;
