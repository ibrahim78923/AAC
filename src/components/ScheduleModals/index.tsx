import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

import { ModelPropsI } from './ScheduleModals.interface';
import CloseIcon from '@/assets/icons/shared/alert-modal-close-icon';
import { styles } from './ScheduleModals.styles';
import useScheduleModals from './useScheduleModals';
import { LoadingButton } from '@mui/lab';

export const ScheduleModals: React.FunctionComponent<ModelPropsI> = ({
  type,
  open,
  handleClose,
  handleSubmit,
  children,
  submitButonText,
  isFooter,
  loading,
}: ModelPropsI) => {
  const { checkModelTypeForImage, checkModelType } = useScheduleModals({
    type,
  });
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
                {checkModelTypeForImage()}
                <Typography component="span" sx={styles.modalTypeText}>
                  {checkModelType()}
                </Typography>
              </Box>
              <Box sx={{ cursor: 'pointer' }} onClick={() => handleClose(open)}>
                <CloseIcon />
              </Box>
            </Box>
            <Box sx={{ margin: '20px 0' }}>{children}</Box>

            {isFooter && (
              <Box sx={styles.buttonBox}>
                <Button
                  onClick={() => handleClose(open)}
                  variant="outlined"
                  sx={{ height: '35px' }}
                >
                  Cancel
                </Button>
                <LoadingButton
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ height: '35px' }}
                  loading={loading}
                >
                  {submitButonText}
                </LoadingButton>
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
