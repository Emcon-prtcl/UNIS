import { API_URL } from '@/constants/config';
import { getAuthToken } from '@/store/auth';
import { DifficultyKey, JournalEntry } from '@/store/journal';

export interface JournalPayload {
  glasses: number | null;
  difficulty: DifficultyKey | null;
  moods: string[];
  activity: string | null;
  notes: string;
}

export interface JournalApiEntry {
  id: number;
  date: string;
  motivation: string;
  noteLibre: string;
  idMalade: number | null;
  glasses: number | null;
  difficulty: string | null;
  moods: string[];
  activity: string | null;
  notes: string;
  raw: any;
}

function getAuthHeaders() {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Aucun token JWT disponible.');
  }

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

function getFieldFromNoteLibre(noteLibre: string, label: string): string {
  const pattern = new RegExp(`^${label}:\\s*(.*)$`, 'mi');
  const match = noteLibre.match(pattern);
  return match?.[1]?.trim() || '';
}

function buildStructuredNoteLibre(payload: JournalPayload | JournalEntry): string {
  const notes = payload.notes?.trim() || '';
  const verres = typeof payload.glasses === 'number' ? String(payload.glasses) : '';
  const humeurs = payload.moods.length > 0 ? payload.moods.join(', ') : '';
  const activite = payload.activity?.trim() || '';

  return [
    `Notes: ${notes}`,
    `Verres: ${verres}`,
    `Humeurs: ${humeurs}`,
    `Activite: ${activite}`,
  ].join('\n');
}

function toApiBody(payload: JournalPayload | JournalEntry) {
  const mappedDifficulty = payload.difficulty ?? '';
  const mappedMotivation = payload.moods.length > 0
    ? payload.moods.join(', ')
    : (payload.activity?.trim() || '');

  return {
    difficulte: mappedDifficulty,
    motivation: mappedMotivation,
    note_libre: buildStructuredNoteLibre(payload),
  };
}

function toJournalApiEntry(item: any): JournalApiEntry {
  const id =
    item?.id_journal ??
    item?.idJournal ??
    item?.journalId ??
    item?.id ??
    0;

  const date =
    item?.date_journal ??
    item?.dateJournal ??
    item?.date ??
    item?.created_at ??
    item?.createdAt ??
    new Date().toISOString();

  const motivation =
    item?.motivation ??
    '';

  const noteLibre =
    item?.note_libre ??
    item?.noteLibre ??
    '';

  const parsedNotes = getFieldFromNoteLibre(noteLibre, 'Notes');
  const parsedVerres = getFieldFromNoteLibre(noteLibre, 'Verres');
  const parsedHumeurs = getFieldFromNoteLibre(noteLibre, 'Humeurs');
  const parsedActivite = getFieldFromNoteLibre(noteLibre, 'Activite');

  const idMalade =
    item?.id_malade ??
    item?.idMalade ??
    null;

  const glasses =
    item?.verres ??
    item?.glasses ??
    item?.consommation ??
    (parsedVerres ? Number(parsedVerres) : null);

  const difficulty =
    item?.difficulte ??
    item?.difficulty ??
    null;

  const moods =
    item?.humeurs ??
    item?.moods ??
    (parsedHumeurs
      ? parsedHumeurs.split(',').map((m: string) => m.trim()).filter(Boolean)
      : []);

  const activity =
    item?.activite ??
    item?.activity ??
    (parsedActivite || null);

  const notes =
    parsedNotes ||
    item?.note_libre ||
    item?.noteLibre ||
    item?.notes ||
    '';

  return {
    id: typeof id === 'number' ? id : Number(id) || 0,
    date: typeof date === 'string' ? date : String(date),
    motivation: typeof motivation === 'string' ? motivation : '',
    noteLibre: typeof noteLibre === 'string' ? noteLibre : '',
    idMalade: typeof idMalade === 'number' ? idMalade : Number.isNaN(Number(idMalade)) ? null : Number(idMalade),
    glasses: typeof glasses === 'number' ? glasses : null,
    difficulty: typeof difficulty === 'string' ? difficulty : null,
    moods: Array.isArray(moods) ? moods : [],
    activity: typeof activity === 'string' ? activity : null,
    notes: typeof notes === 'string' ? notes : '',
    raw: item,
  };
}

function normalizeListPayload(data: any): any[] {
  if (Array.isArray(data)) {
    return data;
  }
  if (Array.isArray(data?.journaux)) {
    return data.journaux;
  }
  if (Array.isArray(data?.data)) {
    return data.data;
  }
  if (Array.isArray(data?.items)) {
    return data.items;
  }
  return [];
}

export async function createMyJournal(payload: JournalPayload | JournalEntry): Promise<JournalApiEntry> {
  const response = await fetch(`${API_URL}/malades/me/journaux`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(toApiBody(payload)),
  });

  if (!response.ok) {
    throw new Error(`Création du journal impossible (${response.status}).`);
  }

  const data = await response.json();
  return toJournalApiEntry(data?.journal ?? data?.data ?? data);
}

export async function listMyJournals(): Promise<JournalApiEntry[]> {
  const response = await fetch(`${API_URL}/malades/me/journaux`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Lecture des journaux impossible (${response.status}).`);
  }

  const data = await response.json();
  const items = normalizeListPayload(data);
  return items.map(toJournalApiEntry);
}

export async function getTodayJournal(): Promise<JournalApiEntry | null> {
  const response = await fetch(`${API_URL}/malades/me/journaux/today`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Lecture du journal du jour impossible (${response.status}).`);
  }

  const data = await response.json();
  return toJournalApiEntry(data?.journal ?? data?.data ?? data);
}

export async function getMyJournalById(journalId: number): Promise<JournalApiEntry> {
  const response = await fetch(`${API_URL}/malades/me/journaux/${journalId}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Lecture du journal #${journalId} impossible (${response.status}).`);
  }

  const data = await response.json();
  return toJournalApiEntry(data?.journal ?? data?.data ?? data);
}

export async function updateMyJournal(journalId: number, payload: JournalPayload | JournalEntry): Promise<JournalApiEntry> {
  const response = await fetch(`${API_URL}/malades/me/journaux/${journalId}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(toApiBody(payload)),
  });

  if (!response.ok) {
    throw new Error(`Mise à jour du journal #${journalId} impossible (${response.status}).`);
  }

  const data = await response.json();
  return toJournalApiEntry(data?.journal ?? data?.data ?? data);
}
