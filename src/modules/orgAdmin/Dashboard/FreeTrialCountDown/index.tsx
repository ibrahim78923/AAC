import React from 'react';
import { Box } from '@mui/material';
import Countdown from 'react-countdown';
import { styles } from './FreeTrialCountDown.style';

interface CountDownProps {
  duration: number;
  startDate: number;
}
const render = ({ days, hours, minutes, seconds }: any) => {
  return (
    <Box sx={styles?.freeTrialCountDownTimer}>
      <Box sx={styles?.timeBox}>
        {days}
        <Box sx={styles?.timeTitle}>Days</Box>
      </Box>
      <Box sx={styles?.timeBox}>
        {hours}
        <Box sx={styles?.timeTitle}>Hour</Box>
      </Box>
      <Box sx={styles?.timeBox}>
        {minutes}
        <Box sx={styles?.timeTitle}>Min</Box>
      </Box>
      <Box sx={styles?.timeBox}>
        {seconds}
        <Box sx={styles?.timeTitle}>Sec</Box>
      </Box>
    </Box>
  );
};

export default function FreeTrialCountDown({
  duration,
  startDate,
}: CountDownProps) {
  return (
    <Box sx={styles?.countDownContainer}>
      <Box sx={styles?.freeTrialCountDown}>
        <Box sx={styles?.freeTrialCountDownTitle}>Your Free Trial Ends in</Box>
        <Countdown date={startDate + duration} renderer={render} />
      </Box>
    </Box>
  );
}
