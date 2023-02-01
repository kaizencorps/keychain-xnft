import React from 'react';

//Components
import {Suspense} from "react";
import { View } from "react-native";
import AppContent from "./components/appContent/appContent";
import Loader from "./components/loader/loader";

//Data
import { RecoilRoot } from "recoil";

//Hooks
import { useBugsnagActions } from './_actions/bugsnag.actions';

//Libs
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
// import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import {ProviderComponentWrapper} from "./components/provider-component-wrapper";

//Styles
import './assets/css/solana-wallet-adapter-react-ui-styles.css';
import './assets/fonts/BlenderPro/fonts.css';
import * as Theme from './constants/theme';


function App() {

  // Improved error responses
  const bugsnagActions = useBugsnagActions();
  bugsnagActions.start();
  const ErrorBoundary = bugsnagActions.enabled ? Bugsnag.getPlugin('react').createErrorBoundary(React) : null;

  // let [fontsLoaded] = useFonts({
  //   Inter_900Black,
  // });

  // if (!fontsLoaded) {
  //   return <Loader />;
  // }

  return (
    <ErrorBoundary>
      <RecoilRoot>
        <NavigationContainer>
          <View style={{ flex: 1, backgroundColor: Theme.COLORS.MAIN_BACKGROUND_BLACK }}>
            <Suspense fallback={<Loader />}>
              <ProviderComponentWrapper component={<AppContent />} />
            </Suspense>
          </View>
        </NavigationContainer>
      </RecoilRoot>
    </ErrorBoundary>
  );
}

export default registerRootComponent(App);
