import { Box, Button, useTheme } from '@mui/material';
import React from 'react';
import { AddBox } from '@mui/icons-material';

export const SubListWrapper = ({ children }: any) => {
  const theme: any = useTheme();
  return (
    <Box bgcolor={theme?.palette?.grey[400]} p={1}>
      <Box
        p={3}
        border={`.1rem solid ${theme?.palette?.grey[700]}`}
        bgcolor={theme?.palette?.grey[700]}
        boxShadow={2}
        borderRadius={2}
      >
        {children}
        <Box mt={1}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mr: 5 }}
            startIcon={<AddBox />}
          >
            Add City
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
