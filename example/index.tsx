import { AppRegistry } from 'react-native';
import App from './src/App';
import { startReactNativeNavigation } from './src/WixApp';
import { name as appName } from './app.json';
import { navigation as navigationLib } from './app.json';
import { initializeDatadog } from './src/ddUtils';
import { getTrackingConsent } from './src/utils';
import { TrackingConsent } from '@datadog/mobile-react-native';
import { Navigation } from 'react-native-navigation';


console.log("Starting Application with navigation library: " + navigationLib);
if (navigationLib == "react-navigation") {

    // TODO implement async load example. Currently in case of async initialization
    // there is a possibility to miss first screen in case of `react-navigation` lib
    //const trackingConsent = await getTrackingConsent()
    initializeDatadog(TrackingConsent.GRANTED);

    AppRegistry.registerComponent(appName, () => App);
    // this is a hack. we need to set root of `react-native-navigation`,
    // because native screen belongs to it. otherwise we will have blank screen
    Navigation.events().registerAppLaunchedListener(() => {
        Navigation.setRoot({
            root: {
                stack: {
                    options: {
                        topBar: {
                            visible: false
                        }
                    },
                    children: [
                        {
                            component: {
                                name: appName
                            }
                        }
                    ]
                }
            }
        });
    });
} else if (navigationLib == "react-native-navigation") {
    initializeDatadog(TrackingConsent.GRANTED);
    startReactNativeNavigation();
}
