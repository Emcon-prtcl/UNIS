import { NextButton } from '@/components/onboarding/next-button';
import { API_URL } from '@/constants/config';
import { UnisColors } from '@/constants/unis-theme';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
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
import { getAuthToken, setAuthTokens } from '../../store/auth';


export default function InscriptionScreen() {
  const router = useRouter();
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      router.replace('/(sevrage)/(tabs)/accueil');
    }
  }, []);

  const getErrorMessage = (data: any, status: number) => {
    if (status === 409) {
      return "Cette adresse e-mail existe déjà.";
    }

    const apiMessage =
      data?.message ||
      data?.error ||
      data?.errors?.[0]?.message ||
      data?.detail;

    return typeof apiMessage === 'string' && apiMessage.trim().length > 0
      ? apiMessage
      : "L'inscription a échoué. Veuillez réessayer.";
  };

  const getTokensFromResponse = (data: any) => {
    const jwt =
      data?.jwt ||
      data?.token ||
      data?.accessToken ||
      data?.access_token ||
      data?.tokens?.jwt ||
      data?.tokens?.accessToken ||
      data?.data?.jwt ||
      data?.data?.accessToken;

    const refreshToken =
      data?.refreshToken ||
      data?.refresh_token ||
      data?.tokens?.refreshToken ||
      data?.data?.refreshToken;

    return {
      jwt: typeof jwt === 'string' ? jwt : '',
      refreshToken: typeof refreshToken === 'string' ? refreshToken : '',
    };
  };

  const handleNext = async () => {
    if (isSubmitting) {
      return;
    }

    const trimmedPrenom = prenom.trim();
    const trimmedNom = nom.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedPrenom || !trimmedNom || !trimmedEmail || !password || !confirmPassword) {
      Alert.alert('Champs requis', 'Merci de remplir tous les champs.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert('Email invalide', 'Merci de saisir une adresse e-mail valide.');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Mot de passe', 'Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Mot de passe', 'Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_URL}/auth/malade/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prenom: trimmedPrenom,
          nom: trimmedNom,
          email: trimmedEmail,
          password,
        }),
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        Alert.alert('Inscription impossible', getErrorMessage(data, response.status));
        return;
      }

      const { jwt, refreshToken } = getTokensFromResponse(data);
      if (!jwt || !refreshToken) {
        Alert.alert(
          'Inscription incomplète',
          "Le compte a été créé mais les tokens d'authentification sont manquants."
        );
        return;
      }

      setAuthTokens(jwt, refreshToken, trimmedPrenom, trimmedNom);
      router.replace('/(sevrage)/partage');
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer plus tard.');
    } finally {
      setIsSubmitting(false);
    }
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
