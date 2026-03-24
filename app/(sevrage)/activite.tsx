import { UnisColors } from '@/constants/unis-theme';
import { journalStore } from '@/store/journal';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function ActiviteScreen() {
  const [saidYes, setSaidYes] = useState(false);
  const [activityText, setActivityText] = useState('');

  const handleSuivant = () => {
    journalStore.activity = saidYes && activityText.trim() ? activityText.trim() : null;
    router.push('/(sevrage)/notes');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Souhaites-tu renseigner une activité aujourd'hui ?</Text>

          <Pressable
            style={[styles.bigButton, styles.noButton, !saidYes && styles.bigButtonActive]}
            onPress={() => setSaidYes(false)}
          >
            <Text style={[styles.bigButtonText, { color: UnisColors.purple.dark }]}>NON</Text>
          </Pressable>

          <Pressable
            style={[styles.bigButton, styles.yesButton, saidYes && styles.yesButtonActive]}
            onPress={() => setSaidYes(true)}
          >
            <Text style={[styles.bigButtonText, { color: UnisColors.white }]}>OUI</Text>
          </Pressable>

          {saidYes && (
            <View style={styles.activityCard}>
              <Text style={styles.activityCardTitle}>Qu'as-tu fais ?</Text>
              <TextInput
                style={styles.activityInput}
                placeholder="Entre tes activités du jour"
                placeholderTextColor={UnisColors.purple.light}
                value={activityText}
                onChangeText={setActivityText}
              />
              <View style={styles.activityActions}>
                <Pressable
                  style={styles.passerButton}
                  onPress={() => {
                    journalStore.activity = null;
                    router.push('/(sevrage)/notes');
                  }}
                >
                  <Text style={styles.passerText}>Passer</Text>
                </Pressable>
                <Pressable
                  style={styles.validerButton}
                  onPress={() => {
                    journalStore.activity = activityText.trim() || null;
                    router.push('/(sevrage)/notes');
                  }}
                >
                  <Text style={styles.validerText}>Valider</Text>
                </Pressable>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.nextButton} onPress={handleSuivant}>
            <Text style={styles.nextText}>Suivant</Text>
            <Text style={styles.nextArrow}>→</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: UnisColors.offWhite },
  safe: { flex: 1 },
  backButton: { marginTop: 8, marginLeft: 16, padding: 6, alignSelf: 'flex-start' },
  backArrow: { fontSize: 26, color: UnisColors.purple.dark, fontWeight: '600' },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
  title: {
    fontSize: 26,
    fontFamily: 'TitleWrap',
    fontWeight: '800',
    color: UnisColors.purple.dark,
    marginBottom: 28,
    lineHeight: 34,
  },
  bigButton: {
    borderRadius: 18,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  noButton: { backgroundColor: UnisColors.yellow.medium },
  bigButtonActive: { opacity: 1 },
  yesButton: { backgroundColor: UnisColors.purple.veryLight },
  yesButtonActive: { backgroundColor: UnisColors.purple.light },
  bigButtonText: { fontSize: 22, fontWeight: '800', fontFamily: 'TitleWrap' },
  activityCard: {
    backgroundColor: UnisColors.purple.veryLight,
    borderRadius: 18,
    padding: 16,
    marginTop: 8,
  },
  activityCardTitle: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
    marginBottom: 12,
  },
  activityInput: {
    backgroundColor: UnisColors.white,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
    marginBottom: 12,
  },
  activityActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  passerButton: {
    backgroundColor: UnisColors.yellow.medium,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  passerText: { fontSize: 14, fontWeight: '700', fontFamily: 'Inter', color: UnisColors.purple.dark },
  validerButton: {
    backgroundColor: UnisColors.purple.dark,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  validerText: { fontSize: 14, fontWeight: '700', fontFamily: 'Inter', color: UnisColors.white },
  footer: { paddingHorizontal: 20, paddingVertical: 16, backgroundColor: UnisColors.offWhite },
  nextButton: {
    backgroundColor: UnisColors.yellow.medium,
    borderRadius: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  nextText: { fontSize: 22, fontWeight: '800', fontFamily: 'TitleWrap', color: UnisColors.purple.dark },
  nextArrow: { fontSize: 22, fontWeight: '800', color: UnisColors.purple.dark },
});
