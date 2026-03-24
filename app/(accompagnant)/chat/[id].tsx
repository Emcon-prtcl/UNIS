import { UnisColors } from '@/constants/unis-theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  function handleSend() {
    if (message.trim()) {
      // logique d'envoi ici
      setMessage('');
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.headerRow}>
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Messagerie</Text>
      </View>

      {/* Zone de texte */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="Envoyer un message"
          placeholderTextColor={UnisColors.purple.medium}
          value={message}
          onChangeText={setMessage}
          multiline
          textAlignVertical="top"
        />
      </View>

      {/* Bouton Envoyer */}
      <Pressable style={styles.sendButton} onPress={handleSend}>
        <Image
          source={require('../../../assets/images/Frame-6.png')}
          style={styles.sendIcon}
          resizeMode="contain"
        />
        <Text style={styles.sendText}>Envoyer</Text>
      </Pressable>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UnisColors.offWhite,
    paddingHorizontal: 24,
    paddingTop: 8,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  back: {
    paddingRight: 12,
  },
  backArrow: {
    fontSize: 32,
    color: UnisColors.purple.dark,
    lineHeight: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: UnisColors.purple.dark,
  },

  inputWrapper: {
    borderWidth: 2,
    borderColor: UnisColors.purple.dark,
    borderRadius: 16,
    padding: 14,
    marginBottom: 32,
    height: 200,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: UnisColors.purple.dark,
    fontFamily: 'Inter',
  },

  sendButton: {
    backgroundColor: UnisColors.yellow.light,
    borderRadius: 50,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  sendIcon: {
    width: 24,
    height: 24,
    tintColor: UnisColors.purple.dark,
  },
  sendText: {
    fontSize: 22,
    fontWeight: '800',
    color: UnisColors.purple.dark,
  },
});