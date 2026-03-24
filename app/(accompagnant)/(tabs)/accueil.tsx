import { UnisColors } from '@/constants/unis-theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccueilScreen() {
  const router = useRouter();
  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>

        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.greeting}>Salut Sophia !</Text>
          </View>
          <View style={styles.avatarWrap}>
            <Image
              source={require('../../../assets/images/Frame-marc.png')}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
        </View>

        <ScrollView
          style={styles.scrollOverlay}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.panel}>

            <View style={styles.jourCard}>
              <View style={styles.jourNumberBox}>
                <Text style={styles.jourNumber}>1</Text>
              </View>
              <Text style={styles.jourLabel}>Jour de suivi</Text>
            </View>

            <View style={styles.statusCard}>
              <Text style={styles.statusTitle}>Statuts de Sophia</Text>
              <Text style={styles.statusDate}>Aujourd'hui, 26 juin 2025</Text>

              <View style={styles.statusInner}>
                <Image source={require('../../../assets/images/Frame-sophia.png')} style={styles.smallAvatar} />
                <View style={{ flex: 1 }} />
                <View style={styles.badge}>
                  <Text style={styles.badgeNumber}>10</Text>
                  <Text style={styles.badgeText}>jours de parcours</Text>
                </View>
              </View>

              <Pressable style={styles.talkButton}>
                <Image source={require('../../../assets/images/Vector-3.png')} style={styles.talkIcon} />
                <Text style={styles.talkLabel}>J'ai besoin de parler</Text>
              </Pressable>
            </View>

            <View style={styles.suggestionCard}>
              <Text style={styles.suggestionTitle}>Suggestion du jour</Text>
              <View style={styles.pill}>
                <Text style={styles.pillText}>Idée d'invitation</Text>
              </View>
              <Text style={styles.suggestionText}>Propose à Marc d'aller faire un cours de poterie !</Text>
            </View>

          </View>
        </ScrollView>

        <View style={styles.floatingIcons}>
          <Pressable
            style={styles.iconCircle}
            onPress={() => router.push({ pathname: '/(accompagnant)/espace_proche8' })}
          >
            <Image
              source={require('../../../assets/images/Frame-message.png')}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            style={styles.iconCircle}
            onPress={() => router.push('/(accompagnant)/edit-avatar' as any)}
          >
            <Image
              source={require('../../../assets/images/Frame-bonhomme.png')}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </Pressable>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: UnisColors.purple.light,
    paddingBottom: 72, // laisse la place physique à la tab bar
  },
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: UnisColors.purple.light,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    zIndex: 1,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  greeting: { fontSize: 38, fontWeight: '800', fontFamily: 'TitleWrap', color: UnisColors.purple.dark },
  iconCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: UnisColors.white, alignItems: 'center', justifyContent: 'center' },
  iconImage: { width: 20, height: 20 },
  avatarWrap: { alignItems: 'center', marginTop: 80, marginBottom: 10, padding: 4 },
  avatar: { width: 180, height: 180, backgroundColor: UnisColors.purple.light },
  scrollOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // le paddingBottom du parent gère l'espace tab bar
    zIndex: 2,
  },
  scrollContent: { flexGrow: 1, paddingTop: 420, paddingBottom: 20, backgroundColor: 'transparent' },
  panel: {
    backgroundColor: UnisColors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 30,
    paddingHorizontal: 24,
    paddingBottom: 800,
    marginBottom: -700,
    gap: 20,
    overflow: 'hidden',
  },
  floatingIcons: { position: 'absolute', top: 74, right: 20, flexDirection: 'row', gap: 10, zIndex: 20 },
  jourCard: { flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: UnisColors.purple.dark, borderRadius: 18, paddingVertical: 18, paddingHorizontal: 16, backgroundColor: UnisColors.white, gap: 12, marginBottom: 12 },
  jourNumberBox: { width: 80, height: 56, borderRadius: 16, borderWidth: 2, borderColor: UnisColors.purple.dark, alignItems: 'center', justifyContent: 'center', marginRight: 12, backgroundColor: UnisColors.white },
  jourNumber: { fontSize: 36, fontWeight: '800', color: UnisColors.purple.dark },
  jourLabel: { fontSize: 24, fontWeight: '800', color: UnisColors.purple.dark },
  statusCard: { marginTop: 12, backgroundColor: UnisColors.offWhite || '#fff7ef', borderRadius: 18, padding: 18, borderWidth: 2, borderColor: UnisColors.yellow.light },
  statusTitle: { fontSize: 22, fontWeight: '800', color: UnisColors.purple.dark, textAlign: 'center' },
  statusDate: { fontSize: 12, color: UnisColors.purple.medium, textAlign: 'center', marginBottom: 12 },
  statusInner: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  smallAvatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: UnisColors.purple.light },
  badge: { backgroundColor: UnisColors.purple.dark, padding: 12, borderRadius: 12, alignItems: 'center' },
  badgeNumber: { color: UnisColors.white, fontSize: 28, fontWeight: '800' },
  badgeText: { color: UnisColors.white, fontSize: 12, textAlign: 'center' },
  talkButton: { marginTop: 16, backgroundColor: UnisColors.purple.dark, paddingVertical: 16, borderRadius: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 },
  talkIcon: { width: 28, height: 28, marginRight: 12, tintColor: UnisColors.white },
  talkLabel: { color: UnisColors.white, fontWeight: '800', fontSize: 18 },
  suggestionCard: { marginTop: 18, backgroundColor: UnisColors.purple.dark, padding: 18, borderRadius: 18 },
  suggestionTitle: { color: UnisColors.white, fontSize: 22, fontWeight: '800', marginBottom: 8 },
  pill: { backgroundColor: UnisColors.yellow.light, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 8 },
  pillText: { color: UnisColors.purple.dark, fontWeight: '700' },
  suggestionText: { color: UnisColors.white },
});