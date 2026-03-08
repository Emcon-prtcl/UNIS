/**
 * Simple in-memory store for the daily journal session.
 * Resets each time the user starts a new entry from "Aujourd'hui".
 */

export type DifficultyKey = 'very_easy' | 'manageable' | 'medium' | 'difficult' | 'very_difficult';

export interface JournalEntry {
  glasses: number | null;       // nombre de verres (null = NON)
  difficulty: DifficultyKey | null;
  moods: string[];              // keys from moodOptions
  activity: string | null;      // texte activité (null = Passer/NON)
  notes: string;
}

export const journalStore: JournalEntry = {
  glasses: null,
  difficulty: null,
  moods: [],
  activity: null,
  notes: '',
};

export function resetJournal() {
  journalStore.glasses = null;
  journalStore.difficulty = null;
  journalStore.moods = [];
  journalStore.activity = null;
  journalStore.notes = '';
}
