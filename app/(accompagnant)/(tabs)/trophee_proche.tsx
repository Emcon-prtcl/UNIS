import { UnisColors } from '@/constants/unis-theme';
import React from 'react';
import {
    Image,
    ImageSourcePropType,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Trophy {
  id: string;
  label: string;
  image: ImageSourcePropType;
  unlocked: boolean;
}

const cadena = require('@/assets/images/cadenas_proche.png');

const lockedTrophy = (id: string): Trophy => ({
  id,
  label: '',
  image: cadena,
  unlocked: false,
});

const buildLocked = (count: number, prefix: string): Trophy[] =>
  Array.from({ length: count }, (_, i) => lockedTrophy(`${prefix}_locked_${i}`));

const relationnelTrophies: Trophy[] = [
  { id: 'rel_1', label: '1er défi lancé', image: require('@/assets/images/succes1_relationnel_proche.png'), unlocked: true },
  { id: 'rel_2', label: '1er défi accepté', image: require('@/assets/images/succes2_proche.png'), unlocked: true },
  { id: 'rel_3', label: '1er jeu duo', image: require('@/assets/images/succes3_proche.png'), unlocked: true },
  ...buildLocked(10, 'rel'),
];

const ressourcesTrophies: Trophy[] = [
  { id: 'res_1', label: '1 article lu', image: require('@/assets/images/articlelu1_proche.png'), unlocked: true },
  { id: 'res_2', label: '3 articles lus', image: require('@/assets/images/articlelu3_proche.png'), unlocked: true },
  ...buildLocked(9, 'res'),
];

function TrophyItem({ trophy }: { trophy: Trophy }) {
  if (!trophy.unlocked) {
    return (
      <View style={styles.lockedItem}>
        <Image source={trophy.image} style={styles.lockedIcon} resizeMode="contain" />
      </View>
    );
  }
  return (
    <View style={styles.trophyItem}>
      <View style={styles.trophyCircle}>
        <Image source={trophy.image} style={styles.trophyIcon} resizeMode="contain" />
      </View>
    </View>
  );
}

function CategorySection({ title, trophies, barColor }: { title: string; trophies: Trophy[]; barColor: string }) {
  return (
    <View style={styles.categoryWrapper}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <View style={[styles.categoryBar, { backgroundColor: barColor }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.trophyRow}
        >
          {trophies.map((t) => (
            <TrophyItem key={t.id} trophy={t} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default function TropheesScreen() {
  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Trophées</Text>

          <Image
            source={require('@/assets/images/trophee_proche_gros.png')}
            style={styles.bigTrophy}
            resizeMode="contain"
          />

          <TouchableOpacity style={styles.reussitesBtn} activeOpacity={0.8}>
            <Text style={styles.reussitesBtnText}>Mes réussites</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <CategorySection
            title="Relationnel"
            trophies={relationnelTrophies}
            barColor={UnisColors.yellow.light}
          />

          <CategorySection
            title="Ressources & connaissances"
            trophies={ressourcesTrophies}
            barColor="#F48FB1"
          />

          <View style={{ height: 32 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const TROPHY_SIZE = 62;
const CADENA_SIZE = 44;

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: UnisColors.background },
  safeArea: { flex: 1 },
  scrollContent: { alignItems: 'center', paddingBottom: 16 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
    marginTop: 12,
    marginBottom: 8,
  },
  bigTrophy: { width: 180, height: 180, marginVertical: 8 },
  reussitesBtn: {
    backgroundColor: UnisColors.purple.dark,
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 12,
    marginTop: 8,
    marginBottom: 12,
  },
  reussitesBtnText: { color: UnisColors.white, fontSize: 16, fontWeight: '700', fontFamily: 'Inter' },
  divider: { width: '60%', height: 3, borderRadius: 2, backgroundColor: UnisColors.yellow.medium, marginBottom: 16 },
  categoryWrapper: { width: '100%', paddingHorizontal: 16, marginBottom: 12 },
  categoryTitle: { fontSize: 18, fontWeight: '700', fontFamily: 'TitleWrap', color: UnisColors.purple.dark, marginBottom: 8 },
  categoryBar: { borderRadius: 20, paddingVertical: 12, paddingHorizontal: 10 },
  trophyRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  trophyItem: { alignItems: 'center', justifyContent: 'center' },
  trophyCircle: {
    width: TROPHY_SIZE,
    height: TROPHY_SIZE,
    borderRadius: TROPHY_SIZE / 2,
    backgroundColor: UnisColors.purple.dark,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  trophyIcon: { width: TROPHY_SIZE - 6, height: TROPHY_SIZE - 6 },
  lockedItem: { alignItems: 'center', justifyContent: 'center', width: CADENA_SIZE, height: TROPHY_SIZE },
  lockedIcon: { width: CADENA_SIZE, height: CADENA_SIZE },
});