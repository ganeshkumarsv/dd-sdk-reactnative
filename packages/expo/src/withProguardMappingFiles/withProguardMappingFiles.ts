import type { ConfigPlugin } from '@expo/config-plugins';

const withProguardMappingFiles: ConfigPlugin<void> = config => {
    // Noop for now
    return config;
};

export default withProguardMappingFiles;
