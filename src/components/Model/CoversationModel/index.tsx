import { AlertModalCloseIcon } from '@/assets/icons';
import { Box, Typography, Dialog } from '@mui/material';

const ConversationModel = ({
  open,
  handleClose,
  children,
  selectedItem,
}: any) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        boxShadow={2}
        sx={{
          maxWidth: '580px',
          width: '100%',
          borderRadius: '10px',
          border: '1px solid grey.700',
          padding: '24px',
          background: 'custom.white',
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
          <AlertModalCloseIcon
            onClick={handleClose}
            style={{ cursor: 'pointer' }}
          />
        </Box>
        {children}
      </Box>
    </Dialog>
  );
};

export default ConversationModel;
