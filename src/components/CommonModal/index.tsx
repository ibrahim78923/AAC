import React from 'react';

import { Box, Button, Modal, Typography, useTheme } from '@mui/material';

import { ModelPropsI } from './CommonModal.interface';

import { styles } from './CommonModal.styles';
import { CloseDrawerIcon } from '@/assets/icons';
import { LoadingButton } from '@mui/lab';

const CommonModal = ({
  open,
  handleClose,
  handleSubmit,
  children,
  title,
  titleDescription,
  okText,
  cancelText,
  submitIcon,
  footer,
  footerFill,
  isLoading,
  handleCancel,
  isSubmitDisabled,
  headerIcon,
  width,
  cancelIcon = true,
  background,
}: ModelPropsI) => {
  const theme = useTheme();
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
        <Box sx={styles?.parentBox(width, theme, background)}>
          <Box
            sx={{
              marginBottom: '20px',
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
              }}
            >
              {headerIcon}
              <Box>
                <Typography variant="h5">{title}</Typography>
                {titleDescription && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {titleDescription}
                  </Typography>
                )}
              </Box>
            </Box>
            {cancelIcon && (
              <Box
                onClick={handleCancel}
                sx={{ width: '30px', height: '40px', cursor: 'pointer' }}
              >
                <CloseDrawerIcon />
              </Box>
            )}
          </Box>
          <Box sx={{ overflow: 'scroll', maxHeight: '70vh' }}>{children}</Box>
          {footer && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                marginTop: '30px',
                gap: '10px',
              }}
            >
              {!footerFill && cancelText && (
                <Button
                  onClick={handleCancel}
                  variant="outlined"
                  color="inherit"
                  sx={{
                    height: '36px',
                    width: 'auto',
                  }}
                  startIcon={submitIcon ? submitIcon : ''}
                >
                  {cancelText}
                </Button>
              )}
              <LoadingButton
                loading={isLoading}
                onClick={handleSubmit}
                disabled={isSubmitDisabled ? isSubmitDisabled : false}
                variant="contained"
                sx={{
                  height: '36px',
                  width: `${footerFill ? '100%' : 'auto'}`,
                }}
                startIcon={submitIcon ? submitIcon : ''}
              >
                {okText}
              </LoadingButton>
            </Box>
          )}
        </Box>
      </>
    </Modal>
  );
};

export default CommonModal;
