import { UnisColors } from '@/constants/unis-theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

const invitationOptions = [
  'Apéro sans alcool',
  'Se promener',
  'Aller faire du shopping',
  'Aller au cinéma',
  'Dîner ensemble',
  'Déjeuner ensemble',
];

const contacts = ['Mathis', 'Zoé', 'Marc', 'Noah', 'Margaux', 'Sophia'];

export default function InvitationScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customText, setCustomText] = useState('');
  const [contactIndex, setContactIndex] = useState(0);
  const [showContactPicker, setShowContactPicker] = useState(false);

  const close = () => {
    setSelected(null);
    setShowCustomModal(false);
  };

  const valider = () => {
    setSelected(null);
    setShowCustomModal(false);
    router.back();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>{'\u2190'}</Text>
        </Pressable>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Envoyer une invitation</Text>

          {/* Grouped card — all standard options */}
          <View style={styles.groupCard}>
            {invitationOptions.map((label, index) => (
              <View key={label}>
                <Pressable style={styles.row} onPress={() => { setSelected(label); setContactIndex(0); }}>
                  <Text style={styles.rowText}>{label}</Text>
                  <Text style={styles.rowChevron}>{'›'}</Text>
                </Pressable>

                {index < invitationOptions.length - 1 && (
                  <View style={styles.separator} />
                )}
              </View>
            ))}
          </View>

          {/* Custom invitation — separate yellow-bordered card */}
          <View style={styles.customCard}>
            <Pressable style={styles.row} onPress={() => { setShowCustomModal(true); setContactIndex(0); }}>
              <Text style={styles.rowText}>Invitation personnalisée</Text>
              <Text style={styles.rowChevron}>{'\u203A'}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Custom invitation modal */}
      <Modal transparent visible={showCustomModal} animationType="fade" onRequestClose={close}>
        <Pressable style={styles.modalOverlay} onPress={close}>
          <Pressable style={styles.inviteCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.panelSub}>Envoyer l’invitation :</Text>
            <Text style={styles.panelTitle}>Invitation personnalisée</Text>
            <TextInput
              style={styles.customInput}
              placeholder="Entre ton invitation"
              placeholderTextColor={UnisColors.purple.dark}
              value={customText}
              onChangeText={setCustomText}
            />
            <View style={styles.panelRow}>
              <Text style={styles.panelTo}>À :</Text>
              <Pressable
                style={styles.contactPill}
                onPress={() => setShowContactPicker(true)}
              >
                <Text style={styles.contactPillText}>
                  {contacts[contactIndex]}{'  ▾'}
                </Text>
              </Pressable>
              <Pressable style={styles.validerBtn} onPress={valider}>
                <Text style={styles.validerText}>Valider</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Invitation send modal */}
      <Modal transparent visible={selected !== null} animationType="fade" onRequestClose={close}>
        <Pressable style={styles.modalOverlay} onPress={close}>
          <Pressable style={styles.inviteCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.panelSub}>Envoyer l’invitation :</Text>
            <Text style={styles.panelTitle}>{selected}</Text>
            <View style={styles.panelRow}>
              <Text style={styles.panelTo}>À :</Text>
              <Pressable
                style={styles.contactPill}
                onPress={() => setShowContactPicker(true)}
              >
                <Text style={styles.contactPillText}>
                  {contacts[contactIndex]}{'  ▾'}
                </Text>
              </Pressable>
              <Pressable style={styles.validerBtn} onPress={valider}>
                <Text style={styles.validerText}>Valider</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Contact picker modal */}
      <Modal transparent visible={showContactPicker} animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setShowContactPicker(false)}>
          <View style={styles.pickerCard}>
            {contacts.map((c, i) => (
              <Pressable
                key={c}
                style={[styles.pickerRow, i < contacts.length - 1 && styles.pickerRowBorder]}
                onPress={() => {
                  setContactIndex(i);
                  setShowContactPicker(false);
                }}
              >
                <Text style={[styles.pickerText, i === contactIndex && styles.pickerTextActive]}>
                  {c}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: UnisColors.offWhite },
  safe: { flex: 1 },
  backButton: { marginTop: 8, marginLeft: 16, padding: 6, alignSelf: 'flex-start' },
  backArrow: { fontSize: 26, color: UnisColors.purple.dark, fontWeight: '600' },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 },
  title: {
    fontSize: 26,
    fontFamily: 'TitleWrap',
    fontWeight: '800',
    color: UnisColors.purple.dark,
    marginBottom: 24,
  },

  groupCard: {
    borderWidth: 2,
    borderColor: UnisColors.purple.dark,
    borderRadius: 16,
    backgroundColor: UnisColors.white,
    overflow: 'hidden',
    marginBottom: 16,
  },

  customCard: {
    borderWidth: 2,
    borderColor: UnisColors.yellow.medium,
    borderRadius: 16,
    backgroundColor: UnisColors.white,
    overflow: 'hidden',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 18,
    backgroundColor: UnisColors.white,
  },
  rowText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: UnisColors.purple.dark,
  },
  rowChevron: {
    fontSize: 22,
    color: UnisColors.yellow.medium,
    fontWeight: '700',
  },

  separator: {
    height: 1.5,
    backgroundColor: UnisColors.yellow.medium,
  },

  panel: {
    backgroundColor: UnisColors.yellow.medium,
    padding: 18,
  },
  panelSub: {
    fontSize: 13,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
    marginBottom: 2,
  },
  panelTitle: {
    fontSize: 20,
    fontFamily: 'TitleWrap',
    fontWeight: '800',
    color: UnisColors.purple.dark,
    marginBottom: 14,
  },
  panelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  panelTo: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
  },
  contactPill: {
    borderWidth: 1.5,
    borderColor: UnisColors.purple.dark,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: UnisColors.white,
  },
  contactPillText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
  },
  validerBtn: {
    marginLeft: 'auto',
    backgroundColor: UnisColors.purple.dark,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  validerText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: UnisColors.white,
  },
  customInput: {
    backgroundColor: UnisColors.white,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
    marginBottom: 12,
  },

  inviteCard: {
    backgroundColor: UnisColors.yellow.medium,
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 24,
    width: '85%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerCard: {
    backgroundColor: UnisColors.white,
    borderRadius: 16,
    width: 220,
    overflow: 'hidden',
  },
  pickerRow: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  pickerRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: UnisColors.purple.veryLight,
  },
  pickerText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: UnisColors.purple.dark,
  },
  pickerTextActive: {
    fontWeight: '800',
  },
});
