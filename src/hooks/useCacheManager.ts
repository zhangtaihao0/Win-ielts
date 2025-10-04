import { useState } from 'react';
import { clearAllData, deleteTest } from '../utils/db';

interface UseCacheManagerProps {
  onCacheUpdate?: () => Promise<void>;
}

interface UseCacheManagerReturn {
  clearing: boolean;
  deletingSingle: boolean;
  handleClearCache: () => Promise<void>;
  handleDeleteCurrentTest: (examType: string, difficulty: string) => Promise<void>;
}

export const useCacheManager = (props?: UseCacheManagerProps): UseCacheManagerReturn => {
  const [clearing, setClearing] = useState(false);
  const [deletingSingle, setDeletingSingle] = useState(false);

  // Clear All Cache //
  const handleClearCache = async () => {
    const confirmed = window.confirm(
      'This will clear all tests, answers, and results. Are you sure?',
    );
    if (!confirmed) return;
    setClearing(true);
    try {
      await clearAllData();
      if (props?.onCacheUpdate) {
        await props.onCacheUpdate();
      }
      alert('✅ Tests cleared successfully! Generate a new test to see fresh data.');
    } catch (err) {
      console.error('Error clearing cache:', err);
      alert('❌ Failed to clear');
    } finally {
      setClearing(false);
    }
  };

  // Delete Specific Test // 
  const handleDeleteCurrentTest = async (examType: string, difficulty: string) => {
    if (!examType || !difficulty) return;
    const confirmed = window.confirm(
      `Deleted test for ${examType} (${difficulty})? You'll need to generate a new one.`,
    );
    if (!confirmed) return;
    setDeletingSingle(true);
    try {
      await deleteTest(examType, difficulty);
      if (props?.onCacheUpdate) {
        await props.onCacheUpdate();
      }
      alert(`✅ ${examType} (${difficulty}) test deleted successfully!`);
    } catch (err) {
      console.error('Error deleting test:', err);
      alert('❌ Failed to delete test');
    } finally {
      setDeletingSingle(false);
    }
  };

  return {
    clearing,
    deletingSingle,
    handleClearCache,
    handleDeleteCurrentTest,
  };
};
