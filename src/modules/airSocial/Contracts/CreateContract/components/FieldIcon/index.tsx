import React, { ReactNode } from 'react';
import { Box, Theme } from '@mui/material';

export default function FieldIcon({
  children,
  size = 40,
}: {
  children: ReactNode;
  size?: number;
}) {
  return (
    <Box
      sx={{
        height: `${size}px`,
        width: `${size}px`,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: (theme: Theme) => `1px solid ${theme.palette.primary?.light}`,
        backgroundColor: (theme: Theme) => theme.palette.primary?.lighter,
        color: (theme: Theme) => theme.palette.primary?.main,
        '& svg': {
          height: `${size / 2}px`,
          width: `${size / 2}px`,
        },
      }}
    >
      {children}
    </Box>
  );
}
