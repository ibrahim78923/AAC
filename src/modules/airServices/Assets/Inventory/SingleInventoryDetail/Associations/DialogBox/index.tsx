import { Box, Dialog, Typography, useTheme } from '@mui/material';
import React from 'react';

export const DialogBox = ({
  openDialog,
  setOpenDialog,
  setNewIncident,
  setExistingIncident,
}: any) => {
  const theme: any = useTheme();

  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box width={'350px'}>
        <Typography
          variant="body1"
          p={2}
          sx={{
            cursor: 'pointer',
            '&:hover': { backgroundColor: theme?.palette?.grey?.[400] },
          }}
          onClick={() => {
            setNewIncident(true);
            setOpenDialog(false);
          }}
        >
          New Incident
        </Typography>
        <Typography
          variant="body1"
          p={2}
          sx={{
            cursor: 'pointer',
            '&:hover': { backgroundColor: theme?.palette?.grey?.[400] },
          }}
          onClick={() => {
            setExistingIncident(true);
            setOpenDialog(false);
          }}
        >
          Existing Incident
        </Typography>
      </Box>
    </Dialog>
  );
};
