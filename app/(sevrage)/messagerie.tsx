import { UnisColors } from '@/constants/unis-theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialMessages = [
  { id: '1', name: 'Noah', time: '8:45', text: 'Passes une bonne journée ! 😀💛💛' },
  { id: '2', name: 'Margaux', time: 'Hier', text: "Je suis fière de toi, tu as réussi à participer à cette réunion, je sais que c'était pas évident pour toi 🏆" },
  { id: '3', name: 'Louis', time: 'Hier', text: "T'es le meilleur 💚💚💚💚" },
  { id: '4', name: 'Zoé', time: 'Hier', text: '💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗' },
  { id: '5', name: 'Louis', time: 'Mar, 24/06', text: "Comme je suis fière de toi, tu as réussi à rester abstinent au restaurant hier. Tu as parcouru tellement de chemin, j'espère que tu rend compte.\nEn tout cas sache que moi je vois tous tes efforts et je te soutiens à 100%" },
  { id: '6', name: 'Marc', time: 'Lun, 23/06', text: '💚💚💚' },
  { id: '7', name: 'Zoé', time: 'Lun, 23/06', text: '' },
];

export default function MessagerieScreen() {
  const [messages] = useState(initialMessages);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Messagerie</Text>

          {/* Bouton Envoyer un message */}
          <Pressable
            style={styles.sendButton}
            onPress={() => router.push('/(sevrage)/messagerie-compose')}
          >
            <Image
              source={require('../../assets/images/send_message.png')}
              style={styles.sendIcon}
              resizeMode="contain"
            />
            <Text style={styles.sendButtonText}>Envoyer un message</Text>
          </Pressable>

          {/* Liste des messages */}
          {messages.map((msg) => (
            <View key={msg.id} style={styles.msgCard}>
              <View style={styles.msgHeader}>
                <Text style={styles.msgName}>{msg.name}</Text>
                <Text style={styles.msgTime}>{msg.time}</Text>
              </View>
              {msg.text ? (
                <View style={styles.msgBubble}>
                  <Text style={styles.msgText}>{msg.text}</Text>
                </View>
              ) : null}
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
    marginBottom: 20,
  },

  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: UnisColors.yellow.medium,
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 20,
    gap: 12,
  },
  sendIcon: {
    width: 26,
    height: 26,
    tintColor: UnisColors.purple.dark,
  },
  sendButtonText: {
    fontSize: 20,
    fontFamily: 'TitleWrap',
    fontWeight: '800',
    color: UnisColors.purple.dark,
  },

  composeCard: {
    borderWidth: 2,
    borderColor: UnisColors.purple.dark,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    backgroundColor: UnisColors.offWhite,
  },
  composeInput: {
    fontSize: 15,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
    minHeight: 160,
    textAlignVertical: 'top',
  },
  envoyer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: UnisColors.yellow.light,
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 12,
    gap: 10,
  },
  envoyerIcon: {
    width: 22,
    height: 22,
    tintColor: UnisColors.purple.dark,
  },
  envoyerText: {
    fontSize: 20,
    fontFamily: 'TitleWrap',
    fontWeight: '800',
    color: UnisColors.purple.dark,
  },

  msgCard: {
    borderWidth: 2,
    borderColor: UnisColors.purple.dark,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    backgroundColor: UnisColors.white,
  },
  msgHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  msgName: {
    fontSize: 16,
    fontFamily: 'TitleWrap',
    fontWeight: '800',
    color: UnisColors.purple.dark,
  },
  msgTime: {
    fontSize: 13,
    fontFamily: 'Inter',
    color: UnisColors.purple.medium,
  },
  msgBubble: {
    borderWidth: 1.5,
    borderColor: UnisColors.purple.dark,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  msgText: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
    lineHeight: 20,
  },
});
