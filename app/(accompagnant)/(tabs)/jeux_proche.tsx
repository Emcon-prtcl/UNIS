import { UnisColors } from '@/constants/unis-theme';
import React, { useState } from 'react';
import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/* ── données ─────────────────────────────────────────────── */

interface Question {
  text: string;
  answers: string[];
  correct: number;
}

interface Quiz {
  id: string;
  title: string;
  subtitle: string;
  unlocked: boolean;
  questions: Question[];
}

const QUIZZES: Quiz[] = [
  {
    id: '1',
    title: 'Quiz 1',
    subtitle: 'Comprendre la maladie',
    unlocked: true,
    questions: [
      {
        text: "L'alcoolisme est avant tout :",
        answers: ["Un manque de volonté", "Une maladie chronique", "Une mauvaise habitude"],
        correct: 1,
      },
      {
        text: "Le sevrage alcoolique peut être :",
        answers: ["Sans danger", "Légèrement risqué", "Potentiellement dangereux"],
        correct: 2,
      },
      {
        text: "Quel organe est le plus touché par l'alcool ?",
        answers: ["Le cœur", "Le foie", "Les poumons"],
        correct: 1,
      },
    ],
  },
  {
    id: '2',
    title: 'Quiz 2',
    subtitle: 'Mieux réagir au quotidien',
    unlocked: false,
    questions: [],
  },
  {
    id: '3',
    title: 'Quiz 3',
    subtitle: "Repéré les signaux d'alerte",
    unlocked: false,
    questions: [],
  },
  {
    id: '4',
    title: 'Quiz 4',
    subtitle: 'Casser les idées reçues',
    unlocked: false,
    questions: [],
  },
  {
    id: '5',
    title: 'Quiz 5',
    subtitle: 'Comportements à éviter',
    unlocked: false,
    questions: [],
  },
];

/* ── types de vue ────────────────────────────────────────── */
type View = 'list' | 'question';

/* ── screen ──────────────────────────────────────────────── */

export default function JeuxProche() {
  const [modalQuiz, setModalQuiz] = useState<Quiz | null>(null);
  const [currentView, setCurrentView] = useState<View>('list');
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  function handleLaunch() {
    if (!modalQuiz) return;
    setActiveQuiz(modalQuiz);
    setModalQuiz(null);
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setCurrentView('question');
  }

  function handleAnswer(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    if (activeQuiz && idx === activeQuiz.questions[questionIndex].correct) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (!activeQuiz) return;
    if (questionIndex + 1 < activeQuiz.questions.length) {
      setQuestionIndex((i) => i + 1);
      setSelected(null);
    } else {
      setCurrentView('list');
      setActiveQuiz(null);
    }
  }

  /* ── vue question ── */
  if (currentView === 'question' && activeQuiz) {
    const q = activeQuiz.questions[questionIndex];
    return (
      <View style={styles.background}>
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <View style={styles.questionScreen}>
            <Text style={styles.questionCounter}>
              {activeQuiz.title} — Q{questionIndex + 1}/{activeQuiz.questions.length}
            </Text>

            {/* Question box */}
            <View style={styles.questionBox}>
              <Text style={styles.questionText}>{q.text}</Text>
            </View>

            {/* Réponses */}
            <View style={styles.answersBox}>
              {q.answers.map((a, idx) => {
                let bg = UnisColors.purple.light;
                if (selected !== null) {
                  if (idx === q.correct) bg = '#7CDB8A';
                  else if (idx === selected) bg = '#F4879A';
                }
                return (
                  <Pressable
                    key={idx}
                    style={[styles.answerBtn, { backgroundColor: bg }]}
                    onPress={() => handleAnswer(idx)}
                  >
                    <Text style={styles.answerText}>{a}</Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Bouton suivant */}
            {selected !== null && (
              <Pressable style={styles.nextBtn} onPress={handleNext}>
                <Text style={styles.nextBtnText}>
                  {questionIndex + 1 < activeQuiz.questions.length ? 'Question suivante →' : 'Terminer'}
                </Text>
              </Pressable>
            )}
          </View>
        </SafeAreaView>
      </View>
    );
  }

  /* ── vue liste ── */
  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Titre */}
          <Text style={styles.title}>Quiz</Text>

          {/* Image */}
          <View style={styles.imageWrap}>
            <Image
              source={require('@/assets/images/marc_quiz.png')}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>

          {/* Liste des quiz */}
          <View style={styles.quizList}>
            {QUIZZES.map((quiz) => (
              <Pressable
                key={quiz.id}
                style={[styles.quizRow, quiz.unlocked ? styles.quizRowUnlocked : styles.quizRowLocked]}
                onPress={() => quiz.unlocked && setModalQuiz(quiz)}
              >
                {quiz.unlocked ? (
                  <>
                    <Text style={styles.quizRowLabel}>
                      <Text style={styles.quizRowNumber}>{quiz.title}</Text>
                      <Text style={styles.quizRowSep}>  |  </Text>
                      <Text style={styles.quizRowSubtitle}>{quiz.subtitle}</Text>
                    </Text>
                  </>
                ) : (
                  <>
                    <Image
                      source={require('@/assets/images/cadenas_proche2.png')}
                      style={styles.lockIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.quizRowLabelLocked}>{quiz.subtitle}</Text>
                  </>
                )}
              </Pressable>
            ))}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>

      {/* Modal de lancement */}
      <Modal
        visible={modalQuiz !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setModalQuiz(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalQuiz(null)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>{modalQuiz?.title.toUpperCase()}</Text>
            <Text style={styles.modalSubtitle}>{modalQuiz?.subtitle}</Text>
            <Pressable style={styles.launchBtn} onPress={handleLaunch}>
              <Text style={styles.launchBtnText}>Lancer</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

/* ── styles ──────────────────────────────────────────────── */

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: UnisColors.background },
  safeArea: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },

  title: {
    fontSize: 34,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
    textAlign: 'center',
    marginBottom: 8,
  },
  imageWrap: { alignItems: 'center', marginBottom: 16 },
  heroImage: { width: 180, height: 180 },

  /* Liste quiz */
  quizList: { gap: 12 },
  quizRow: {
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quizRowUnlocked: {
    backgroundColor: UnisColors.yellow.light,
  },
  quizRowLocked: {
    backgroundColor: UnisColors.purple.light,
    gap: 12,
  },
  quizRowLabel: {
    fontSize: 16,
    color: UnisColors.purple.dark,
  },
  quizRowNumber: {
    fontWeight: '800',
    fontSize: 16,
    color: UnisColors.purple.dark,
  },
  quizRowSep: {
    color: UnisColors.purple.dark,
    fontWeight: '400',
  },
  quizRowSubtitle: {
    fontWeight: '600',
    fontSize: 16,
    color: UnisColors.purple.dark,
  },
  quizRowLabelLocked: {
    fontSize: 15,
    fontWeight: '600',
    color: UnisColors.purple.dark,
  },
  lockIcon: { width: 22, height: 22 },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: UnisColors.yellow.light,
    borderRadius: 24,
    padding: 32,
    width: '78%',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: '800',
    fontFamily: 'TitleWrap',
    color: UnisColors.purple.dark,
  },
  modalSubtitle: {
    fontSize: 16,
    color: UnisColors.purple.dark,
    textAlign: 'center',
    marginBottom: 8,
  },
  launchBtn: {
    backgroundColor: UnisColors.purple.dark,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 14,
    marginTop: 8,
  },
  launchBtnText: {
    color: UnisColors.white,
    fontWeight: '800',
    fontSize: 18,
  },

  /* Écran question */
  questionScreen: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  questionCounter: {
    fontSize: 14,
    color: UnisColors.purple.medium,
    fontWeight: '600',
    marginBottom: 8,
  },
  questionBox: {
    width: '100%',
    borderWidth: 2,
    borderColor: UnisColors.purple.medium,
    borderRadius: 14,
    padding: 16,
    backgroundColor: UnisColors.white,
  },
  questionText: {
    fontSize: 17,
    fontWeight: '700',
    color: UnisColors.purple.dark,
    textAlign: 'center',
  },
  answersBox: {
    width: '100%',
    borderWidth: 2,
    borderColor: UnisColors.purple.medium,
    borderStyle: 'dashed',
    borderRadius: 14,
    padding: 12,
    gap: 10,
  },
  answerBtn: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  answerText: {
    fontSize: 15,
    fontWeight: '700',
    color: UnisColors.purple.dark,
  },
  nextBtn: {
    backgroundColor: UnisColors.purple.dark,
    borderRadius: 20,
    paddingHorizontal: 32,
    paddingVertical: 14,
    marginTop: 8,
  },
  nextBtnText: {
    color: UnisColors.white,
    fontWeight: '800',
    fontSize: 16,
  },
});