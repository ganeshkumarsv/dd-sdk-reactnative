import type { ConfigPlugin } from '@expo/config-plugins';
import { withPlugins } from '@expo/config-plugins';

import withDsyms from './withDsyms/withDsyms';
import withProguardMappingFiles from './withProguardMappingFiles/withProguardMappingFiles';
import withSourcemapsAndroid from './withSourcemapsAndroid/withSourcemapsAndroid';
import withSourcemapsIOS from './withSourcemapsIOS/withSourcemapsIOS';

const withDatadog: ConfigPlugin<{
    nodeBin: string;
    packageManagerBin: string;
}> = (config, { nodeBin, packageManagerBin }) => {
    return withPlugins(config, [
        [
            withDsyms,
            {
                nodeBin,
                packageManagerBin
            }
        ],
        withProguardMappingFiles,
        withSourcemapsAndroid,
        [
            withSourcemapsIOS,
            {
                nodeBin,
                packageManagerBin
            }
        ]
    ]);
};

export default withDatadog;
