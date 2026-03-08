import { ChoiceButton } from '@/components/onboarding/choice-button';
import { UnisColors } from '@/constants/unis-theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChooseSpaceScreen() {
  const router = useRouter();
  const violetTop = require('../../assets/images/vague_h2.png');

  const handleChooseSevrage = () => {
    router.replace('/(sevrage)/espace');
  };

  const handleChooseAccompagne = () => {
    router.replace('/(accompagnant)/espace');
  };

  return (
    <View style={styles.background}>
      <Image source={violetTop} style={styles.violetTop} resizeMode="stretch" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Titre */}
          <Text style={styles.title}>Choisi ton espace</Text>

          {/* Boutons de choix */}
          <View style={styles.buttonsContainer}>
            <ChoiceButton
              label="Je suis en sevrage"
              variant="primary"
              onPress={handleChooseSevrage}
            />
            <ChoiceButton
              label="J'accompagne"
              variant="secondary"
              onPress={handleChooseAccompagne}
            />
          </View>
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
    height: '100%',
    width: '100%',
    zIndex: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
    marginBottom: 48,
  },
  buttonsContainer: {
    gap: 20,
  },
});
