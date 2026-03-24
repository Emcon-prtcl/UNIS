import { UnisColors } from '@/constants/unis-theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Vague2 from '../../assets/images/Vague-2.svg';

export default function EspaceProche5() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [relation, setRelation] = useState('');

  const handleSubmit = () => {
    // Frontend-only for now
    console.log('Submitted:', { firstName, lastName, email, phone, relation });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundWave} pointerEvents="none">
        <Vague2 style={styles.wave} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.main}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 60}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Crée ton compte</Text>

          <View style={styles.form}>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Prénom"
              placeholderTextColor={UnisColors.purple.medium}
              style={styles.input}
            />

            <TextInput
              value={lastName}
              onChangeText={setLastName}
              placeholder="Nom"
              placeholderTextColor={UnisColors.purple.medium}
              style={styles.input}
            />

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Adresse mail"
              placeholderTextColor={UnisColors.purple.medium}
              keyboardType="email-address"
              style={styles.input}
              autoCapitalize="none"
            />

            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="Téléphone"
              placeholderTextColor={UnisColors.purple.medium}
              keyboardType="phone-pad"
              style={styles.input}
            />

            <TextInput
              value={relation}
              onChangeText={setRelation}
              placeholder="Lien avec l'utilisateur (ex: proche, parent)"
              placeholderTextColor={UnisColors.purple.medium}
              style={styles.input}
            />
          </View>
        </ScrollView>

        <View style={styles.bottomArea} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.nextButton}
            activeOpacity={0.9}
            onPress={() => {
              // Navigate to the next accompagant screen
              router.push('/espace_proche6');
            }}
          >
            <Text style={styles.nextLabel}>Suivant</Text>
            <Text style={styles.nextArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UnisColors.offWhite,
  },
  backgroundWave: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 220,
    zIndex: 0,
  },
  wave: {
    width: '100%',
    height: '100%',
  },
  main: {
    flex: 1,
    zIndex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 260,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: UnisColors.purple.dark,
    marginBottom: 24,
  },
  form: {
    gap: 14,
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: UnisColors.purple.dark,
    paddingHorizontal: 14,
    fontSize: 15,
    color: UnisColors.purple.dark,
    backgroundColor: 'transparent',
  },
  bottomArea: {
    width: '100%',
    height: 220,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 2,
    paddingBottom: 12,
  },
  nextButton: {
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
  },
  nextLabel: {
    color: UnisColors.purple.dark,
    fontWeight: '800',
    fontSize: 18,
    marginRight: 12,
  },
  nextArrow: {
    color: UnisColors.purple.dark,
    fontSize: 20,
    fontWeight: '700',
  },
});
