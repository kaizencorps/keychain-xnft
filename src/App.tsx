//Components
import {Suspense} from "react";
import { ActivityIndicator, View } from "react-native";
import AppContent from "./components/appContent/appContent";
import Loader from "./components/loader/loader";

//Data
import { RecoilRoot } from "recoil";

//Libs
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import {ProviderComponentWrapper} from "./components/provider-component-wrapper";

//Styles
import '../src/assets/fonts/BlenderPro/fonts.css';

function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <Loader />;
  }

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Suspense fallback={<h1>Loading...</h1>}>
          <ProviderComponentWrapper component={<AppContent />} />
        </Suspense>
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default registerRootComponent(App);
