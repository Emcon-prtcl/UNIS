import { UnisColors } from '@/constants/unis-theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Vague3 from '../../assets/images/Vague-3.svg';

export default function EspaceProche6() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundWave} pointerEvents="none">
        <Vague3 style={styles.wave} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Partage ton compte</Text>
        <Text style={styles.subtitle}>Tu peux inviter un proche à télécharger l'application</Text>

        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={() => console.log('Partager')}>
          <Text style={styles.primaryLabel}>Partager mon compte</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { marginTop: 28 }]}>Retrouve un proche</Text>
        <Text style={styles.subtitle}>Tu peux retrouver un proche qui a déjà un compte avec son pseudo</Text>

        <View style={styles.searchBox}>
          <TextInput placeholder="Entrer un pseudo" placeholderTextColor={UnisColors.purple.medium} style={styles.searchInput} />
          <TouchableOpacity style={styles.searchButton} activeOpacity={0.85} onPress={() => console.log('Rechercher')}>
            <Text style={styles.searchButtonLabel}>Rechercher</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomArea} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.nextButton}
          activeOpacity={0.9}
          onPress={() => router.push('/espace_proche7')}
        >
          <Text style={styles.nextLabel}>Rejoindre UNIS</Text>
          <Text style={styles.nextArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: UnisColors.offWhite },
  backgroundWave: { position: 'absolute', left: 0, right: 0, top: 0, height: 200, zIndex: 0 },
  wave: { width: '100%', height: '100%' },
  content: { padding: 24, paddingBottom: 260, marginTop: 140, zIndex: 1 },
  title: { fontSize: 28, fontWeight: '800', color: UnisColors.purple.dark, marginBottom: 8 },
  subtitle: { fontSize: 14, color: UnisColors.purple.medium, marginBottom: 18 },
  primaryButton: {
    backgroundColor: UnisColors.purple.light,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  primaryLabel: { color: UnisColors.purple.dark, fontWeight: '700', fontSize: 16 },
  searchBox: { marginTop: 12, backgroundColor: UnisColors.yellow.light, padding: 16, borderRadius: 12 },
  searchInput: { height: 44, borderRadius: 8, borderWidth: 2, borderColor: UnisColors.purple.dark, paddingHorizontal: 12, backgroundColor: UnisColors.offWhite },
  searchButton: { marginTop: 12, alignSelf: 'center', backgroundColor: UnisColors.purple.dark, paddingHorizontal: 18, paddingVertical: 8, borderRadius: 8 },
  searchButtonLabel: { color: UnisColors.white, fontWeight: '700' },
  bottomArea: { width: '100%', height: 220, position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'flex-end', zIndex: 2, paddingBottom: 12 },
  nextButton: {
    position: 'absolute',
    bottom: 36,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: UnisColors.yellow.light,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: UnisColors.yellow.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    zIndex: 3,
  },
  nextLabel: { color: UnisColors.purple.dark, fontWeight: '800', fontSize: 18, marginRight: 12 },
  nextArrow: { color: UnisColors.purple.dark, fontSize: 20, fontWeight: '700' },
});
