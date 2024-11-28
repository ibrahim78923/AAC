import { Box } from '@mui/material';
import React from 'react';
import { styles } from './PlainHeader.style';

interface PlainHeaderProps {
  children: React.ReactNode;
}

export default function PlainHeader({ children }: PlainHeaderProps) {
  return <Box sx={styles?.header}>{children}</Box>;
}
