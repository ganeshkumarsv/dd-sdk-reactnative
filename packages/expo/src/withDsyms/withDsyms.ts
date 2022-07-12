import type { ConfigPlugin } from '@expo/config-plugins';
import { withXcodeProject } from '@expo/config-plugins';

const withDsyms: ConfigPlugin<{
    nodeBin: string;
    packageManagerBin: string;
}> = (config, { nodeBin, packageManagerBin }) => {
    return withXcodeProject(config, async config => {
        const xcodeProject = config.modResults;

        xcodeProject.addBuildPhase(
            [],
            'PBXShellScriptBuildPhase',
            'Upload dSYMs to Datadog',
            null /* target */,
            {
                shellScript: `set -e\\n${nodeBin} ${packageManagerBin} datadog-ci dsyms upload $DWARF_DSYM_FOLDER_PATH`
            }
        );

        return config;
    });
};

export default withDsyms;
