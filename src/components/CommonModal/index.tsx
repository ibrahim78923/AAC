import React from 'react';

import { Box, Button, Modal, Typography } from '@mui/material';

import { ModelPropsI } from './CommonModal.interface';

import { styles } from './CommonModal.styles';

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
