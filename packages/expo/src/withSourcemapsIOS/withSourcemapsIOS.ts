import type { ConfigPlugin } from '@expo/config-plugins';
import { withXcodeProject } from '@expo/config-plugins';

const withSourcemapsIOS: ConfigPlugin<{
    nodeBin: string;
    packageManagerBin: string;
}> = (config, { nodeBin, packageManagerBin }) => {
    return withXcodeProject(config, async config => {
        const xcodeProject = config.modResults;
        const bundlePhase = xcodeProject.pbxItemByComment(
            'Bundle React Native code and images',
            'PBXShellScriptBuildPhase'
        );

        const [beforeScript, afterScript] = bundlePhase.shellScript.split(
            '../node_modules/react-native/scripts/react-native-xcode.sh'
        );
        const datadogScript = `export SOURCEMAP_FILE=./build/main.jsbundle.map\\n${nodeBin} ${packageManagerBin} datadog-ci react-native xcode node_modules/react-native/scripts/react-native-xcode.sh`;
        bundlePhase.shellScript = `${beforeScript}${datadogScript}${afterScript}`;

        return config;
    });
};

export default withSourcemapsIOS;
