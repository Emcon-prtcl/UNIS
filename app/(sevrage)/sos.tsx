import { UnisColors } from '@/constants/unis-theme';
import { router } from 'expo-router';
import React from 'react';
import {
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const urgenceNumbers = [
  { name: 'Samu', subtitle: 'Urgence médicale', number: '15' },
  { name: 'Police', subtitle: 'En cas de danger immédiat', number: '17' },
  { name: 'Pompiers', subtitle: 'Incendie, accident ou secours', number: '18' },
  { name: "Numéro d'urgence européen", subtitle: '', number: '112' },
];

const soutienNumbers = [
  { name: 'Alcool-info-service', number: '0 980 980 930', tel: '0980980930' },
  { name: 'SOS suicide', number: '01 45 39 40 00', tel: '0145394000' },
  { name: 'Numéro national de prévention suicide', number: '3114', tel: '3114' },
  { name: 'Suicide écoute', number: '01 45 39 40 00', tel: '0145394000' },
  { name: 'SOS amitié', number: '09 72 39 40 50', tel: '0972394050' },
  { name: 'Fil Santé Jeunes', number: '0 800 235 236', tel: '0800235236' },
  { name: 'La Croix-Rouge écoute', number: '0 800 858 858', tel: '0800858858' },
];

const call = (tel: string) => Linking.openURL(`tel:${tel}`);

export default function SosScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Section urgence */}
          <Text style={styles.sectionTitle}>Numéros d'urgence</Text>
          <Text style={styles.sectionSubtitle}>En cas d'urgence, clique pour appeler</Text>

          {urgenceNumbers.map((item) => (
            <Pressable
              key={item.number + item.name}
              style={styles.urgenceCard}
              onPress={() => call(item.number.replace(/\s/g, ''))}
            >
              <View style={styles.urgenceLeft}>
                <Text style={styles.urgenceName}>{item.name}</Text>
                {item.subtitle ? (
                  <Text style={styles.urgenceSubtitle}>{item.subtitle}</Text>
                ) : null}
              </View>
              <Text style={styles.urgenceNumber}>{item.number}</Text>
            </Pressable>
          ))}

          {/* Section soutien psychologique */}
          <Text style={[styles.sectionTitle, { marginTop: 28 }]}>Soutien psychologique</Text>
          <Text style={styles.sectionSubtitle}>Appelle ces numéros si tu as besoin de soutien</Text>

          {soutienNumbers.map((item) => (
            <Pressable
              key={item.tel + item.name}
              style={styles.soutienCard}
              onPress={() => call(item.tel)}
            >
              <Text style={styles.soutienName}>{item.name}</Text>
              <Text style={styles.soutienNumber}>{item.number}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: UnisColors.offWhite },
  safe: { flex: 1 },
  backButton: { marginTop: 8, marginLeft: 16, padding: 6, alignSelf: 'flex-start' },
  backArrow: { fontSize: 26, color: UnisColors.purple.dark, fontWeight: '600' },
  content: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 40 },

  sectionTitle: {
    fontSize: 26,
    fontFamily: 'TitleWrap',
    fontWeight: '800',
    color: UnisColors.purple.dark,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    fontFamily: 'Inter',
    color: UnisColors.purple.medium,
    marginBottom: 16,
  },

  /* Urgence cards — white with purple border */
  urgenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: UnisColors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: UnisColors.purple.dark,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  urgenceLeft: {
    flex: 1,
    marginRight: 12,
  },
  urgenceName: {
    fontSize: 17,
    fontFamily: 'TitleWrap',
    fontWeight: '800',
    color: UnisColors.purple.dark,
  },
  urgenceSubtitle: {
    fontSize: 13,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
    marginTop: 2,
  },
  urgenceNumber: {
    fontSize: 36,
    fontFamily: 'TitleWrap',
    fontWeight: '900',
    color: UnisColors.purple.dark,
  },

  /* Soutien cards — purple background */
  soutienCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: UnisColors.purple.light,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  soutienName: {
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: UnisColors.purple.dark,
    flex: 1,
    marginRight: 12,
  },
  soutienNumber: {
    fontSize: 18,
    fontFamily: 'TitleWrap',
    fontWeight: '800',
    color: UnisColors.purple.dark,
  },
});
