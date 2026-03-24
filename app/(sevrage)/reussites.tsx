import { UnisColors } from '@/constants/unis-theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Keyboard,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialReussites = [
  "Je suis retournée à la salle de sport\u00a0! C'est la première fois en 4 ans\u00a0!!!!!",
  "J'ai enfin vraiment parlé à mon père",
  "J'ai réussi à aller à ce repas de famille que je redoutais tellement",
  "J'ai fait un grand ménage de printemps dans mon appartement, quel plaisir d'avoir un appartement tout propre, j'avais oublié cette sensation",
  "Aujourd'hui je n'ai pas scrollé sur TikTok.",
  "C'est la première fois que je me suis autorisé à passer dans le rayon d'alcool dans mon supermarché depuis le début de mon sevrage et ça a été.",
];

export default function ReussitesScreen() {
  const [reussites, setReussites] = useState<string[]>(initialReussites);
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState('');

  const addReussite = () => {
    if (text.trim()) {
      setReussites((prev) => [text.trim(), ...prev]);
    }
    setText('');
    setShowInput(false);
    Keyboard.dismiss();
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
          onScrollBeginDrag={Keyboard.dismiss}
        >
            <Text style={styles.title}>Mes réussites</Text>
            <Text style={styles.subtitle}>
              Petite ou grande réussite, note ici tout ce dont tu es fier(ère). Tu pourras relire ces moments de réussite quand tu en auras besoin, pour te rappeler à quel point tu progresses ♥
            </Text>

            {/* Bouton Nouvelle réussite */}
            <Pressable
              style={styles.newButton}
              onPress={() => { setShowInput((v) => !v); setText(''); }}
            >
              <Text style={styles.newButtonIcon}>✎</Text>
              <Text style={styles.newButtonText}>Nouvelle réussite</Text>
            </Pressable>

            {/* Zone de saisie */}
            {showInput && (
              <View style={styles.inputCard}>
                <TextInput
                  style={styles.input}
                  placeholder="Entrer une réussite"
                  placeholderTextColor={UnisColors.purple.medium}
                  multiline
                  value={text}
                  onChangeText={setText}
                  autoFocus
                />
                <Pressable style={styles.validateBtn} onPress={addReussite}>
                  <Text style={styles.validateText}>Valider</Text>
                </Pressable>
              </View>
            )}

            {/* Liste des réussites */}
            {reussites.map((r, i) => (
              <View key={i} style={styles.reussiteCard}>
                <Text style={styles.reussiteText}>{r}</Text>
              </View>
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

  title: {
    fontSize: 28,
    fontFamily: 'TitleWrap',
    fontWeight: '800',
    color: UnisColors.purple.dark,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
    lineHeight: 20,
    marginBottom: 24,
  },

  /* Bouton Nouvelle réussite */
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: UnisColors.purple.light,
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 24,
    gap: 10,
  },
  newButtonIcon: {
    fontSize: 22,
    color: UnisColors.white,
  },
  newButtonText: {
    fontSize: 20,
    fontFamily: 'TitleWrap',
    fontWeight: '800',
    color: UnisColors.white,
  },

  /* Zone de saisie */
  inputCard: {
    borderWidth: 2,
    borderColor: UnisColors.purple.dark,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    backgroundColor: UnisColors.offWhite,
  },
  input: {
    fontSize: 15,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
    minHeight: 180,
    textAlignVertical: 'top',
  },
  validateBtn: {
    alignSelf: 'flex-end',
    marginTop: 10,
    backgroundColor: UnisColors.purple.dark,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  validateText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: UnisColors.white,
  },

  /* Cartes réussites */
  reussiteCard: {
    backgroundColor: UnisColors.yellow.medium,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  reussiteText: {
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: UnisColors.purple.dark,
    textAlign: 'center',
    lineHeight: 22,
  },
});
