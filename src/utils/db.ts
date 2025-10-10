import { openDB, type IDBPDatabase } from 'idb';
import type {
  GeneratedTest,
  Answer,
  EvaluationResult,
  TestSession,
  HighScore,
} from '../types/Main';

const DB_NAME = 'IELTS_Mock_Exam';
const DB_VERSION = 2;

interface IELTSDatabase {
  settings: {
    key: string;
    value: string;
  };
  tests: {
    key: string;
    value: GeneratedTest;
  };
  answers: {
    key: string;
    value: Answer[];
  };
  results: {
    key: string;
    value: EvaluationResult;
  };
  sessions: {
    key: string;
    value: TestSession;
  };
}

const dbPromise = openDB<IELTSDatabase>(DB_NAME, DB_VERSION, {
  upgrade(db: IDBPDatabase<IELTSDatabase>) {
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
    if (!db.objectStoreNames.contains('sessions')) {
      db.createObjectStore('sessions');
    }
  },
});

/* ---------------- SETTINGS ---------------- */
export async function saveDifficulty(difficulty: string): Promise<void> {
  const db = await dbPromise;
  await db.put('settings', difficulty, 'selectedDifficulty');
}

export async function getDifficulty(): Promise<string | undefined> {
  const db = await dbPromise;
  return db.get('settings', 'selectedDifficulty');
}

/* ---------------- TESTS ---------------- */
export function generateTestKey(examType: string, difficulty: string): string {
  return `${examType}-${difficulty}`;
}

export async function saveTest(
  examType: string,
  difficulty: string,
  testData: GeneratedTest,
): Promise<void> {
  const db = await dbPromise;
  const key = generateTestKey(examType, difficulty);
  await db.put('tests', testData, key);
}

export async function getTest(
  examType: string,
  difficulty: string,
): Promise<GeneratedTest | undefined> {
  const db = await dbPromise;
  const key = generateTestKey(examType, difficulty);
  const test = await db.get('tests', key);
  return test;
}

export async function testExists(examType: string, difficulty: string): Promise<boolean> {
  const test = await getTest(examType, difficulty);
  return test !== undefined;
}

export async function getAllTests(): Promise<GeneratedTest[]> {
  const db = await dbPromise;
  return db.getAll('tests');
}

export async function deleteTest(examType: string, difficulty: string): Promise<void> {
  const db = await dbPromise;
  const key = generateTestKey(examType, difficulty);
  await db.delete('tests', key);
}

export async function getTestsByType(examType: string): Promise<GeneratedTest[]> {
  const allTests = await getAllTests();
  const db = await dbPromise;
  const keys = await db.getAllKeys('tests');

  return allTests.filter((_, index) => {
    const key = keys[index] as string;
    return key.startsWith(`${examType}-`);
  });
}

export async function getTestsByDifficulty(difficulty: string): Promise<GeneratedTest[]> {
  const allTests = await getAllTests();
  const db = await dbPromise;
  const keys = await db.getAllKeys('tests');

  return allTests.filter((_, index) => {
    const key = keys[index] as string;
    return key.endsWith(`-${difficulty}`);
  });
}

/* ---------------- ANSWERS ---------------- */
export async function saveAnswers(id: string, answers: Answer[]): Promise<void> {
  const db = await dbPromise;
  await db.put('answers', answers, id);
}

export async function getAnswers(id: string): Promise<Answer[] | undefined> {
  const db = await dbPromise;
  return db.get('answers', id);
}

export async function deleteAnswers(id: string): Promise<void> {
  const db = await dbPromise;
  await db.delete('answers', id);
}

/* ---------------- RESULTS ---------------- */
export async function saveResults(id: string, results: EvaluationResult): Promise<void> {
  const db = await dbPromise;
  await db.put('results', results, id);
}

export async function getResults(id: string): Promise<EvaluationResult | undefined> {
  const db = await dbPromise;
  return db.get('results', id);
}

export async function getAllResults(): Promise<EvaluationResult[]> {
  const db = await dbPromise;
  return db.getAll('results');
}

export async function deleteResults(id: string): Promise<void> {
  const db = await dbPromise;
  await db.delete('results', id);
}

/* ---------------- TEST SESSIONS ---------------- */
export async function saveSession(id: string, session: TestSession): Promise<void> {
  const db = await dbPromise;
  await db.put('sessions', session, id);
}

export async function getSession(id: string): Promise<TestSession | undefined> {
  const db = await dbPromise;
  return db.get('sessions', id);
}

export async function deleteSession(id: string): Promise<void> {
  const db = await dbPromise;
  await db.delete('sessions', id);
}

export async function getAllSessions(): Promise<TestSession[]> {
  const db = await dbPromise;
  return db.getAll('sessions');
}

/* ---------------- UTILITY ---------------- */
export async function clearAllData(): Promise<void> {
  const db = await dbPromise;
  await db.clear('tests');
  await db.clear('answers');
  await db.clear('results');
  await db.clear('sessions');
}

export async function clearTestsByType(examType: string): Promise<void> {
  const db = await dbPromise;
  const keys = await db.getAllKeys('tests');

  for (const key of keys) {
    if ((key as string).startsWith(`${examType}-`)) {
      await db.delete('tests', key);
    }
  }
}

export async function clearTestsByDifficulty(difficulty: string): Promise<void> {
  const db = await dbPromise;
  const keys = await db.getAllKeys('tests');

  for (const key of keys) {
    if ((key as string).endsWith(`-${difficulty}`)) {
      await db.delete('tests', key);
    }
  }
}

/* ---------------- HIGH SCORES ---------------- */

export async function saveHighScore(examType: string, score: number): Promise<void> {
  const db = await dbPromise;
  // Get existing high score //
  const existingScore = await db.get('results', examType);
  if (!existingScore || score > existingScore.score) {
    const highScore: HighScore = {
      examType,
      score,
      date: new Date().toISOString(),
    };
    await db.put('results', highScore, examType);
  }
}

export async function getHighScore(examType: string): Promise<HighScore | undefined> {
  const db = await dbPromise;
  return db.get('results', examType);
}

export async function clearRecentTestData(examType: string, difficulty: string): Promise<void> {
  const db = await dbPromise;
  const key = generateTestKey(examType, difficulty);

  await db.delete('tests', key);
  await db.delete('answers', key);
  await db.delete('sessions', key);
}
