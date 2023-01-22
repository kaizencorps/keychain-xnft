import React from 'react';

//Components
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from 'react-native';

//Libs
import { AnchorWallet, useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";

//Stacks
import AboutStack from "./aboutStack";
import HomeStack from "./homeStack";
import GalleryStack from "./galleryStack";
import LandingStack from "./landingStack";

//SVGS
import House from '../assets/svgs/Icons/house';
import Images from '../assets/svgs/Icons/images';
import Info from '../assets/svgs/Icons/info';

//Screens
import Socials from '../screens/socials';
import Landing from '../screens/landing';

//Styles
import * as Theme from '../constants/theme';
import DataRetrieval from '../components/dataRetrieval/dataRetrieval';
import { useRecoilValue } from 'recoil';
import { keychainAtom } from '../_state';

const Tab = createBottomTabNavigator();

const ICON_SIZE = 30;


export const TabNavigator = () => {

  const keychain = useRecoilValue(keychainAtom);

  return !!keychain.walletVerified ?
    // Wrapper for getting data from server
    <DataRetrieval>
      {/* Actual navigator */}
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
          tabBarStyle: { justifyContent: 'center', height: 60, borderTopColor: Theme.COLORS.INACTIVE_GRAY, borderTopWidth: 2 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: "HOME",
            tabBarIcon: ({ color }) => (
              <View>
                <View style={[styles.pinkLine, { backgroundColor: color }]}/>
                <House color={color} width={ICON_SIZE} height={ICON_SIZE} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Gallery"
          component={GalleryStack}
          options={{
            tabBarLabel: "GALLERY",
            tabBarIcon: ({ color }) => (
              <View>
                <View style={[styles.pinkLine, { backgroundColor: color }]}/>
                <Images color={color} width={ICON_SIZE} height={ICON_SIZE} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={AboutStack}
          options={{
            tabBarLabel: "ABOUT",
            tabBarIcon: ({ color }) => (
              <View>
                <View style={[styles.pinkLine, { backgroundColor: color }]}/>
                <Info color={color} width={ICON_SIZE} height={ICON_SIZE} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </DataRetrieval>
  :
      <Tab.Navigator
        initialRouteName="LandingStack"
        screenOptions={{
          headerShown: false,
          tabBarLabelPosition: 'below-icon',
          tabBarActiveBackgroundColor: Theme.COLORS.BACKGROUND_BLACK,
          tabBarInactiveBackgroundColor: Theme.COLORS.BACKGROUND_BLACK,
          tabBarActiveTintColor: Theme.COLORS.ACTIVE_PINK,
          tabBarInactiveTintColor: Theme.COLORS.INACTIVE_GRAY,
          tabBarLabelStyle: { fontFamily: 'BlenderPro-Medium', fontSize: 16 },
          tabBarStyle: { justifyContent: 'center', height: 60, borderTopColor: Theme.COLORS.INACTIVE_GRAY, borderTopWidth: 2 },
        }}
      >
        <Tab.Screen
          name="LandingStack"
          component={LandingStack}
          options={{
            tabBarLabel: "HOME",
            tabBarIcon: ({ color }) => (
              <View>
                <View style={[styles.pinkLine, { backgroundColor: color }]}/>
                <House color={color} width={ICON_SIZE} height={ICON_SIZE} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Socials"
          component={Socials}
          options={{
            tabBarLabel: "ABOUT",
            tabBarIcon: ({ color }) => (
              <View>
                <View style={[styles.pinkLine, { backgroundColor: color }]}/>
                <Info color={color} width={ICON_SIZE} height={ICON_SIZE} />
              </View>
          ),
        }}
      />
    </Tab.Navigator>
}

const styles = StyleSheet.create({
  pinkLine: {
    position: 'absolute',
    height: 2,
    width: '100%',
    top: -7 ,
    left: 0,
    right: 0,
  }
})

export default TabNavigator;
