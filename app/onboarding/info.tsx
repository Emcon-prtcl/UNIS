import { NextButton } from '@/components/onboarding/next-button';
import { UnisColors } from '@/constants/unis-theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InfoScreen() {
  const router = useRouter();
  const violetBottom = require('../../assets/images/violet2.png');

  return (
    <View style={styles.background}>
      <Image source={violetBottom} style={styles.violetBottom} resizeMode="stretch" />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Titre */}
            <Text style={styles.title}>UNIS c'est quoi ?</Text>

            {/* Description */}
            <View style={styles.descriptionCard}>
              <Text style={styles.description}>
                <Text style={styles.bold}>UNIS</Text> a pour objectif d'accompagner
                les personnes en sevrage alcoolique, et leurs proches, à travers un
                parcours <Text style={styles.bold}>bienveillant</Text> et{' '}
                <Text style={styles.bold}>sans jugement</Text>.
              </Text>

              <Text style={styles.description}>
                Grâce à des outils simples et humains, chacun peut trouver sa place,
                exprimer ce qu'il ressent, encourager, écouter et avancer...{' '}
                <Text style={styles.bold}>ensemble</Text>.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bouton suivant */}
        <View style={styles.bottomSection}>
          <NextButton onPress={() => router.push('/onboarding/choose-space')} />
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
  violetBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    zIndex: 0,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 28,
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
    marginBottom: 28,
  },
  descriptionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 24,
    gap: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    fontFamily: 'Inter',
    color: UnisColors.text.dark,
  },
  bold: {
    fontWeight: '700',
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
  },
  bottomSection: {
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
});
