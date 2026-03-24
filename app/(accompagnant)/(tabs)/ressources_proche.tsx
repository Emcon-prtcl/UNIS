import { UnisColors } from '@/constants/unis-theme';
import React from 'react';
import {
    Image,
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/* ── données ─────────────────────────────────────────────── */

const PLAQUETTES = [
  {
    id: '1',
    title: "L'alcool et la dépression",
    description: "Quel est le problème de la consommation d'alcool pour faire face à la dépression ?",
  },
  {
    id: '2',
    title: "L'alcool et le cerveau",
    description: "Comment l'alcool affecte votre cerveau ?",
  },
  {
    id: '3',
    title: "L'alcool et le sommeil",
    description: "Pourquoi l'alcool perturbe votre sommeil ?",
  },
];

const ARTICLES = [
  {
    id: '1',
    title: 'Alcool & Santé',
    subtitle: 'Lutter contre un fardeau à multiples visages',
    source: 'Inserm.fr',
    url: 'https://www.inserm.fr',
  },
  {
    id: '2',
    title: 'Sevrage : ce qu\'il faut savoir pour mieux vous préparer',
    subtitle: '',
    source: 'Alcool-Info-Service.fr',
    url: 'https://www.alcool-info-service.fr',
  },
];

/* ── composants ──────────────────────────────────────────── */

function PlaquetteCard({ title, description }: { title: string; description: string }) {
  return (
    <Pressable style={styles.plaquetteCard}>
      <Text style={styles.plaquetteTitle}>{title}</Text>
      <Text style={styles.plaquetteDesc}>{description}</Text>
    </Pressable>
  );
}

function ArticleCard({ title, subtitle, source, url }: { title: string; subtitle: string; source: string; url: string }) {
  return (
    <Pressable style={styles.articleCard} onPress={() => Linking.openURL(url)}>
      <Text style={styles.articleTitle}>{title}</Text>
      {subtitle ? <Text style={styles.articleSubtitle}>{subtitle}</Text> : null}
      <Text style={styles.articleSource}>{source}</Text>
    </Pressable>
  );
}

/* ── screen ──────────────────────────────────────────────── */

export default function RessourcesProche() {
  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Titre */}
          <Text style={styles.title}>Ressources</Text>

          {/* Image livre + ampoule */}
          <View style={styles.imageWrap}>
            <Image
              source={require('@/assets/images/livre_gros.png')}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>

          {/* Section plaquettes */}
          <Text style={styles.sectionTitle}>Plaquettes éducatives</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.plaquetteRow}
            style={styles.plaquetteScroll}
          >
            {PLAQUETTES.map((p) => (
              <PlaquetteCard key={p.id} title={p.title} description={p.description} />
            ))}
          </ScrollView>

          {/* Section articles */}
          <Text style={styles.sectionTitle}>Articles à lire</Text>
          <View style={styles.articleList}>
            {ARTICLES.map((a) => (
              <ArticleCard key={a.id} title={a.title} subtitle={a.subtitle} source={a.source} url={a.url} />
            ))}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

/* ── styles ──────────────────────────────────────────────── */

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
    paddingTop: 8,
  },

  title: {
    fontSize: 34,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
    textAlign: 'center',
    marginBottom: 8,
  },

  imageWrap: {
    alignItems: 'center',
    marginBottom: 8,
  },
  heroImage: {
    width: 220,
    height: 200,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
    marginTop: 16,
    marginBottom: 12,
  },

  /* Plaquettes */
  plaquetteScroll: {
    marginHorizontal: -20,
  },
  plaquetteRow: {
    paddingHorizontal: 20,
    gap: 12,
    paddingRight: 32,
  },
  plaquetteCard: {
    width: 180,
    backgroundColor: UnisColors.purple.medium,
    borderRadius: 18,
    padding: 16,
    justifyContent: 'flex-start',
  },
  plaquetteTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: UnisColors.white,
    marginBottom: 8,
  },
  plaquetteDesc: {
    fontSize: 13,
    color: UnisColors.white,
    opacity: 0.9,
    lineHeight: 18,
  },

  /* Articles */
  articleList: {
    gap: 12,
  },
  articleCard: {
    backgroundColor: UnisColors.yellow.light,
    borderRadius: 18,
    padding: 18,
  },
  articleTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: UnisColors.purple.dark,
    marginBottom: 2,
  },
  articleSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: UnisColors.purple.dark,
    marginBottom: 6,
  },
  articleSource: {
    fontSize: 13,
    color: UnisColors.purple.medium,
    fontWeight: '600',
  },
});