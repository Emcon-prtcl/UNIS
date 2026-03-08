import { UnisColors } from '@/constants/unis-theme';
import { router } from 'expo-router';
import React from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const invitationsRecues = [
  {
    id: '1',
    title: 'Dîner au restaurant',
    subtitle: 'Zoé t\'a invité, que souhaites tu faire ?',
  },
  {
    id: '2',
    title: 'Aller faire un bowling',
    subtitle: 'Mathis t\'a invité, que souhaites tu faire ?',
  },
];

const invitationsPassees = [
  {
    id: '3',
    title: 'Apéro sans alcool',
    proposePar: 'Marc',
    date: 'Hier',
    commentaire: 'Sophia à commenté : "j\'ai passé un super moment !"',
  },
  {
    id: '4',
    title: 'Aller faire du shopping',
    proposePar: 'Noah',
    date: 'Lun, 12 mai',
    commentaire: '',
  },
  {
    id: '5',
    title: 'Se promener',
    proposePar: 'Margaux',
    date: 'Mer, 7 mai',
    commentaire: '',
  },
];

export default function MainTendueScreen() {
  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Bouton envoyer */}
          <Pressable style={styles.sendButton} onPress={() => router.push('/(sevrage)/invitation')}>
            <Image
              source={require('../../../assets/images/home_sent.png')}
              style={styles.sendIcon}
              resizeMode="contain"
            />
            <Text style={styles.sendButtonText}>Envoyer une invitation</Text>
          </Pressable>

          {/* Invitations reçues */}
          <Text style={styles.sectionTitle}>Invitations reçus</Text>
          {invitationsRecues.map((inv) => (
            <View key={inv.id} style={styles.receivedCard}>
              <Text style={styles.receivedTitle}>{inv.title}</Text>
              <Text style={styles.receivedSubtitle}>{inv.subtitle}</Text>
              <View style={styles.receivedActions}>
                <Pressable style={styles.refuseButton}>
                  <Text style={styles.refuseText}>Refuser</Text>
                </Pressable>
                <Pressable style={styles.acceptButton}>
                  <Text style={styles.acceptText}>Accepter</Text>
                </Pressable>
              </View>
            </View>
          ))}

          {/* Invitations passées */}
          <Text style={styles.sectionTitle}>Invitations passés</Text>
          {invitationsPassees.map((inv) => (
            <View key={inv.id} style={styles.pastCard}>
              <View style={styles.pastHeader}>
                <Text style={styles.pastTitle}>{inv.title}</Text>
                <Text style={styles.pastDate}>{inv.date}</Text>
              </View>
              <Text style={styles.pastPropose}>Proposé par {inv.proposePar}</Text>
              {inv.commentaire ? (
                <View style={styles.commentBubble}>
                  <Text style={styles.commentText}>{inv.commentaire}</Text>
                </View>
              ) : (
                <View style={styles.commentInputWrap}>
                  <TextInput
                    style={styles.commentInput}
                    placeholder="Ajoute une réaction ou un commentaire !"
                    placeholderTextColor={UnisColors.purple.medium}
                  />
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: UnisColors.background,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 14,
  },
  sendButton: {
    backgroundColor: UnisColors.yellow.medium,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 24,
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
    width: 22,
    height: 22,
    tintColor: UnisColors.purple.dark,
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
    marginTop: 8,
  },
  receivedCard: {
    borderWidth: 2,
    borderColor: UnisColors.purple.dark,
    borderRadius: 16,
    padding: 14,
    backgroundColor: UnisColors.white,
    gap: 8,
  },
  receivedTitle: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
  },
  receivedSubtitle: {
    fontSize: 13,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
  },
  receivedActions: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
  },
  refuseButton: {
    backgroundColor: UnisColors.purple.light,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  refuseText: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
  },
  acceptButton: {
    backgroundColor: UnisColors.purple.dark,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  acceptText: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: UnisColors.white,
  },
  pastCard: {
    borderWidth: 2,
    borderColor: UnisColors.purple.medium,
    borderRadius: 16,
    padding: 14,
    backgroundColor: UnisColors.white,
    gap: 6,
  },
  pastHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pastTitle: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
  },
  pastDate: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: UnisColors.purple.medium,
  },
  pastPropose: {
    fontSize: 13,
    fontFamily: 'Inter',
    color: UnisColors.purple.medium,
  },
  commentBubble: {
    backgroundColor: UnisColors.purple.veryLight,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  commentText: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
    fontStyle: 'italic',
  },
  commentInputWrap: {
    marginTop: 4,
  },
  commentInput: {
    borderWidth: 1.5,
    borderColor: UnisColors.purple.light,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 12,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
    backgroundColor: UnisColors.white,
  },
});
