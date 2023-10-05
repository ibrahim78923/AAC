import CloseIcon from '@/assets/icons/shared/AlertModels/close-icon';
import { Box, Modal, Typography } from '@mui/material';

const ConversationModel = ({
  open,
  handleClose,
  children,
  selectedItem,
}: any) => {
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
          <Typography variant="h5">{selectedItem}</Typography>
          <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </Box>
        {children}
      </Box>
    </Modal>
  );
};

export default ConversationModel;
