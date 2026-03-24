import { UnisColors } from '@/constants/unis-theme';
import { DifficultyKey, journalStore } from '@/store/journal';
import { router } from 'expo-router';
import React from 'react';
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const difficultyOptions = [
  {
    key: 'very_easy',
    label: 'Très facile',
    icon: require('@/assets/images/bouclier.png'),
    bg: UnisColors.yellow.medium,
    textColor: UnisColors.purple.dark,
  },
  {
    key: 'manageable',
    label: 'Gérable',
    icon: require('@/assets/images/pouce.png'),
    bg: '#F2738C',
    textColor: '#FFFFFF',
  },
  {
    key: 'medium',
    label: 'Moyen',
    icon: require('@/assets/images/environ.png'),
    bg: UnisColors.purple.veryLight,
    textColor: UnisColors.purple.dark,
  },
  {
    key: 'difficult',
    label: 'Difficile',
    icon: require('@/assets/images/excalmation.png'),
    bg: UnisColors.purple.dark,
    textColor: '#FFFFFF',
  },
  {
    key: 'very_difficult',
    label: 'Très difficile',
    icon: require('@/assets/images/orage.png'),
    bg: '#2A0A5E',
    textColor: '#FFFFFF',
  },
];

export default function DifficulteScreen() {
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
          <Text style={styles.title}>
            À quel point était-ce difficile de ne pas boire aujourd'hui ?
          </Text>

          {difficultyOptions.map((opt) => (
            <Pressable
              key={opt.key}
              style={[styles.button, { backgroundColor: opt.bg }]}
              onPress={() => {
                journalStore.difficulty = opt.key as DifficultyKey;
                router.push('/(sevrage)/humeur');
              }}
            >
              <Image source={opt.icon} style={styles.icon} resizeMode="contain" />
              <Text style={[styles.buttonText, { color: opt.textColor }]}>{opt.label}</Text>
            </Pressable>
          ))}
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
  safe: {
    flex: 1,
  },
  backButton: {
    marginTop: 8,
    marginLeft: 16,
    padding: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  backArrow: {
    fontSize: 28,
    color: UnisColors.purple.dark,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontFamily: 'TitleWrap',
    fontWeight: '800',
    color: UnisColors.purple.dark,
    marginBottom: 32,
    lineHeight: 34,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  icon: {
    width: 30,
    height: 30,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
  },
});
