import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import {
  checkModelType,
  checkModelTypeForImage,
  checkModelTypeMessage,
} from './AlertModals.utils';
import { ModelPropsI } from './AlertModals.interface';
import CloseIcon from '@/assets/icons/shared/AlertModels/close-icon';
import { styles } from './AlertModals.styles';

export const AlertModals: React.FunctionComponent<ModelPropsI> = ({
  message,
  type,
  open,
  handleClose,
  handleSubmit,
}: ModelPropsI) => {
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.parentBox}>
          <Box sx={styles.modalBox}>
            <Box sx={styles.innerBoxOne}>
              <Box sx={styles.innerBoxTwo}>
                {checkModelTypeForImage(type)}
                <Typography component="span" sx={styles.modalTypeText}>
                  {checkModelType(type)}
                </Typography>
              </Box>
              <Box sx={{ cursor: 'pointer' }} onClick={() => handleClose(open)}>
                <CloseIcon />
              </Box>
            </Box>
            <Box sx={{ margin: '20px 0' }}>
              <Typography sx={styles.messageText}>
                {message ? message : checkModelTypeMessage(type)}
              </Typography>
            </Box>
            <Box sx={styles.buttonBox}>
              <Button onClick={() => handleClose(open)} variant="outlined">
                No
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Yes
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
