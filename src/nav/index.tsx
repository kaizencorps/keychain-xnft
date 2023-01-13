import React from 'react';

//Components
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Libs
import { AnchorWallet, useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";

//Stacks
import AboutStack from "./aboutStack";
import HomeStack from "./homeStack";
import GalleryStack from "./galleryStack";

//SVGS
import House from '../assets/svgs/Icons/house';
import Images from '../assets/svgs/Icons/images';
import Info from '../assets/svgs/Icons/info';

//Styles
import * as Theme from '../constants/theme';

const Tab = createBottomTabNavigator();

const ICON_SIZE = 30;

export const TabNavigator = () => {

  const anchorWallet: AnchorWallet | undefined = useAnchorWallet();


  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarActiveBackgroundColor: Theme.COLORS.BACKGROUND_BLACK,
        tabBarInactiveBackgroundColor: Theme.COLORS.BACKGROUND_BLACK,
        tabBarActiveTintColor: Theme.COLORS.ACTIVE_PINK,
        tabBarInactiveTintColor: Theme.COLORS.INACTIVE_GRAY,
        tabBarLabelStyle: { fontFamily: 'BlenderPro-Medium', fontSize: 16 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "HOME",
          tabBarIcon: ({ color }) => (
            <House color={color} width={ICON_SIZE} height={ICON_SIZE} />
          ),
        }}
      />
      {anchorWallet &&
        <Tab.Screen
          name="Gallery"
          component={GalleryStack}
          options={{
            tabBarLabel: "GALLERY",
            tabBarIcon: ({ color }) => (
              <Images color={color} width={ICON_SIZE} height={ICON_SIZE} />
            ),
          }}
        />
      }
      <Tab.Screen
        name="About"
        component={AboutStack}
        options={{
          tabBarLabel: "ABOUT",
          tabBarIcon: ({ color }) => (
            <Info color={color} width={ICON_SIZE} height={ICON_SIZE} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;