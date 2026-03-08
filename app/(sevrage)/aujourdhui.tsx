import { UnisColors } from '@/constants/unis-theme';
import { journalStore, resetJournal } from '@/store/journal';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const glassOptions = [
  { value: 1, image: require('@/assets/images/1_verre.png') },
  { value: 5, image: require('@/assets/images/5_verre.png') },
  { value: 10, image: require('@/assets/images/10_verre.png') },
  { value: 15, image: require('@/assets/images/15_verre.png') },
  { value: 20, image: require('@/assets/images/20_verre.png') },
  { value: 25, image: require('@/assets/images/25_verre.png') },
];

export default function AujourdHuiScreen() {
  const [saidYes, setSaidYes] = useState(false);
  const [selectedGlasses, setSelectedGlasses] = useState<number | null>(null);

  useEffect(() => { resetJournal(); }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>As-tu consommé de l'alcool aujourd'hui ?</Text>

          <Text style={styles.description}>
            Sois honnête avec toi même, la rechute fais parti du chemin vers la sobriété. Il ne s'agit pas de te faire culpabiliser, mais au contraire, de te permettre de suivre tes progrès avec bienveillance !
          </Text>

          <Pressable
            style={[styles.bigButton, styles.noButton]}
            onPress={() => {
              journalStore.glasses = 0;
              router.push('/(sevrage)/difficulte');
            }}
          >
            <Text style={[styles.bigButtonText, { color: UnisColors.purple.dark }]}>NON</Text>
          </Pressable>

          <Pressable
            style={[styles.bigButton, styles.yesButton]}
            onPress={() => setSaidYes(true)}
          >
            <Text style={[styles.bigButtonText, { color: UnisColors.white }]}>OUI</Text>
          </Pressable>

          {saidYes && (
            <>
              <Text style={styles.quantityTitle}>Quelle quantité d'alcool as-tu consommé ?</Text>

              <Text style={styles.quantityDescription}>
                Dose standard d'alcool : environ 10g d'alcool pur, soit 10-12 cl à 12% , 25 cl à 5% , 3 cl à 40%
              </Text>

              <View style={styles.glassGrid}>
                {glassOptions.map((option) => (
                  <Pressable
                    key={option.value}
                    style={[
                      styles.glassButton,
                      selectedGlasses === option.value && styles.glassButtonSelected,
                    ]}
                    onPress={() => {
                      setSelectedGlasses(option.value);
                      journalStore.glasses = option.value;
                      router.push('/(sevrage)/difficulte');
                    }}
                  >
                    <Image source={option.image} style={styles.glassImage} resizeMode="contain" />
                  </Pressable>
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UnisColors.offWhite,
  },
  backButton: {
    marginTop: 8,
    marginLeft: 16,
    padding: 6,
    borderRadius: 20,
  },
  backArrow: {
    fontSize: 28,
    color: UnisColors.purple.dark,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 26,
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
    fontWeight: '800',
    marginBottom: 12,
  },
  description: {
    color: UnisColors.purple.medium,
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  bigButton: {
    borderRadius: 18,
    paddingVertical: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  noButton: {
    backgroundColor: UnisColors.yellow.medium,
  },
  yesButton: {
    backgroundColor: UnisColors.purple.light,
  },
  bigButtonText: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
  },
  quantityTitle: {
    fontSize: 26,
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 12,
  },
  quantityDescription: {
    color: UnisColors.purple.medium,
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  glassGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // ensure exactly 3 items per row by giving each item ~30% width
  },
  glassButton: {
    width: '30%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginBottom: 5,
  },
  glassButtonSelected: {
    opacity: 0.7,
  },
  glassImage: {
    width: '80%',
    height: '80%',
  },
});
