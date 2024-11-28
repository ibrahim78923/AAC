import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { styles } from './ThankYou.styles';

interface ThankYouProps {
  message: string;
}

export default function ThankYou({ message }: ThankYouProps) {
  return (
    <>
      <Box sx={styles?.container}>
        <Box sx={styles?.heading}>
          <Typography variant="h1" sx={styles.title}>
            Thank You
          </Typography>
        </Box>
        <Paper elevation={1} sx={styles?.paper}>
          <Box sx={styles?.message}>Thank You for Reaching Out!</Box>
          <Box sx={styles?.desc}>{message}</Box>
        </Paper>
      </Box>
    </>
  );
}
