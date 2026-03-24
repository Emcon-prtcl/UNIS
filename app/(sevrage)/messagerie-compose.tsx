import { UnisColors } from '@/constants/unis-theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MessagerieComposeScreen() {
  const [text, setText] = useState('');

  const send = () => {
    Keyboard.dismiss();
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>

        <Text style={styles.title}>Messagerie</Text>

        <View style={styles.inputCard}>
          <TextInput
            style={styles.input}
            placeholder="Envoyer un message"
            placeholderTextColor={UnisColors.purple.medium}
            multiline
            value={text}
            onChangeText={setText}
            autoFocus
            textAlignVertical="top"
          />
        </View>

        <Pressable style={styles.sendButton} onPress={send}>
          <Image
            source={require('../../assets/images/send_message.png')}
            style={styles.sendIcon}
            resizeMode="contain"
          />
          <Text style={styles.sendButtonText}>Envoyer</Text>
        </Pressable>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: UnisColors.offWhite },
  safe: { flex: 1, paddingHorizontal: 20 },
  backButton: { marginTop: 8, padding: 6, alignSelf: 'flex-start', marginLeft: -6 },
  backArrow: { fontSize: 26, color: UnisColors.purple.dark, fontWeight: '600' },
  title: {
    fontSize: 28,
    fontFamily: 'TitleWrap',
    fontWeight: '800',
    color: UnisColors.purple.dark,
    marginBottom: 24,
  },
  inputCard: {
    flex: 1,
    borderWidth: 2,
    borderColor: UnisColors.purple.dark,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: UnisColors.yellow.light,
    borderRadius: 20,
    paddingVertical: 18,
    marginBottom: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  sendIcon: {
    width: 26,
    height: 26,
    tintColor: UnisColors.purple.dark,
  },
  sendButtonText: {
    fontSize: 22,
    fontFamily: 'TitleWrap',
    fontWeight: '800',
    color: UnisColors.purple.dark,
  },
});
