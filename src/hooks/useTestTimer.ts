import { useState, useEffect, useCallback, useRef } from 'react';
import type { UseTestTimerProps, UseTestTimerReturn } from '../types/Main';

export const useTestTimer = ({
  timeLimit,
  onTimeUp,
  autoStart = false,
}: UseTestTimerProps): UseTestTimerReturn => {
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);
  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);
  const resetTimer = useCallback(() => {
    setTimeRemaining(timeLimit * 60);
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [timeLimit]);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);
  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining, onTimeUp]);

  return {
    timeRemaining,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    formatTime,
  };
};
