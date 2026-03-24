import { UnisColors } from '@/constants/unis-theme';
import { journalStore } from '@/store/journal';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Keyboard,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export default function NotesScreen() {
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    journalStore.notes = notes;
    router.push('/(sevrage)/recapitulatif');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>

        <View style={styles.content}>
          <Text style={styles.title}>Notes personnelles</Text>
          <Text style={styles.description}>
            Si tu le souhaites, tu peux écrire ici tes pensées, tes idées, tes ressentis.{'\n'}
            Mettre des mots sur ce que l'on vit aide souvent à y voir plus clair, à relâcher la pression… et à avancer, un jour après l'autre.
          </Text>

          <TextInput
            style={styles.textArea}
            placeholder="Notes personnelles (optionnel)"
            placeholderTextColor={UnisColors.purple.light}
            value={notes}
            onChangeText={setNotes}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.footer}>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Suivant</Text>
            <Text style={styles.saveText}> →</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: UnisColors.offWhite },
  safe: { flex: 1 },
  backButton: { marginTop: 8, marginLeft: 16, padding: 6, alignSelf: 'flex-start' },
  backArrow: { fontSize: 26, color: UnisColors.purple.dark, fontWeight: '600' },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 8 },
  title: {
    fontSize: 28,
    fontFamily: 'TitleWrap',
    fontWeight: '800',
    color: UnisColors.purple.dark,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: UnisColors.purple.medium,
    lineHeight: 20,
    marginBottom: 24,
  },
  textArea: {
    flex: 1,
    borderWidth: 2,
    borderColor: UnisColors.purple.dark,
    borderRadius: 16,
    padding: 16,
    fontSize: 14,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
    backgroundColor: UnisColors.offWhite,
  },
  footer: { paddingHorizontal: 20, paddingVertical: 16, backgroundColor: UnisColors.offWhite },
  saveButton: {
    backgroundColor: UnisColors.yellow.medium,
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  saveText: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
  },
});
