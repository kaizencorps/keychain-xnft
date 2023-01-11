//Components
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Libs
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Stacks
import AboutStack from "./aboutStack";
import HomeStack from "./homeStack";
import GalleryStack from "./galleryStack";

//Styles
import * as Theme from '../constants/theme';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {


  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Theme.COLORS.ACTIVE_PINK,
        tabBarInactiveTintColor: Theme.COLORS.INACTIVE_GRAY
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={GalleryStack}
        options={{
          tabBarLabel: "Gallery",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutStack}
        options={{
          tabBarLabel: "About",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;