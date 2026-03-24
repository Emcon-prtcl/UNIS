import { UnisColors } from '@/constants/unis-theme';
import { journalStore } from '@/store/journal';
import { router } from 'expo-router';
import React from 'react';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const difficultyLabels: Record<string, { icon: string; label: string }> = {
  very_easy:       { icon: '🛡️', label: 'Très facile' },
  manageable:      { icon: '👍', label: 'Gérable' },
  medium:          { icon: '≈',  label: 'Moyen' },
  difficult:       { icon: '⚠️', label: 'Difficile' },
  very_difficult:  { icon: '⛈️', label: 'Très difficile' },
};

const moodOptions: Record<string, { emoji: string; label: string }> = {
  heureux:       { emoji: '😀', label: 'heureux(se)' },
  calme:         { emoji: '😌', label: 'calme' },
  motive:        { emoji: '🚀', label: 'motivé(e)' },
  reconnaissant: { emoji: '🙌', label: 'reconnaissant(e)' },
  serein:        { emoji: '🧘', label: 'serein(e)' },
  energique:     { emoji: '🏃', label: 'énergique' },
  inspire:       { emoji: '🤩', label: 'inspiré(e)' },
  fier:          { emoji: '🏆', label: 'fier(ère)' },
  fatigue:       { emoji: '😴', label: 'fatigué(e)' },
  reveur:        { emoji: '🌙', label: 'rêveur(se)' },
  indifferent:   { emoji: '😐', label: 'indifférent(e)' },
  distrait:      { emoji: '😵', label: 'distrait(e)' },
  ennuye:        { emoji: '😒', label: 'ennuyé(e)' },
  triste:        { emoji: '🥺', label: 'triste' },
  anxieux:       { emoji: '🧠', label: 'anxieux(se)' },
  colere:        { emoji: '😡', label: 'en colère' },
  frustre:       { emoji: '😤', label: 'frustré(e)' },
  seul:          { emoji: '🧍', label: 'seul(e)' },
  inquiet:       { emoji: '😰', label: 'inquiet(ète)' },
  honteux:       { emoji: '😳', label: 'honteux(se)' },
  demoralise:    { emoji: '😞', label: 'démoralisé(e)' },
};

function formatDateFR(date: Date): string {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
  ];
  return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export default function RecapitulatifScreen() {
  const entry = journalStore;
  const diff = entry.difficulty ? difficultyLabels[entry.difficulty] : null;
  const selectedMoods = entry.moods.map((k) => moodOptions[k]).filter(Boolean);
  const dateStr = formatDateFR(new Date());

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Récapitulatif</Text>
          <Text style={styles.date}>{dateStr}</Text>

          {/* Consommation & difficulté */}
          <Text style={styles.sectionTitle}>Consommation et difficulté d'abstinence</Text>
          <View style={styles.consumptionRow}>
            <View style={styles.glassBadge}>
              <Text style={styles.glassBadgeText}>{entry.glasses ?? 0}</Text>
            </View>
            {diff && (
              <Text style={styles.difficultyText}>
                {diff.icon}{'  '}{diff.label}
              </Text>
            )}
          </View>

          {/* Humeurs */}
          {selectedMoods.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Humeur(s) global du jour</Text>
              <View style={styles.moodRow}>
                {selectedMoods.map((m, i) => (
                  <View key={i} style={styles.moodCard}>
                    <Text style={styles.moodEmoji}>{m.emoji}</Text>
                    <Text style={styles.moodLabel}>{m.label}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Activité */}
          {entry.activity ? (
            <>
              <Text style={styles.sectionTitle}>Activité(s)</Text>
              <Text style={styles.activityText}>{entry.activity}</Text>
            </>
          ) : null}

          {/* Notes */}
          {entry.notes ? (
            <>
              <Text style={styles.sectionTitle}>Notes personnelles</Text>
              <View style={styles.notesCard}>
                <Text style={styles.notesText}>{entry.notes}</Text>
              </View>
            </>
          ) : null}
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            style={styles.backCalButton}
            onPress={() => router.push('/(sevrage)/(tabs)/accueil')}
          >
            <Text style={styles.backCalText}>Enregistrer dans le journal</Text>
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
  content: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 24 },
  title: {
    fontSize: 28,
    fontFamily: 'TitleWrap',
    fontWeight: '800',
    color: UnisColors.purple.dark,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: UnisColors.purple.medium,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'TitleWrap',
    fontWeight: '800',
    color: UnisColors.purple.dark,
    marginBottom: 12,
    marginTop: 8,
  },
  consumptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UnisColors.purple.veryLight,
    borderRadius: 16,
    padding: 16,
    gap: 16,
    marginBottom: 20,
  },
  glassBadge: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: UnisColors.purple.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassBadgeText: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.white,
  },
  difficultyText: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
  },
  moodRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  moodCard: {
    backgroundColor: UnisColors.white,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    minWidth: 70,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  moodEmoji: { fontSize: 28, marginBottom: 4 },
  moodLabel: {
    fontSize: 11,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: UnisColors.purple.dark,
    textAlign: 'center',
  },
  activityText: {
    fontSize: 15,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
    marginBottom: 20,
  },
  notesCard: {
    backgroundColor: UnisColors.purple.veryLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  notesText: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
    lineHeight: 22,
  },
  footer: { paddingHorizontal: 20, paddingVertical: 16, backgroundColor: UnisColors.offWhite },
  backCalButton: {
    backgroundColor: UnisColors.yellow.medium,
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  backCalText: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
  },
});
