import CloseIcon from '@/assets/icons/shared/AlertModels/close-icon';
import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

const ConversationModel = ({ open = true, handleClose, children }: any) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          maxWidth: '580px',
          width: '100%',
          borderRadius: '10px',
          border: '1px solid #E5E7EB',
          padding: '24px',
          background: '#FFF',
          boxShadow: '0px 4px 24px -4px rgba(16, 24, 40, 0.02)',
          margin: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: '16px',
          }}
        >
          <Typography variant="h5">Add Notes</Typography>
          <CloseIcon />
        </Box>
        {children}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            mb: '16px',
            gap: '10px',
          }}
        >
          <Button sx={{ maxWidth: '90px' }} variant="outlined">
            Cancel
          </Button>
          <Button sx={{ maxWidth: '90px' }} variant="contained">
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConversationModel;
