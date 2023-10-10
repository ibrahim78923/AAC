import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import { styles } from './CommonModal.styles';

export interface ModelPropsI {
  open: boolean;
  handleClose: (value: boolean) => void;
  handleSubmit: () => void;
  children: any;
}

const CommonModal = ({
  open,
  handleClose,
  handleSubmit,
  children,
}: ModelPropsI) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        backgroundColor: '#00000038 !important',
      }}
    >
      <>
        <Box sx={styles.parentBox}>
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="h5">Add a new feature</Typography>
          </Box>
          {children}
          <Box
            sx={{ display: 'flex', justifyContent: 'end', marginTop: '30px' }}
          >
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ height: '36px' }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default CommonModal;
