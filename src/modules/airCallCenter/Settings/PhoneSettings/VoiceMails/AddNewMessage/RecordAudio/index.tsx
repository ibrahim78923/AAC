import {
  MicOffIcon,
  PauseIcon,
  PlayIcon,
  StartRecordingIcon,
} from '@/assets/icons';
import Delete from '@/assets/icons/shared/delete';
import CustomLabel from '@/components/CustomLabel';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

export const RecordAudio = () => {
  const theme = useTheme();
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef: any = useRef(null);
  const audioChunksRef: any = useRef([]);
  const audioContextRef: any = useRef(null);
  const analyserRef: any = useRef(null);
  const dataArrayRef: any = useRef(null);
  const waveformRef: any = useRef(null);
  const canvasRef: any = useRef(null);
  const animationIdRef: any = useRef(null);
  const wavesurferRef: any = useRef(null);

  useEffect(() => {
    if (waveformRef?.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef?.current,
        waveColor: `${theme?.palette?.primary?.light}`,
        progressColor: `${theme?.palette?.primary?.main}`,
        barWidth: 2.8,
        cursorWidth: 1,
        height: 40,
      });
      wavesurferRef?.current?.on('finish', handleAudioPlaybackFinish);
    }

    return () => {
      if (wavesurferRef?.current) {
        wavesurferRef?.current?.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (audioUrl && wavesurferRef?.current) {
      wavesurferRef?.current?.load(audioUrl);
    }
  }, [audioUrl]);

  const startRecording = async () => {
    audioChunksRef.current = [];
    audioContextRef.current = new (window.AudioContext ||
      (window as any)?.webkitAudioContext)();
    const stream = await navigator?.mediaDevices?.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    const source = audioContextRef?.current?.createMediaStreamSource(stream);
    analyserRef.current = audioContextRef?.current?.createAnalyser();
    source?.connect(analyserRef?.current);

    analyserRef.current.fftSize = 2048;
    const bufferLength = analyserRef.current.fftSize;
    dataArrayRef.current = new Uint8Array(bufferLength);

    mediaRecorderRef.current.ondataavailable = (event: any) => {
      audioChunksRef?.current?.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef?.current, {
        type: 'audio/wav',
      });
      const audioUrl: any = URL?.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    };

    mediaRecorderRef?.current?.start();
    setIsRecording(true);
    drawWaveform();
  };

  const stopRecording = () => {
    mediaRecorderRef?.current?.stop();
    audioContextRef?.current?.close();
    setIsRecording(false);
    if (animationIdRef?.current) {
      cancelAnimationFrame(animationIdRef?.current);
    }
  };

  const drawWaveform = () => {
    const canvas = canvasRef?.current;
    const canvasCtx = canvas?.getContext('2d');
    const WIDTH = canvas?.width;
    const HEIGHT = canvas?.height;

    const draw = () => {
      animationIdRef.current = requestAnimationFrame(draw);
      analyserRef?.current?.getByteTimeDomainData(dataArrayRef?.current);

      canvasCtx.fillStyle = `${theme?.palette?.common?.white}`;
      canvasCtx?.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = `${theme?.palette?.primary?.main}`;

      canvasCtx?.beginPath();

      const sliceWidth = (WIDTH * 1.0) / analyserRef?.current?.fftSize;
      let x = 0;

      for (let i = 0; i < analyserRef?.current?.fftSize; i++) {
        const v = dataArrayRef?.current[i] / 128.0;
        const y = (v * HEIGHT) / 2;

        if (i === 0) {
          canvasCtx?.moveTo(x, y);
        } else {
          canvasCtx?.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx?.lineTo(canvas?.width, canvas?.height / 2);
      canvasCtx?.stroke();
    };

    draw();
  };

  const playPauseAudio = () => {
    if (wavesurferRef?.current) {
      if (isPlaying) {
        wavesurferRef?.current?.pause();
      } else {
        wavesurferRef?.current?.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const handleAudioPlaybackFinish = () => {
    setIsPlaying(false);
  };
  return (
    <>
      <Box>
        <CustomLabel label="Voice mail" required={true} />
        <Box
          border="0.1rem solid"
          borderColor="grey.700"
          borderRadius={2}
          height={44}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={1}
        >
          <canvas
            style={{ display: isRecording ? 'block' : 'none' }}
            ref={canvasRef}
            width="384"
            height="34"
          ></canvas>
          <Typography
            display={!isRecording ? 'block' : 'none'}
            variant="body2"
            color="grey.900"
          >
            {'Record Voice'}
          </Typography>
          <IconButton onClick={isRecording ? stopRecording : startRecording}>
            {!isRecording ? (
              <MicOffIcon color={theme?.palette?.custom?.main} />
            ) : (
              <StartRecordingIcon />
            )}
          </IconButton>
        </Box>
      </Box>
      <Box mt={2} display={audioUrl ? 'block' : 'none'}>
        <Box
          bgcolor="grey.100"
          border="0.1rem solid"
          borderColor="#EAECF0"
          borderTop={0}
          py={1.5}
          px={1}
        >
          <Typography variant="body4" color="blue.main">
            Recording
          </Typography>
        </Box>
        <Box
          border="0.1rem solid"
          borderColor="#EAECF0"
          borderTop={0}
          py={1.5}
          px={1}
          borderRadius="0 0 8px 8px"
          display="flex"
          justifyContent="space-between"
        >
          <Box sx={{ display: 'flex', gap: '5px', whiteSpace: 'nowrap' }}>
            <IconButton onClick={playPauseAudio} disabled={!audioUrl}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </IconButton>
            <div ref={waveformRef} style={{ width: '320px' }}></div>
          </Box>
          <IconButton
            onClick={() => {
              audioChunksRef.current = [];
              setAudioUrl(null);
            }}
            disabled={!audioUrl}
          >
            <Delete />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
