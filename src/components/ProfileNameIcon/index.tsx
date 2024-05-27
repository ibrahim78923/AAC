import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

const ProfileNameIcon = ({
  size,
  fontSize,
  color,
  firstName,
  lastName,
}: any) => {
  const theme = useTheme();

  firstName = firstName && firstName?.charAt(0)?.toUpperCase();
  lastName = lastName && lastName?.charAt(0)?.toUpperCase();
  return (
    <Box
      sx={{
        background: color ?? `${theme?.palette?.grey[300]}`,
        width: size ?? '50px',
        height: size ?? '50px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2px',
      }}
    >
      <Typography sx={{ fontSize: fontSize ?? '15px', fontWeight: '700' }}>
        {firstName ?? '-'}
      </Typography>
      <Typography sx={{ fontSize: fontSize ?? '15px', fontWeight: '700' }}>
        {lastName ?? '-'}
      </Typography>
    </Box>
  );
};

export default ProfileNameIcon;
