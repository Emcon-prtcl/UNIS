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
    View,
} from 'react-native';

const moodOptions = [
  { key: 'heureux',        emoji: '😀', label: 'heureux(se)' },
  { key: 'calme',          emoji: '😌', label: 'calme' },
  { key: 'motive',         emoji: '🚀', label: 'motivé(e)' },
  { key: 'reconnaissant',  emoji: '🙌', label: 'reconnaissant(e)' },
  { key: 'serein',         emoji: '🧘', label: 'serein(e)' },
  { key: 'energique',      emoji: '🏃', label: 'énergique' },
  { key: 'inspire',        emoji: '🤩', label: 'inspiré(e)' },
  { key: 'fier',           emoji: '🏆', label: 'fier(ère)' },
  { key: 'fatigue',        emoji: '😴', label: 'fatigué(e)' },
  { key: 'reveur',         emoji: '🌙', label: 'rêveur(se)' },
  { key: 'indifferent',    emoji: '😐', label: 'indifférent(e)' },
  { key: 'distrait',       emoji: '😵', label: 'distrait(e)' },
  { key: 'ennuye',         emoji: '😒', label: 'ennuyé(e)' },
  { key: 'triste',         emoji: '🥺', label: 'triste' },
  { key: 'anxieux',        emoji: '🧠', label: 'anxieux(se)' },
  { key: 'colere',         emoji: '😡', label: 'en colère' },
  { key: 'frustre',        emoji: '😤', label: 'frustré(e)' },
  { key: 'seul',           emoji: '🧍', label: 'seul(e)' },
  { key: 'inquiet',        emoji: '😰', label: 'inquiet(ète)' },
  { key: 'honteux',        emoji: '😳', label: 'honteux(se)' },
  { key: 'demoralise',     emoji: '😞', label: 'démoralisé(e)' },
];

export default function HumeurScreen() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
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
        >
          <Text style={styles.title}>Quelle a été ton humeur globale sur la journée ?</Text>
          <Text style={styles.subtitle}>Coche une ou plusieurs humeur(s).</Text>

          <View style={styles.grid}>
            {moodOptions.map((mood) => {
              const isSelected = selected.includes(mood.key);
              return (
                <Pressable
                  key={mood.key}
                  style={[styles.card, isSelected && styles.cardSelected]}
                  onPress={() => toggle(mood.key)}
                >
                  <Text style={styles.emoji}>{mood.emoji}</Text>
                  <Text style={[styles.label, isSelected && styles.labelSelected]}>
                    {mood.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {/* Sticky Suivant button */}
        <View style={styles.footer}>
          <Pressable
            style={styles.nextButton}
            onPress={() => {
              journalStore.moods = [...selected];
              router.push('/(sevrage)/activite');
            }}
          >
            <Text style={styles.nextText}>Suivant</Text>
            <Text style={styles.nextArrow}>→</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UnisColors.offWhite,
  },
  safe: {
    flex: 1,
  },
  backButton: {
    marginTop: 8,
    marginLeft: 16,
    padding: 6,
    alignSelf: 'flex-start',
  },
  backArrow: {
    fontSize: 26,
    color: UnisColors.purple.dark,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  title: {
    fontSize: 26,
    fontFamily: 'TitleWrap',
    fontWeight: '800',
    color: UnisColors.purple.dark,
    marginBottom: 6,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: UnisColors.purple.medium,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  card: {
    width: '30%',
    backgroundColor: UnisColors.white,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardSelected: {
    borderColor: UnisColors.purple.dark,
    backgroundColor: UnisColors.purple.pale,
  },
  emoji: {
    fontSize: 36,
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: UnisColors.purple.dark,
    textAlign: 'center',
  },
  labelSelected: {
    color: UnisColors.purple.dark,
    fontWeight: '800',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 0,
    backgroundColor: UnisColors.offWhite,
  },
  nextButton: {
    backgroundColor: UnisColors.yellow.medium,
    borderRadius: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  nextText: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
  },
  nextArrow: {
    fontSize: 22,
    fontWeight: '800',
    color: UnisColors.purple.dark,
  },
});
