import { openDB } from 'idb';

const DB_NAME = 'IELTS_Mock_Exam';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('settings')) {
      db.createObjectStore('settings');
    }
    if (!db.objectStoreNames.contains('tests')) {
      db.createObjectStore('tests');
    }
    if (!db.objectStoreNames.contains('answers')) {
      db.createObjectStore('answers');
    }
    if (!db.objectStoreNames.contains('results')) {
      db.createObjectStore('results');
    }
  },
});

/* ---------------- SETTINGS ---------------- */
export async function saveDifficulty(difficulty: string) {
  const db = await dbPromise;
  await db.put('settings', difficulty, 'selectedDifficulty');
}

export async function getDifficulty(): Promise<string | null> {
  const db = await dbPromise;
  return db.get('settings', 'selectedDifficulty');
}

/* ---------------- TESTS ---------------- */
export async function saveTest(id: string, testData: unknown) {
  const db = await dbPromise;
  await db.put('tests', testData, id);
}

export async function getTest(id: string) {
  const db = await dbPromise;
  return db.get('tests', id);
}

/* ---------------- ANSWERS ---------------- */
export async function saveAnswers(id: string, answers: unknown) {
  const db = await dbPromise;
  await db.put('answers', answers, id);
}

export async function getAnswers(id: string) {
  const db = await dbPromise;
  return db.get('answers', id);
}

/* ---------------- RESULTS ---------------- */
export async function saveResults(id: string, results: unknown) {
  const db = await dbPromise;
  await db.put('results', results, id);
}

export async function getResults(id: string) {
  const db = await dbPromise;
  return db.get('results', id);
}
