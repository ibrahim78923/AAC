import { Box } from '@mui/material';
import React from 'react';
import { styles } from './PlainLayout.style';

interface PlainLayoutProps {
  children: React.ReactNode;
}

export default function PlainLayout({ children }: PlainLayoutProps) {
  return <Box sx={styles?.plainLayout}>{children}</Box>;
}
