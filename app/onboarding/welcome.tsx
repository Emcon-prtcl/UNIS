import { NextButton } from '@/components/onboarding/next-button';
import { UnisColors } from '@/constants/unis-theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoFonce from '../../assets/images/logo_fonce.svg';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/images/vague_hb.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Logo central */}
          <View style={styles.logoSection}>
            <LogoFonce width={120} height={120} />
            <Text style={styles.appName}>Bienvenue dans</Text>
            <Text style={styles.appName}>UNIS</Text>
          </View>
        </View>

        {/* Bouton suivant */}
        <View style={styles.bottomSection}>
          <NextButton onPress={() => router.push('/onboarding/info')} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
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
