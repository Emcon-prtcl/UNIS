import { UnisColors } from '@/constants/unis-theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MESSAGES = [
  { id: '1', name: 'Sophia', time: '8:45', text: "Passes une bonne journée ! 😊💛💛" },
  { id: '2', name: 'Sophia', time: 'Hier', text: '💛💛💛💛💛' },
  { id: '3', name: 'Sophia', time: 'Hier', text: "Merci pour ton message, ça m'a fait chaud au cœur !" },
  { id: '4', name: 'Sophia', time: 'Lun, 23/06', text: 'Merci pour ton soutien💚' },
  { id: '5', name: 'Sophia', time: 'Mer, 18/06', text: "Qu'est-ce que je ferai sans toi ? 💜💜💜" },
  { id: '6', name: 'Sophia', time: 'Lun, 16/06', text: "J'ai adoré ton speech tout à l'heure 🥰" },
  { id: '7', name: 'Sophia', time: 'Ven, 13/06', text: '💖💖' },
];

export default function EspaceProche8() {
  const router = useRouter();

  function openChat(id: string) {
    router.push(`/(accompagnant)/chat/${id}`);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Messagerie</Text>
      </View>

      <Pressable style={styles.sendButton} onPress={() => openChat('new')}>
        <Image source={require('../../assets/images/Frame-6.png')} style={styles.sendIcon} />
        <Text style={styles.sendText}>Envoyer un message</Text>
      </Pressable>

      <FlatList
        data={MESSAGES}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable style={styles.messageCard} onPress={() => openChat(item.id)}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardTime}>{item.time}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text numberOfLines={1} style={styles.cardText}>{item.text}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: UnisColors.offWhite, padding: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  back: { paddingRight: 12 },
  backArrow: { fontSize: 28, color: UnisColors.purple.dark },
  title: { fontSize: 28, fontWeight: '800', color: UnisColors.purple.dark },

  sendButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: UnisColors.yellow.light, padding: 14, borderRadius: 14, marginVertical: 12, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } },
  sendIcon: { width: 28, height: 28, marginRight: 12 },
  sendText: { fontSize: 18, fontWeight: '800', color: UnisColors.purple.dark },

  list: { paddingBottom: 120 },
  messageCard: { borderWidth: 2, borderColor: UnisColors.purple.dark, borderRadius: 14, padding: 12, marginBottom: 12, backgroundColor: UnisColors.offWhite },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  cardName: { fontWeight: '800', color: UnisColors.purple.dark },
  cardTime: { color: UnisColors.purple.light },
  cardBody: { borderWidth: 2, borderColor: UnisColors.purple.dark, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 8 },
  cardText: { color: UnisColors.purple.dark },
});
