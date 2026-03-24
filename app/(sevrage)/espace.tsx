import { NextButton } from '@/components/onboarding/next-button';
import { UnisColors } from '@/constants/unis-theme';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuthToken } from '../../store/auth';

const FEATURE_ICONS = [
  require('../../assets/images/espace1.png'),
  require('../../assets/images/espace2.png'),
  require('../../assets/images/espace3.png'),
  require('../../assets/images/espace4.png'),
  require('../../assets/images/espace5.png'),
  require('../../assets/images/espace6.png'),
];

const FEATURES = [
  {
    text: 'Des statuts à partager à ton entourage pour indiquer ton humeur',
    color: 'light',
  },
  {
    text: 'Inviter tes proches à faire des activités',
    color: 'dark',
  },
  {
    text: "Un journal de bord pour t'exprimer",
    color: 'light',
  },
  {
    text: 'Des trophées pour célébrer tes avancés',
    color: 'dark',
  },
  {
    text: 'Des minis jeux pour te changer les idées',
    color: 'light',
  },
  {
    text: "Un bouton SOS pour prévenir les secours en cas d'urgence",
    color: 'dark',
  },
];

export default function EspaceSevrageScreen() {
  const router = useRouter();
  const violetBottom = require('../../assets/images/vague_m1.png');

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      router.replace('/(sevrage)/(tabs)/accueil');
    }
  }, []);

  return (
    <View style={styles.background}>
      <Image source={violetBottom} style={styles.violetBottom} resizeMode="stretch" />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Titre */}
          <Text style={styles.title}>Ton espace UNIS</Text>

          {/* Liste des fonctionnalités */}
          <View style={styles.featuresList}>
            {FEATURES.map((feature, index) => (
              <View key={index} style={[
                styles.featureBubble,
                feature.color === 'light' ? styles.bubbleLight : styles.bubbleDark,
              ]}>
                <Image source={FEATURE_ICONS[index]} style={styles.featureIconImage} resizeMode="contain" />
                <Text style={styles.featureText}>{feature.text}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Bouton suivant */}
        <View style={styles.bottomSection}>
          <NextButton onPress={() => router.push('/(sevrage)/login')} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: UnisColors.background,
  },
  violetBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '80%',
    width: '100%',
    zIndex: 0,
  },
  safeArea: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
    marginBottom: 24,
  },
  featuresList: {
    gap: 14,
  },
  featureIconImage: {
    width: 28,
    height: 28,
  },
  featureBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
  },
  bubbleLight: {
    backgroundColor: UnisColors.purple.light,
  },
  bubbleDark: {
    backgroundColor: UnisColors.purple.dark,
  },
  featureText: {
    color: UnisColors.white,
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '700',
    lineHeight: 20,
    flex: 1,
    textAlign: 'center',
  },
  bottomSection: {
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
});
