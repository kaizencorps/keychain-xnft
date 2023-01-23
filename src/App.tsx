//Components
import {Suspense} from "react";
import { View } from "react-native";
import AppContent from "./components/appContent/appContent";
import Loader from "./components/loader/loader";

//Data
import { RecoilRoot } from "recoil";

//Libs
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
// import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import {ProviderComponentWrapper} from "./components/provider-component-wrapper";

//Styles

// having this breaks the webpack build - need to comment out
import './assets/css/solana-wallet-adapter-react-ui-styles.css';
import './assets/fonts/BlenderPro/fonts.css';

import * as Theme from './constants/theme';

function App() {
  // let [fontsLoaded] = useFonts({
  //   Inter_900Black,
  // });

  // if (!fontsLoaded) {
  //   return <Loader />;
  // }

  return (
    <RecoilRoot>
      <NavigationContainer>
      <View style={{ flex: 1, backgroundColor: Theme.COLORS.MAIN_BACKGROUND_BLACK }}>
          <Suspense fallback={<Loader />}>
            <ProviderComponentWrapper component={<AppContent />} />
          </Suspense>
        </View>
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default registerRootComponent(App);
