import {Suspense} from "react";
import { registerRootComponent } from "expo";
import { RecoilRoot } from "recoil";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts, Inter_900Black } from "@expo-google-fonts/dev";
import TabNavigator from "./nav";

import {ProviderComponentWrapper} from "./components/provider-component-wrapper";

function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Suspense fallback={<h1>Loading...</h1>}>
          <ProviderComponentWrapper component={<TabNavigator />} />
        </Suspense>
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default registerRootComponent(App);
