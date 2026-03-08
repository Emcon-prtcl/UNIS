import { UnisColors } from '@/constants/unis-theme';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccueilScreen() {
  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.greeting}>Salut Sophia !</Text>
            <View style={styles.headerIcons}>
              <Pressable style={styles.iconCircle} onPress={() => router.push('/(sevrage)/messagerie')}>
                <Image
                  source={require('../../../assets/images/home_sent.png')}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </Pressable>
              <View style={styles.iconCircle}>
                <Image
                  source={require('../../../assets/images/home_profil_edit.png')}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
          <View style={styles.avatarWrap}>
            <Image
              source={require('../../../assets/images/avatar.png')}
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
            <View style={styles.dayCard}>
              <Text style={styles.dayNumber}>10</Text>
              <Text style={styles.dayLabel}>Jour de parcours</Text>
            </View>

            <Pressable style={styles.actionButton} onPress={() => router.push('/(sevrage)/mon-journal')}>
              <Text style={styles.actionButtonText}>Mon Journal</Text>
            </Pressable>

            <Pressable style={styles.actionButton} onPress={() => router.push('/(sevrage)/mon-statut')}>
              <Text style={styles.actionButtonText}>Mon Statut</Text>
            </Pressable>

            <Pressable style={styles.sosButton} onPress={() => router.push('/(sevrage)/sos')}>
              <Text style={styles.sosText}>SOS</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: UnisColors.yellow.medium,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: UnisColors.yellow.medium,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    zIndex: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 38,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: UnisColors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  avatarWrap: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 10,
    borderRadius: 100,

    padding: 4,

  },
  avatar: {
    width: 180,
    height: 180,

    backgroundColor: UnisColors.yellow.medium,
    borderWidth: 0,
    borderColor: UnisColors.white,
  },
  scrollOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 400,
    paddingBottom: 0,
    backgroundColor: 'transparent',
  },
  panel: {
    backgroundColor: UnisColors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 30,
    paddingHorizontal: 24,
    paddingBottom: 800,
    marginBottom: -700,
    gap: 25,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 0,
  },
  dayCard: {
    borderWidth: 2,
    borderColor: UnisColors.purple.dark,
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: UnisColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dayNumber: {
    flex : 1,
    position: 'absolute',
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 25,
    fontSize: 30,
    fontWeight: '800',
    color: UnisColors.purple.dark,
  },
  dayLabel: {
    paddingLeft: 80,
    fontSize: 23,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
  },
  actionButton: {
    backgroundColor: UnisColors.purple.dark,
    borderRadius: 16,
    paddingVertical: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  actionButtonText: {
    color: UnisColors.white,
    fontSize: 23,
    fontFamily: 'Inter',
    fontWeight: '700',
  },
  sosButton: {
    backgroundColor: '#ed4559',
    borderRadius: 18,
    paddingVertical: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  sosText: {
    color: UnisColors.white,
    fontSize: 23,
    fontFamily: 'Inter',
    fontWeight: '800',
  },
});
