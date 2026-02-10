import { NextButton } from '@/components/onboarding/next-button';
import { UnisColors } from '@/constants/unis-theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgUri } from 'react-native-svg';

export default function WelcomeScreen() {
  const router = useRouter();
  const logoAsset = Image.resolveAssetSource(require('../../assets/images/logo_fonce.svg'));
  const violetTop = require('../../assets/images/violet1.png');
  const violetBottom = require('../../assets/images/violet2.png');
  const screenHeight = Dimensions.get('window').height;
  const topHeight = Math.round(screenHeight * 0.55);
  const bottomHeight = Math.round(screenHeight * 0.45);

  return (
    <View style={styles.background}>
      <Image source={violetTop} style={[styles.violetTop, { height: topHeight }]} resizeMode="stretch" />
      <Image
        source={violetBottom}
        style={[styles.violetBottom, { height: bottomHeight }]}
        resizeMode="stretch"
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Logo central */}
          <View style={styles.logoSection}>
            {logoAsset?.uri ? <SvgUri width={120} height={120} uri={logoAsset.uri} /> : null}
            <Text style={styles.appName}>Bienvenue dans</Text>
            <Text style={styles.appName}>UNIS</Text>
          </View>
        </View>

        {/* Bouton suivant */}
        <View style={styles.bottomSection}>
          <NextButton onPress={() => router.push('/onboarding/info')} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    zIndex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: UnisColors.background,
  },
  violetTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 0,
  },
  violetBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    fontFamily: 'TitleWrap',
    color: UnisColors.text.dark,
    marginTop: 24,
  },
  appName: {
    fontSize: 38,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
    letterSpacing: 2,
  },
  bottomSection: {
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
});
