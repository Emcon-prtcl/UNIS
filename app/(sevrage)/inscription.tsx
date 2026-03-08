import { NextButton } from '@/components/onboarding/next-button';
import { UnisColors } from '@/constants/unis-theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InscriptionScreen() {
  const router = useRouter();
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNext = () => {
    // TODO: Valider et créer le compte
    console.log('Inscription sevrage', { prenom, nom, email, password });
    router.push('/(sevrage)/partage');
  };

  return (
    <View style={styles.background}>
      <Image
        source={require('../../assets/images/vague_m2.png')}
        style={styles.vagueBackground}
        resizeMode="stretch"
      />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Titre */}
            <Text style={styles.title}>Crée ton compte</Text>

            {/* Formulaire */}
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Prénom"
                placeholderTextColor={UnisColors.purple.medium}
                value={prenom}
                onChangeText={setPrenom}
                autoCapitalize="words"
              />
              <TextInput
                style={styles.input}
                placeholder="Nom"
                placeholderTextColor={UnisColors.purple.medium}
                value={nom}
                onChangeText={setNom}
                autoCapitalize="words"
              />
              <TextInput
                style={styles.input}
                placeholder="Adresse mail"
                placeholderTextColor={UnisColors.purple.medium}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor={UnisColors.purple.medium}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder="Confirmation mot de passe"
                placeholderTextColor={UnisColors.purple.medium}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          </ScrollView>

          {/* Bouton suivant */}
          <View style={styles.bottomSection}>
            <NextButton onPress={handleNext} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: UnisColors.background,
  },
  vagueBackground: {
    position: 'absolute',
    bottom: 0,
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
    paddingHorizontal: 28,
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 2,
    borderColor: UnisColors.purple.dark,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 15,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
    backgroundColor: UnisColors.white,
  },
  bottomSection: {
    paddingBottom: 40,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
});
