import { useEffect, useState } from 'react';
import { saveDifficulty, getDifficulty } from '../utils/db';

export function useDifficulty(defaultValue: string | null = null) {
  const [difficulty, setDifficulty] = useState<string | null>(defaultValue);

  useEffect(() => {
    (async () => {
      const stored = await getDifficulty();
      if (stored) setDifficulty(stored);
    })();
  }, []);

  const updateDifficulty = (newDiff: string) => {
    setDifficulty(newDiff);
    saveDifficulty(newDiff);
  };

  return { difficulty, updateDifficulty };
}
