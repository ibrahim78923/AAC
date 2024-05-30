import { DeleteIcon, ImportBoxIcon, PauseIcon, PlayIcon } from '@/assets/icons';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import { useCustomAudioPlayer } from './useCustomAudioPlayer';

const CustomAudioPlayer = () => {
  const {
    isPlaying,
    currentTime,
    duration,
    isDurationAvailable,
    handlePlayPause,
    handleSeek,
    audioRef,
    theme,
    audioSrc,
  } = useCustomAudioPlayer();

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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              mt: 2,
            }}
          >
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
