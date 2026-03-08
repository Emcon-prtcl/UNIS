import { UnisColors } from '@/constants/unis-theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PartageScreen() {
  const router = useRouter();
  const [pseudo, setPseudo] = useState('');

  const handleShare = () => {
    // TODO: Implémenter le partage de compte
    console.log('Partager mon compte');
  };

  const handleSearch = () => {
    // TODO: Implémenter la recherche de proche
    console.log('Rechercher', pseudo);
  };

  const handleJoin = () => {
    // TODO: Continuer le parcours
    console.log('Rejoindre UNIS');
    router.replace('/(sevrage)/(tabs)/accueil');
  };

  return (
    <View style={styles.background}>
      <Image
        source={require('../../assets/images/vague_h2.png')}
        style={styles.vagueTop}
        resizeMode="stretch"
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.title, styles.firstTitle]}>Partage ton compte</Text>
          <Text style={styles.subtitle}>
            Tu peux inviter un proche à{`\n`}télécharger l'application
          </Text>

          <Pressable style={styles.primaryButton} onPress={handleShare}>
            <Text style={styles.primaryButtonText}>Partager mon compte</Text>
          </Pressable>

          <View style={styles.sectionSpacing} />

          <Text style={styles.title}>Retrouve un proche</Text>
          <Text style={styles.subtitle}>
            Tu peux retrouver un proche qui a{`\n`}déjà un compte avec son pseudo
          </Text>

          <View style={styles.searchCard}>
            <TextInput
              style={styles.input}
              placeholder="Entrer un pseudo"
              placeholderTextColor={UnisColors.purple.medium}
              value={pseudo}
              onChangeText={setPseudo}
              autoCapitalize="none"
            />
            <Pressable style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Rechercher</Text>
            </Pressable>
          </View>

        </ScrollView>

        <View style={styles.bottomSection}>
          <Pressable style={styles.joinButton} onPress={handleJoin}>
            <Text style={styles.joinButtonText}>Rejoindre UNIS</Text>
            <Text style={styles.joinArrow}>→</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: UnisColors.background,
  },
  vagueTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    zIndex: 0,
  },
  safeArea: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 46,
    paddingBottom: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
    marginBottom: 6,
  },
  firstTitle: {
    marginTop: 120,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
    marginBottom: 14,
  },
  primaryButton: {
    backgroundColor: UnisColors.purple.light,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: UnisColors.purple.dark,
  },
  sectionSpacing: {
    height: 80,
  },
  searchCard: {
    backgroundColor: UnisColors.yellow.light,
    borderRadius: 16,
    padding: 14,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  input: {
    borderWidth: 2,
    borderColor: UnisColors.purple.dark,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    fontFamily: 'Inter',
    backgroundColor: UnisColors.white,
    color: UnisColors.purple.dark,
  },
  searchButton: {
    backgroundColor: UnisColors.purple.dark,
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 18,
  },
  searchButtonText: {
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: UnisColors.white,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 10,
  },
  joinButton: {
    backgroundColor: UnisColors.yellow.light,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 18,
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
  joinButtonText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: UnisColors.purple.dark,
  },
  joinArrow: {
    fontSize: 18,
    fontWeight: '800',
    color: UnisColors.purple.dark,
  },
});
