import { PauseIcon, PlayIcon } from '@/assets/icons';
import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const AudioVisualizer = ({
  audioSrc = 'https://webaudioapi.com/samples/audio-tag/chrono.mp3',
}: any) => {
  const uniqueClassName = 'waveform';
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: containerRef.current,
        waveColor: '#EBFAF8',
        progressColor: '#38CAB5',
        barWidth: 2.8,
        cursorWidth: 1,
        height: 40,
      });

      wavesurferRef.current
        .load(audioSrc)
        .then(() => {})
        .catch(() => {});
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [audioSrc]);

  return (
    <div style={{ display: 'flex', gap: '5px', whiteSpace: 'nowrap' }}>
      <Button
        sx={{
          width: '40px',
          minWidth: '40px',
          height: '40px',
          minHeight: '40px',
          borderRadius: '50%',
          padding: '0',
        }}
        onClick={handleTogglePlay}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </Button>
      <div
        ref={containerRef}
        className={uniqueClassName}
        style={{ width: '100px' }}
      />
    </div>
  );
};

export default AudioVisualizer;
