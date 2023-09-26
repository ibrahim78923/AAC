import CloseIcon from '@/assets/icons/shared/AlertModels/close-icon';
import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import {
  checkModelType,
  checkModelTypeForImage,
  checkModelTypeMessage,
} from './AlertModals.utils';

interface ModelProps {
  message: string;
  type: string;
  open: boolean;
  handleClose: (value: boolean) => void;
  handleSubmit: () => void;
}

export const AlertModals: React.FunctionComponent<ModelProps> = ({
  message,
  type,
  open,
  handleClose,
  handleSubmit,
}: ModelProps) => {
  return (
    <Box>
      <Button>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              background: 'white',
              borderRadius: '20px',
              maxWidth: '580px',
              width: '100%',
              border: '1px solid #E5E7EB',
              boxShadow: '0px 4px 24px -4px rgba(16, 24, 40, 0.02)',
              margin: 'auto',
              minHeight: '190px',
              padding: '24px',
              '@media (max-width:581px)': {
                maxWidth: '100%',
                margin: '0 12px',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '10px',
                }}
              >
                {checkModelTypeForImage(type)}
                <Typography
                  component="span"
                  sx={{
                    color: '#374151',
                    fontSize: '24px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: '30px',
                    textTransform: 'capitalize',
                  }}
                >
                  {checkModelType(type)}
                </Typography>
              </Box>
              <Box sx={{ cursor: 'pointer' }} onClick={() => handleClose(open)}>
                <CloseIcon />
              </Box>
            </Box>
            <Box sx={{ margin: '20px 0' }}>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '24px',
                  color: '#4B5563',
                }}
              >
                {message ? message : checkModelTypeMessage(type)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '16px',
              }}
            >
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

AlertModals.defaultProps = {
  type: 'delete',
};
