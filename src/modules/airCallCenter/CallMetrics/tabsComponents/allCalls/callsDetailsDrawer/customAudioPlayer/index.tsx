import { DeleteIcon, ImportBoxIcon, PauseIcon, PlayIcon } from '@/assets/icons';
import { Box, IconButton, Slider, Typography, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const CustomAudioPlayer = () => {
  const theme = useTheme();
  const audioSrc =
    'https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg'; //for testing purposes
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDurationAvailable, setIsDurationAvailable] = useState(false);
  const audioRef = useRef<any>(null);

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
        setDuration(audioRef.current.duration);
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

  return (
    <Box>
      <audio ref={audioRef} src={audioSrc} />
      {isDurationAvailable && (
        <Box sx={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
          <IconButton
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onClick={handlePlayPause}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Slider
              value={currentTime}
              // min={0}
              max={duration}
              onChange={handleSeek}
              disabled={!duration}
              // track="inverted"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body4">{formatTime(currentTime)}</Typography>
              <Typography variant="body4">{formatTime(duration)}</Typography>
            </Box>
          </Box>
          <Box sx={{ width: '130px', height: 'fit-content' }}>
            <IconButton>
              <ImportBoxIcon
                color={theme?.palette?.custom?.main}
                width="24"
                height="20"
              />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

function formatTime(seconds: number) {
  const minutes = Math?.floor(seconds / 60);
  const secondsLeft = Math?.floor(seconds % 60);
  return `${minutes?.toString()?.padStart(2, '0')}:${secondsLeft
    ?.toString()
    ?.padStart(2, '0')}`;
}

export default CustomAudioPlayer;
