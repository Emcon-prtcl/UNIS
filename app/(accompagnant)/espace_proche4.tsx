import { UnisColors } from '@/constants/unis-theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Vague from '../../assets/images/Vague.svg';

export default function EspaceProche4() {
  const router = useRouter();
  // Render Vague.svg as a React component
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundWave} pointerEvents="none">
        <Vague style={styles.wave} />
      </View>

      <View style={styles.main}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Ton espace UNIS</Text>

        <View style={styles.list}>
          <TouchableOpacity style={[styles.item, styles.itemPrimary]} activeOpacity={0.85}>
            <Image source={require('../../assets/images/Frame.png')} style={styles.icon} />
            <Text style={[styles.itemText, styles.itemTextPrimary]}>Agir en fonction du statut partagé par le proche</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.item, styles.itemLight]} activeOpacity={0.85}>
            <Image source={require('../../assets/images/Frame-2.png')} style={styles.icon} />
            <Text style={styles.itemText}>Envoyer des messages bienveillants de soutien</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.item, styles.itemPrimary]} activeOpacity={0.85}>
            <Image source={require('../../assets/images/Frame-3.png')} style={styles.icon} />
            <Text style={[styles.itemText, styles.itemTextPrimary]}>Inviter ton proches à faires des activités</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.item, styles.itemLight]} activeOpacity={0.85}>
            <Image source={require('../../assets/images/Frame-4.png')} style={styles.icon} />
            <Text style={styles.itemText}>S'informer sur la maladie et les bonnes pratiques</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.item, styles.itemPrimary]} activeOpacity={0.85}>
            <Image source={require('../../assets/images/Frame-5.png')} style={styles.icon} />
            <Text style={[styles.itemText, styles.itemTextPrimary]}>Des trophées pour célébrer tes avancées</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.item, styles.itemLight]} activeOpacity={0.85}>
            <Image source={require('../../assets/images/Frame-6.png')} style={styles.icon} />
            <Text style={styles.itemText}>Des quizz pour te tester et en apprendre plus sur la maladie</Text>
          </TouchableOpacity>
        </View>

        </ScrollView>
      </View>

      <View style={styles.bottomArea} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.nextButton}
          activeOpacity={0.9}
          onPress={() => {
            router.push('/espace_proche5');
          }}
        >
          <Text style={styles.nextLabel}>Suivant</Text>
          <Text style={styles.nextArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UnisColors.offWhite,
  },
  content: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  main: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 34,
    fontWeight: '700',
    color: UnisColors.purple.dark,
    marginBottom: 18,
  },
  list: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  itemPrimary: {
    backgroundColor: UnisColors.purple.dark,
  },
  itemLight: {
    backgroundColor: UnisColors.purple.light,
  },
  icon: {
    width: 36,
    height: 36,
    marginRight: 12,
    tintColor: UnisColors.white,
  },
  itemText: {
    flex: 1,
    color: '#4A2C66',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
  },
  itemTextPrimary: {
    color: UnisColors.white,
  },
  backgroundWave: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 220,
    zIndex: 0,
  },
  wave: {
    width: '100%',
    height: '100%',
  },
  bottomArea: {
    width: '100%',
    height: 220,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 2,
    overflow: 'hidden',
    pointerEvents: 'box-none',
  },
  nextButton: {
    position: 'absolute',
    bottom: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: UnisColors.yellow.light,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
    width: '90%',
    alignSelf: 'center',
    shadowColor: UnisColors.yellow.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  nextLabel: {
    color: UnisColors.purple.dark,
    fontWeight: '800',
    fontSize: 18,
    marginRight: 12,
  },
  nextArrow: {
    color: UnisColors.purple.dark,
    fontSize: 20,
    fontWeight: '700',
  },
});
