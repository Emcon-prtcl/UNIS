import { UnisColors } from '@/constants/unis-theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STATUS_OPTIONS = [
  {
    id: 'bien',
    label: 'Je me sens bien',
    label2: 'Je me sens bien',
    image: require('../../assets/images/sens_bien.png'),
    bgColor: UnisColors.yellow.medium,
    textColor: UnisColors.purple.dark,
  },
  {
    id: 'boude',
    label: 'Je ne veux parler à personne',
    label2: 'Je ne veux parler à personne',
    image: require('../../assets/images/boude.png'),
    bgColor: UnisColors.purple.veryLight,
    textColor: UnisColors.purple.dark,
  },
  {
    id: 'soutien',
    label: 'Je ne veux parler à personne, mais j\'aimerai me sentir soutenu(e).',
    label2: 'j\'aimerai me sentir soutenu(e).',
    image: require('../../assets/images/soutien.png'),
    bgColor: UnisColors.white,
    textColor: UnisColors.purple.dark,
    bordered: true,
  },
  {
    id: 'parler',
    label: 'J\'ai besoin de parler',
    label2: 'J\'ai besoin de parler',
    image: require('../../assets/images/besoin_de_parler.png'),
    bgColor: UnisColors.purple.dark,
    textColor: UnisColors.white,
  },
  {
    id: 'sortir',
    label: 'J\'ai besoin de sortir',
    label2: 'J\'ai besoin de sortir',
    image: require('../../assets/images/envie_de_sortir.png'),
    bgColor: '#F48080',
    textColor: UnisColors.white,
  },
];

export default function MonStatutScreen() {
  const [selectedStatus, setSelectedStatus] = useState('parler');

  const currentStatus = STATUS_OPTIONS.find((s) => s.id === selectedStatus) || STATUS_OPTIONS[3];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <Text style={styles.title}>Mon Statut</Text>

          {/* Description */}
          <Text style={styles.description}>
            Indique à tes proches comment tu te sens et comment tu aimerai qu'ils interagissent avec toi.
          </Text>

          {/* Current status image */}
          <View style={styles.statusImageContainer}>
            <Image
              source={currentStatus.image}
              style={styles.statusImage}
              resizeMode="contain"
            />
            <Image
              source={require('../../assets/images/Ombre.png')}
              style={styles.shadowImage}
              resizeMode="contain"
            />
          </View>

          {/* Current status text */}
          <Text style={styles.statusText}>{currentStatus.label2}</Text>

          {/* Status buttons */}
          <View style={styles.buttonsContainer}>
            {STATUS_OPTIONS.map((option) => (
              <Pressable
                key={option.id}
                style={[
                  styles.statusButton,
                  {
                    backgroundColor: option.bgColor,
                    borderWidth: option.bordered ? 2 : 0,
                    borderColor: option.bordered ? '#E0D0F0' : 'transparent',
                  },
                ]}
                onPress={() => setSelectedStatus(option.id)}
              >
                <Image
                  source={option.image}
                  style={styles.buttonIcon}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.buttonText,
                    { color: option.textColor },
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
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
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 40,
  },
  backButton: {
    marginTop: 8,
    marginBottom: 4,
    alignSelf: 'flex-start',
    marginLeft: 16,
    padding: 6,
    borderRadius: 20,
  },
  backArrow: {
    fontSize: 28,
    color: UnisColors.purple.dark,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
    marginBottom: 8,

  },
  description: {
    fontSize: 15,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
    lineHeight: 21,
    marginBottom: 24,
  },
  statusImageContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  statusImage: {
    width: 140,
    height: 140,
  },
  shadowImage: {
    width: 180,
    height: 30,
    marginTop: -10,
  },
  statusText: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
    textAlign: 'center',
    marginBottom: 28,
  },
  buttonsContainer: {
    gap: 16,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 20,
    gap: 14,
  },
  buttonIcon: {
    width: 50,
    height: 50,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Inter',
    flex: 1,
  },
});
