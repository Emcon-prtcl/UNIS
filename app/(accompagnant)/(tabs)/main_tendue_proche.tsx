import { UnisColors } from '@/constants/unis-theme';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── Types ────────────────────────────────────────────────────────────────────

type Invitation = {
  id: string;
  title: string;
  proposedBy: string;
  status: 'pending' | 'past';
  date?: string;
  comment?: string;
  isRaised?: boolean;
};

type Activity = {
  id: string;
  label: string;
};

// ─── Mock data ────────────────────────────────────────────────────────────────

const ACTIVITIES: Activity[] = [
  { id: '1', label: 'Apéro sans alcool' },
  { id: '2', label: 'Se promener' },
  { id: '3', label: 'Aller faire du shopping' },
  { id: '4', label: 'Aller au cinéma' },
  { id: '5', label: 'Dîner ensemble' },
  { id: '6', label: 'Déjeuner ensemble' },
];

const MOCK_INVITATIONS: Invitation[] = [
  {
    id: 'inv1',
    title: 'Aller au cinéma',
    proposedBy: 'Sophia',
    status: 'pending',
    isRaised: true,
  },
  {
    id: 'inv2',
    title: 'Apéro sans alcool',
    proposedBy: 'Sophia',
    status: 'past',
    date: 'Hier',
    comment: "j'ai passé un super moment !",
  },
];

// ─── Sub-screens ──────────────────────────────────────────────────────────────

/** Screen 1 – invitation list */
function InvitationListScreen({
  invitations,
  onTendreLaMain,
}: {
  invitations: Invitation[];
  onTendreLaMain: () => void;
}) {
  const received = invitations.filter(
    (i) => i.status === 'pending' && !i.isRaised,
  );
  const pending = invitations.filter(
    (i) => i.status === 'pending' && i.isRaised,
  );
  const past = invitations.filter((i) => i.status === 'past');

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* CTA button */}
      <TouchableOpacity style={styles.ctaButton} onPress={onTendreLaMain}>
        <Text style={styles.ctaButtonText}>✈ Tendre la main</Text>
      </TouchableOpacity>

      {/* Reçus */}
      <Text style={styles.sectionTitle}>Reçus</Text>
      {received.length === 0 ? (
        <Text style={styles.emptyText}>Aucune invitation pour le moment</Text>
      ) : (
        received.map((inv) => (
          <InvitationCard key={inv.id} invitation={inv} />
        ))
      )}

      {/* En attente */}
      <Text style={styles.sectionTitle}>En attente</Text>
      {pending.length === 0 ? (
        <Text style={styles.emptyText}>Aucune invitation en attente</Text>
      ) : (
        pending.map((inv) => <InvitationCard key={inv.id} invitation={inv} />)
      )}

      {/* Passés */}
      <Text style={styles.sectionTitle}>Passés</Text>
      {past.length === 0 ? (
        <Text style={styles.emptyText}>Aucun événement passé</Text>
      ) : (
        past.map((inv) => <InvitationCard key={inv.id} invitation={inv} />)
      )}
    </ScrollView>
  );
}

function InvitationCard({ invitation }: { invitation: Invitation }) {
  const isPast = invitation.status === 'past';

  return (
    <View style={[styles.card, isPast ? styles.cardPast : styles.cardPending]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, isPast && styles.cardTitlePast]}>
          {invitation.title}
        </Text>
        {invitation.date && (
          <Text style={styles.cardDate}>{invitation.date}</Text>
        )}
      </View>
      <Text style={styles.cardSub}>
        {isPast
          ? `Proposé par ${invitation.proposedBy}`
          : `${invitation.proposedBy} t'a envoyé cette invitation.`}
      </Text>
      {invitation.comment && (
        <View style={styles.commentBox}>
          <Text style={styles.commentText}>
            Tu as commenté : "{invitation.comment}"
          </Text>
        </View>
      )}
      {invitation.isRaised && (
        <View style={styles.raisedBadgeWrapper}>
          <View style={styles.raisedBadge}>
            <Text style={styles.raisedBadgeText}>Invitation relevée</Text>
          </View>
        </View>
      )}
    </View>
  );
}

/** Screen 2 – activity picker */
function ActivityPickerScreen({
  onBack,
  onSelectActivity,
}: {
  onBack: () => void;
  onSelectActivity: (activity: Activity) => void;
}) {
  return (
    <View style={styles.pickerContainer}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <Text style={styles.screenTitle}>Tendre la main</Text>

      {/* Standard activities */}
      <View style={styles.activityList}>
        {ACTIVITIES.map((activity, index) => (
          <React.Fragment key={activity.id}>
            <TouchableOpacity
              style={styles.activityRow}
              onPress={() => onSelectActivity(activity)}
            >
              <Text style={styles.activityLabel}>{activity.label}</Text>
              <Text style={styles.activityChevron}>›</Text>
            </TouchableOpacity>
            {index < ACTIVITIES.length - 1 && (
              <View style={styles.activityDivider} />
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Custom invitation */}
      <TouchableOpacity
        style={styles.customInviteButton}
        onPress={() =>
          onSelectActivity({ id: 'custom', label: 'Invitation personnalisée' })
        }
      >
        <Text style={styles.customInviteLabel}>Invitation personnalisée</Text>
        <Text style={styles.activityChevron}>›</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function MainTendueScreen() {
  const [view, setView] = useState<'list' | 'picker'>('list');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );
  const [invitations] = useState<Invitation[]>(MOCK_INVITATIONS);

  const handleSelectActivity = (activity: Activity) => {
    setSelectedActivity(activity);
  };

  const handleConfirm = () => {
    // TODO: send invitation
    setSelectedActivity(null);
    setView('list');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {view === 'list' ? (
        <InvitationListScreen
          invitations={invitations}
          onTendreLaMain={() => setView('picker')}
        />
      ) : (
        <ActivityPickerScreen
          onBack={() => setView('list')}
          onSelectActivity={handleSelectActivity}
        />
      )}

      {/* Confirmation modal (Screen 3) */}
      <Modal
        visible={!!selectedActivity}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedActivity(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSelectedActivity(null)}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalLabel}>Envoyer l'invitation :</Text>
            <Text style={styles.modalActivity}>{selectedActivity?.label}</Text>
            <TouchableOpacity
              style={styles.validateButton}
              onPress={handleConfirm}
            >
              <Text style={styles.validateButtonText}>Valider</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8EC',
  },

  // ── List screen ──
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  ctaButton: {
    backgroundColor: '#F5C842',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 28,
    alignItems: 'center',
  },
  ctaButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: UnisColors.purple.dark,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: UnisColors.purple.dark,
    marginBottom: 8,
    marginTop: 8,
  },
  emptyText: {
    fontSize: 14,
    color: UnisColors.purple.dark,
    marginBottom: 20,
  },
  card: {
    borderRadius: 14,
    borderWidth: 2,
    padding: 14,
    marginBottom: 14,
  },
  cardPending: {
    borderColor: '#F472B6',
    backgroundColor: '#FFF',
  },
  cardPast: {
    borderColor: UnisColors.purple.dark,
    backgroundColor: '#FFF',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: UnisColors.purple.dark,
  },
  cardTitlePast: {
    color: UnisColors.purple.dark,
  },
  cardDate: {
    fontSize: 13,
    color: UnisColors.purple.dark,
  },
  cardSub: {
    fontSize: 13,
    color: UnisColors.purple.dark,
    marginTop: 4,
  },
  commentBox: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E0D4F5',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#FAF5FF',
  },
  commentText: {
    fontSize: 13,
    color: UnisColors.purple.dark,
    fontStyle: 'italic',
  },
  raisedBadgeWrapper: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  raisedBadge: {
    backgroundColor: '#F472B6',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  raisedBadgeText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },

  // ── Picker screen ──
  pickerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  backButton: {
    marginBottom: 4,
  },
  backArrow: {
    fontSize: 22,
    color: UnisColors.purple.dark,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: UnisColors.purple.dark,
    marginBottom: 20,
  },
  activityList: {
    borderWidth: 2,
    borderColor: UnisColors.purple.dark,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activityLabel: {
    fontSize: 16,
    color: UnisColors.purple.dark,
  },
  activityChevron: {
    fontSize: 20,
    color: UnisColors.purple.dark,
  },
  activityDivider: {
    height: 1.5,
    backgroundColor: '#F5C842',
    marginHorizontal: 0,
  },
  customInviteButton: {
    borderWidth: 2,
    borderColor: '#F5C842',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customInviteLabel: {
    fontSize: 16,
    color: UnisColors.purple.dark,
  },

  // ── Modal ──
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  modalCard: {
    backgroundColor: '#F5C842',
    borderRadius: 20,
    padding: 28,
    width: '100%',
    alignItems: 'center',
  },
  modalLabel: {
    fontSize: 16,
    color: UnisColors.purple.dark,
    marginBottom: 6,
  },
  modalActivity: {
    fontSize: 22,
    fontWeight: '800',
    color: UnisColors.purple.dark,
    marginBottom: 24,
    textAlign: 'center',
  },
  validateButton: {
    backgroundColor: UnisColors.purple.dark,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  validateButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});