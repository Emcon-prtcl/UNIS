import { API_URL } from '@/constants/config';
import { UnisColors } from '@/constants/unis-theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setAuthTokens } from '../../store/auth';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getErrorMessage = (data: any, status: number) => {
    if (status === 401 || status === 400) {
      return 'Email ou mot de passe incorrect.';
    }

    const apiMessage =
      data?.message ||
      data?.error ||
      data?.errors?.[0]?.message ||
      data?.detail;

    return typeof apiMessage === 'string' && apiMessage.trim().length > 0
      ? apiMessage
      : 'La connexion a échoué. Veuillez réessayer.';
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

  const handleLogin = async () => {
    if (isSubmitting) {
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !password) {
      Alert.alert('Champs requis', 'Merci de saisir votre email et votre mot de passe.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert('Email invalide', 'Merci de saisir une adresse e-mail valide.');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
        Alert.alert('Connexion échouée', getErrorMessage(data, response.status));
        return;
      }

      const { jwt, refreshToken } = getTokensFromResponse(data);
      if (!jwt || !refreshToken) {
        Alert.alert(
          'Connexion incomplète',
          "L'authentification a échoué : tokens manquants."
        );
        return;
      }

      setAuthTokens(jwt, refreshToken);
      router.dismissAll();
      router.replace('/(sevrage)/(tabs)/accueil');
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.');
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
            <Text style={styles.title}>Connexion</Text>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Adresse mail"
                placeholderTextColor={UnisColors.purple.medium}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isSubmitting}
              />
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor={UnisColors.purple.medium}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isSubmitting}
              />
            </View>

            <Pressable
              style={[styles.loginButton, isSubmitting && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isSubmitting}
            >
              <Text style={styles.loginButtonText}>
                {isSubmitting ? 'Connexion...' : 'Se connecter'}
              </Text>
            </Pressable>

            <View style={styles.divider} />

            <View style={styles.signupPrompt}>
              <Text style={styles.signupText}>Je n'ai pas de compte</Text>
              <Pressable onPress={() => router.push('/(sevrage)/inscription')}>
                <Text style={styles.signupLink}>Créer un compte</Text>
              </Pressable>
            </View>
          </ScrollView>
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
    paddingBottom: 20,
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
    marginBottom: 24,
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
  loginButton: {
    backgroundColor: UnisColors.purple.dark,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: UnisColors.white,
    fontSize: 18,
    fontFamily: 'TitleWrap',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: UnisColors.purple.veryLight,
    marginBottom: 24,
  },
  signupPrompt: {
    alignItems: 'center',
    gap: 8,
  },
  signupText: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: UnisColors.purple.medium,
  },
  signupLink: {
    fontSize: 16,
    fontFamily: 'TitleWrap',
    fontWeight: '700',
    color: UnisColors.purple.dark,
    textDecorationLine: 'underline',
  },
});
