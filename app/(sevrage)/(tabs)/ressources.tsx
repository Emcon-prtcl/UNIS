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

/* ── data ────────────────────────────────────────────────── */

const plaquettes = [
  {
    id: '1',
    title: "L'alcool et la dépression",
    description:
      "Quel est le problème de la consommation d'alcool pour faire face à la dépression ?",
  },
  {
    id: '2',
    title: "L'alcool et le cerveau",
    description: "Comment l'alcool affecte-t-il votre cerveau ?",
  },
  {
    id: '3',
    title: "L'alcool et le foie",
    description: "Quels sont les effets de l'alcool sur votre foie ?",
  },
];

const articles = [
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
  {
    id: '3',
    title: 'Comment être accompagné après votre sevrage ?',
    subtitle: '',
    source: 'Alcool-Info-Service.fr',
    url: 'https://www.alcool-info-service.fr',
  },
  {
    id: '4',
    title: "Dépendance à l'alcool : comment arrêter de boire",
    subtitle: '',
    source: 'Alcool-Info-Service.fr',
    url: 'https://www.alcool-info-service.fr',
  },
  {
    id: '5',
    title: "Prise en charge de l'entourage d'une personne dépendante à l'alcool",
    subtitle: '',
    source: 'France-assos-sante.org',
    url: 'https://www.france-assos-sante.org',
  },
];

/* ── components ──────────────────────────────────────────── */

function PlaquetteCard({ title, description }: { title: string; description: string }) {
  return (
    <Pressable style={styles.plaquetteCard}>
      <Text style={styles.plaquetteTitle}>{title}</Text>
      <Text style={styles.plaquetteDesc}>{description}</Text>
    </Pressable>
  );
}

function ArticleCard({
  title,
  subtitle,
  source,
  url,
}: {
  title: string;
  subtitle: string;
  source: string;
  url: string;
}) {
  return (
    <Pressable style={styles.articleCard} onPress={() => Linking.openURL(url)}>
      <Text style={styles.articleTitle}>{title}</Text>
      {subtitle ? <Text style={styles.articleSubtitle}>{subtitle}</Text> : null}
      <Text style={styles.articleSource}>{source}</Text>
    </Pressable>
  );
}

/* ── main screen ─────────────────────────────────────────── */

export default function RessourcesScreen() {
  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── header ── */}
          <View style={styles.headerBox}>
            <View style={styles.headerLine} />
            <Text style={styles.title}>Ressources</Text>
            <View style={styles.headerLine} />
          </View>

          {/* ── book image ── */}
          <Image
            source={require('@/assets/images/Livre_Ouvert.png')}
            style={styles.bookImage}
            resizeMode="contain"
          />

          {/* ── shadow oval ── */}
          <View style={styles.shadow} />

          {/* ── plaquettes éducatives ── */}
          <Text style={styles.sectionTitle}>Plaquettes éducatives</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.plaquetteRow}
          >
            {plaquettes.map((p) => (
              <PlaquetteCard key={p.id} title={p.title} description={p.description} />
            ))}
          </ScrollView>

          {/* ── articles à lire ── */}
          <Text style={styles.sectionTitle}>Articles à lire</Text>
          {articles.map((a) => (
            <ArticleCard
              key={a.id}
              title={a.title}
              subtitle={a.subtitle}
              source={a.source}
              url={a.url}
            />
          ))}

          <View style={{ height: 32 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

/* ── styles ──────────────────────────────────────────────── */

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: UnisColors.background },
  safeArea: { flex: 1 },
  scrollContent: { paddingBottom: 16 },

  /* header */
  headerBox: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerLine: {
    width: '80%',
    height: 3,
    borderRadius: 2,
    backgroundColor: UnisColors.purple.dark,
    marginVertical: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
  },

  /* book */
  bookImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 8,
  },
  shadow: {
    width: 120,
    height: 16,
    borderRadius: 60,
    backgroundColor: 'rgba(0,0,0,0.08)',
    alignSelf: 'center',
    marginTop: -8,
    marginBottom: 16,
  },

  /* section */
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
    marginLeft: 16,
    marginBottom: 12,
    marginTop: 8,
  },

  /* plaquettes */
  plaquetteRow: {
    paddingLeft: 16,
    paddingRight: 16,
    gap: 12,
    marginBottom: 20,
  },
  plaquetteCard: {
    width: 200,
    backgroundColor: UnisColors.purple.dark,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    gap: 8,
  },
  plaquetteTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: UnisColors.yellow.medium,
  },
  plaquetteDesc: {
    fontSize: 13,
    fontFamily: 'Inter',
    color: UnisColors.white,
    lineHeight: 18,
  },

  /* articles */
  articleCard: {
    backgroundColor: UnisColors.yellow.medium,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 4,
  },
  articleTitle: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
  },
  articleSubtitle: {
    fontSize: 13,
    fontFamily: 'Inter',
    color: UnisColors.purple.dark,
  },
  articleSource: {
    fontSize: 13,
    fontFamily: 'Inter',
    color: UnisColors.purple.medium,
    marginTop: 2,
  },
});
