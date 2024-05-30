import { useTheme } from '@mui/material';
import { useState, useEffect, useRef } from 'react';

export const useCustomAudioPlayer = () => {
  const audioSrc =
    'https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg';
  const theme = useTheme();
  const audioRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDurationAvailable, setIsDurationAvailable] = useState(false);

  const handlePlayPause = () => {
    if (audioRef?.current) {
      if (isPlaying) {
        audioRef?.current?.pause();
      } else {
        audioRef?.current?.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (event: any, newValue: any) => {
    if (audioRef?.current) {
      audioRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  useEffect(() => {
    if (audioRef?.current) {
      const updateProgress = () => {
        if (isPlaying) {
          setCurrentTime(audioRef?.current?.currentTime);
        }
      };
      audioRef?.current?.addEventListener('timeupdate', updateProgress);
      audioRef?.current?.addEventListener('ended', () => setIsPlaying(false));

      return () => {
        audioRef?.current?.removeEventListener('timeupdate', updateProgress);
        audioRef?.current?.removeEventListener('ended', () =>
          setIsPlaying(false),
        );
      };
    }
  }, [audioRef, isPlaying]);

  useEffect(() => {
    if (audioRef?.current) {
      const handleDurationChange = () => {
        setDuration(audioRef?.current?.duration);
        setIsDurationAvailable(true);
      };

      audioRef?.current?.addEventListener(
        'durationchange',
        handleDurationChange,
      );

      return () => {
        audioRef?.current?.removeEventListener(
          'durationchange',
          handleDurationChange,
        );
      };
    }
  }, [audioRef]);

  const checkForDuration = () => {
    if (audioRef?.current && audioRef?.current?.duration) {
      setDuration(audioRef?.current?.duration);
      setIsDurationAvailable(true);
    } else {
      setTimeout(checkForDuration, 100); // Retry after 100 milliseconds
    }
  };

  useEffect(() => {
    checkForDuration();
  }, [audioRef]);

  useEffect(() => {
    audioRef.current = new Audio(audioSrc);
    return () => {
      if (audioRef?.current) {
        audioRef?.current?.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  return {
    isPlaying,
    currentTime,
    duration,
    isDurationAvailable,
    handlePlayPause,
    handleSeek,
    audioRef,
    theme,
    audioSrc,
  };
};
