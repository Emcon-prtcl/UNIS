import { UnisColors } from '@/constants/unis-theme';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const icons = {
  accueil: require('../../../assets/images/accueuil_proche.png'),
  main_tendue_proche: require('../../../assets/images/bonhommedouble_proche.png'),
  trophee_proche: require('../../../assets/images/trophee_proche.png'),
  jeux_proche: require('../../../assets/images/Frame-6.png'),
  ressources_proche: require('../../../assets/images/ressource_proche.png'),
};

export default function AccompagnantTabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: UnisColors.purple.dark,
        tabBarInactiveTintColor: UnisColors.purple.medium,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused }) => {
          const source = icons[route.name as keyof typeof icons];
          const tint = focused ? UnisColors.purple.dark : UnisColors.purple.light;
          return (
            <Image
              source={source}
              style={[styles.tabIcon, { tintColor: tint }]}
              resizeMode="contain"
            />
          );
        },
      })}
    >
      <Tabs.Screen name="accueil" options={{ title: 'Accueil', tabBarLabel: 'Accueil' }} />
      <Tabs.Screen name="main_tendue_proche" options={{ title: 'Main Tendue', tabBarLabel: 'Main Tendue' }} />
      <Tabs.Screen name="trophee_proche" options={{ title: 'Trophées', tabBarLabel: 'Trophées' }} />
      <Tabs.Screen name="jeux_proche" options={{ title: 'Quiz', tabBarLabel: 'Quiz' }} />
      <Tabs.Screen name="ressources_proche" options={{ title: 'Ressources', tabBarLabel: 'Ressources' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 72,
    paddingBottom: 18,
    paddingTop: 8,
    backgroundColor: UnisColors.white,
    borderTopColor: UnisColors.purple.dark,
    borderTopWidth: 1,
    elevation: 0,
    shadowOpacity: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabIcon: { width: 22, height: 22 },
  tabLabel: { fontSize: 10, fontFamily: 'Inter', marginTop: 2 },
});