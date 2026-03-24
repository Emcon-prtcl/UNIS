import { AvatarConfig, useAvatar } from '@/constants/Avatarcontent';
import AvatarSvg from '@/constants/AvatarSVG';
import { UnisColors } from '@/constants/unis-theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Tab = 'coiffure' | 'cheveux' | 'peau' | 'yeux' | 'visage' | 'attributs' | 'vetements';

const HAIR_STYLES = [
  { label: 'Chauve', value: 0 },
  { label: 'Court', value: 1 },
  { label: 'Mi-long', value: 2 },
  { label: 'Long', value: 3 },
  { label: 'Chignon', value: 4 },
  { label: 'Afro', value: 5 },
  { label: 'Tresses', value: 6 },
  { label: 'Bouclé', value: 7 },
];

const HAIR_COLORS = [
  '#0d0d0d', '#3b1f0e', '#7b4a1e', '#c8832a',
  '#e8c068', '#c0392b', '#bdc3c7', '#f0f0f0',
];

const SKIN_COLORS = [
  '#FDDBB4', '#F5C48A', '#E8B88A', '#D08B5B',
  '#C8832A', '#AE5D29', '#7A4520', '#3B1A08',
];

const EYE_COLORS = [
  '#5C3A1E', '#2E4057', '#3D7A3E', '#7B4F2E',
  '#1A1A2E', '#6B4226', '#4A7C59', '#8B6914',
];

const EYE_STYLES = [
  { label: 'Normal', value: 0 },
  { label: 'Heureux', value: 1 },
  { label: 'Triste', value: 2 },
  { label: "Clin d'œil", value: 3 },
];

const EYEBROW_STYLES = [
  { label: 'Naturel', value: 0 },
  { label: 'Arqué', value: 1 },
  { label: 'Froncé', value: 2 },
  { label: 'Épais', value: 3 },
];

const NOSE_STYLES = [
  { label: 'Discret', value: 0 },
  { label: 'Moyen', value: 1 },
  { label: 'Large', value: 2 },
];

const MOUTH_STYLES = [
  { label: 'Sourire', value: 0 },
  { label: 'Grand sourire', value: 1 },
  { label: 'Léger', value: 2 },
  { label: 'Neutre', value: 3 },
  { label: 'Triste', value: 4 },
];

const FACIAL_HAIR_STYLES = [
  { label: 'Aucun', value: 0 },
  { label: 'Barbe courte', value: 1 },
  { label: 'Barbe complète', value: 2 },
  { label: 'Moustache fine', value: 3 },
  { label: 'Moustache épaisse', value: 4 },
];

const ACCESSORY_STYLES = [
  { label: 'Aucun', value: 0 },
  { label: 'Lunettes rondes', value: 1 },
  { label: 'Lunettes carrées', value: 2 },
  { label: 'Lunettes de soleil', value: 3 },
  { label: 'Chapeau', value: 4 },
];

const CLOTHE_COLORS = [
  '#6B21A8', '#1D4ED8', '#15803D', '#B91C1C',
  '#B45309', '#0E7490', '#1A1A1A', '#6B7280',
  '#DB2777', '#EA580C', '#065F46', '#1E3A5F',
];

// ─── Sous-composants ──────────────────────────────────────────────────────────

function ColorSwatch({ color, selected, onPress }: {
  color: string; selected: boolean; onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.swatch, selected && styles.swatchSelected]}>
      <View style={[styles.swatchInner, { backgroundColor: color }]} />
    </TouchableOpacity>
  );
}

function OptionTile({ label, selected, onPress, previewConfig }: {
  label: string;
  selected: boolean;
  onPress: () => void;
  previewConfig: AvatarConfig;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.tile, selected && styles.tileSelected]}>
      <AvatarSvg config={previewConfig} size={68} />
      <Text style={[styles.tileLabel, selected && styles.tileLabelSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─── Écran principal ──────────────────────────────────────────────────────────

export default function EditAvatarScreen() {
  const router = useRouter();
  const { avatarConfig, setAvatarConfig } = useAvatar();
  const [draft, setDraft] = useState<AvatarConfig>({ ...avatarConfig });
  const [activeTab, setActiveTab] = useState<Tab>('coiffure');

  const update = (patch: Partial<AvatarConfig>) => setDraft((d) => ({ ...d, ...patch }));

  const handleValidate = () => {
    setAvatarConfig(draft);
    router.back();
  };

  const TABS: { key: Tab; label: string }[] = [
    { key: 'coiffure',  label: 'Coiffure'  },
    { key: 'cheveux',   label: 'Cheveux'   },
    { key: 'peau',      label: 'Peau'      },
    { key: 'yeux',      label: 'Yeux'      },
    { key: 'visage',    label: 'Visage'    },
    { key: 'attributs', label: 'Attributs' },
    { key: 'vetements', label: 'Vêtements' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crée ton perso</Text>
      </View>

      {/* Preview */}
      <View style={styles.previewWrap}>
        <AvatarSvg config={draft} size={130} />
      </View>

      {/* Tabs scrollables */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScroll}
        contentContainerStyle={styles.tabContent}
      >
        {TABS.map((t) => (
          <TouchableOpacity
            key={t.key}
            onPress={() => setActiveTab(t.key)}
            style={[styles.tab, activeTab === t.key && styles.tabActive]}
          >
            <Text style={[styles.tabLabel, activeTab === t.key && styles.tabLabelActive]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Options */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Coiffure */}
        {activeTab === 'coiffure' && (
          <View style={styles.grid3}>
            {HAIR_STYLES.map((h) => (
              <OptionTile
                key={h.value}
                label={h.label}
                selected={draft.hairStyle === h.value}
                onPress={() => update({ hairStyle: h.value })}
                previewConfig={{ ...draft, hairStyle: h.value }}
              />
            ))}
          </View>
        )}

        {/* Cheveux */}
        {activeTab === 'cheveux' && (
          <>
            <Text style={styles.sectionLabel}>Couleur des cheveux</Text>
            <View style={styles.colorGrid}>
              {HAIR_COLORS.map((c) => (
                <ColorSwatch key={c} color={c} selected={draft.hairColor === c}
                  onPress={() => update({ hairColor: c })} />
              ))}
            </View>
            <Text style={styles.sectionLabel}>Couleur barbe / moustache</Text>
            <View style={styles.colorGrid}>
              {HAIR_COLORS.map((c) => (
                <ColorSwatch key={c} color={c} selected={draft.facialHairColor === c}
                  onPress={() => update({ facialHairColor: c })} />
              ))}
            </View>
          </>
        )}

        {/* Peau */}
        {activeTab === 'peau' && (
          <>
            <Text style={styles.sectionLabel}>Couleur de peau</Text>
            <View style={styles.colorGrid}>
              {SKIN_COLORS.map((c) => (
                <ColorSwatch key={c} color={c} selected={draft.skinColor === c}
                  onPress={() => update({ skinColor: c })} />
              ))}
            </View>
          </>
        )}

        {/* Yeux */}
        {activeTab === 'yeux' && (
          <>
            <Text style={styles.sectionLabel}>Style des yeux</Text>
            <View style={styles.grid3}>
              {EYE_STYLES.map((e) => (
                <OptionTile key={e.value} label={e.label}
                  selected={draft.eyeStyle === e.value}
                  onPress={() => update({ eyeStyle: e.value })}
                  previewConfig={{ ...draft, eyeStyle: e.value }} />
              ))}
            </View>
            <Text style={styles.sectionLabel}>Couleur des yeux</Text>
            <View style={styles.colorGrid}>
              {EYE_COLORS.map((c) => (
                <ColorSwatch key={c} color={c} selected={draft.eyeColor === c}
                  onPress={() => update({ eyeColor: c })} />
              ))}
            </View>
            <Text style={styles.sectionLabel}>Sourcils</Text>
            <View style={styles.grid3}>
              {EYEBROW_STYLES.map((e) => (
                <OptionTile key={e.value} label={e.label}
                  selected={draft.eyebrowStyle === e.value}
                  onPress={() => update({ eyebrowStyle: e.value })}
                  previewConfig={{ ...draft, eyebrowStyle: e.value }} />
              ))}
            </View>
          </>
        )}

        {/* Visage */}
        {activeTab === 'visage' && (
          <>
            <Text style={styles.sectionLabel}>Nez</Text>
            <View style={styles.grid3}>
              {NOSE_STYLES.map((n) => (
                <OptionTile key={n.value} label={n.label}
                  selected={draft.noseStyle === n.value}
                  onPress={() => update({ noseStyle: n.value })}
                  previewConfig={{ ...draft, noseStyle: n.value }} />
              ))}
            </View>
            <Text style={styles.sectionLabel}>Bouche</Text>
            <View style={styles.grid3}>
              {MOUTH_STYLES.map((m) => (
                <OptionTile key={m.value} label={m.label}
                  selected={draft.mouthStyle === m.value}
                  onPress={() => update({ mouthStyle: m.value })}
                  previewConfig={{ ...draft, mouthStyle: m.value }} />
              ))}
            </View>
          </>
        )}

        {/* Attributs */}
        {activeTab === 'attributs' && (
          <>
            <Text style={styles.sectionLabel}>Pilosité faciale</Text>
            <View style={styles.grid3}>
              {FACIAL_HAIR_STYLES.map((f) => (
                <OptionTile key={f.value} label={f.label}
                  selected={draft.facialHairStyle === f.value}
                  onPress={() => update({ facialHairStyle: f.value })}
                  previewConfig={{ ...draft, facialHairStyle: f.value }} />
              ))}
            </View>
            <Text style={styles.sectionLabel}>Accessoires</Text>
            <View style={styles.grid3}>
              {ACCESSORY_STYLES.map((a) => (
                <OptionTile key={a.value} label={a.label}
                  selected={draft.accessoryStyle === a.value}
                  onPress={() => update({ accessoryStyle: a.value })}
                  previewConfig={{ ...draft, accessoryStyle: a.value }} />
              ))}
            </View>
          </>
        )}

        {/* Vêtements */}
        {activeTab === 'vetements' && (
          <>
            <Text style={styles.sectionLabel}>Couleur des vêtements</Text>
            <View style={styles.colorGrid}>
              {CLOTHE_COLORS.map((c) => (
                <ColorSwatch key={c} color={c} selected={draft.clotheColor === c}
                  onPress={() => update({ clotheColor: c })} />
              ))}
            </View>
          </>
        )}
      </ScrollView>

      {/* Valider */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.validateBtn} onPress={handleValidate}>
          <Text style={styles.validateLabel}>Valider</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:          { flex: 1, backgroundColor: '#FDF8EC' },
  header:             { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8, gap: 12 },
  backArrow:          { fontSize: 22, color: UnisColors.purple.dark },
  headerTitle:        { fontSize: 20, fontWeight: '800', color: UnisColors.purple.dark },
  previewWrap:        { alignItems: 'center', paddingVertical: 12 },
  tabScroll:          { flexGrow: 0, marginBottom: 12 },
  tabContent:         { paddingHorizontal: 16, gap: 8, flexDirection: 'row' },
  tab:                { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, borderWidth: 2, borderColor: UnisColors.purple.dark, backgroundColor: '#FDF8EC' },
  tabActive:          { backgroundColor: UnisColors.purple.dark },
  tabLabel:           { fontSize: 13, fontWeight: '600', color: UnisColors.purple.dark },
  tabLabelActive:     { color: '#fff' },
  scroll:             { flex: 1 },
  scrollContent:      { paddingHorizontal: 16, paddingBottom: 24 },
  sectionLabel:       { fontSize: 15, fontWeight: '700', color: UnisColors.purple.dark, marginBottom: 10, marginTop: 12 },
  grid3:              { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  tile:               { alignItems: 'center', borderRadius: 12, borderWidth: 2, borderColor: 'transparent', padding: 6, width: 92 },
  tileSelected:       { borderColor: UnisColors.purple.dark, backgroundColor: UnisColors.purple.light },
  tileLabel:          { fontSize: 11, color: UnisColors.purple.dark, marginTop: 4, textAlign: 'center' },
  tileLabelSelected:  { fontWeight: '700' },
  colorGrid:          { flexDirection: 'row', flexWrap: 'wrap', gap: 14, justifyContent: 'center', paddingVertical: 8 },
  swatch:             { width: 52, height: 52, borderRadius: 26, borderWidth: 3, borderColor: 'transparent', padding: 3 },
  swatchSelected:     { borderColor: UnisColors.purple.dark },
  swatchInner:        { flex: 1, borderRadius: 22 },
  footer:             { padding: 16, paddingBottom: 24 },
  validateBtn:        { backgroundColor: '#F5C842', borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  validateLabel:      { fontSize: 18, fontWeight: '800', color: UnisColors.purple.dark },
});