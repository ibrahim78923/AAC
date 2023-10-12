import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import { styles } from './CommonModal.styles';

export interface ModelPropsI {
  open: boolean;
  handleClose: (value: boolean) => void;
  handleSubmit: () => void;
  children: any;
  title: string;
  okText: string;
  submitIcon?: any;
  footer?: boolean;
}

const CommonModal = ({
  open,
  handleClose,
  handleSubmit,
  children,
  title,
  okText,
  submitIcon,
  footer,
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
            <Typography variant="h5">{title}</Typography>
          </Box>
          {children}
          {footer && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                marginTop: '30px',
              }}
            >
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{ height: '36px' }}
                startIcon={submitIcon ? submitIcon : ''}
              >
                {okText}
              </Button>
            </Box>
          )}
        </Box>
      </>
    </Modal>
  );
};

export default CommonModal;
