import React from 'react';
import { Box, Typography, Theme, useTheme } from '@mui/material';

const EnquiriesCard = () => {
  const theme = useTheme<Theme>();
  return (
    <>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          borderRadius: '8px',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: `${theme?.palette?.grey[800]}`, fontWeight: 600 }}
        >
          Enquires
        </Typography>
      </Box>
    </>
  );
};

export default EnquiriesCard;
