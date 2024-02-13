import { Box, Button, Modal, Typography } from '@mui/material';

import { styles } from './RestoreAssign.styles';
import { AssignContactIcon } from '@/assets/icons';
import CloseIcon from '@/assets/icons/shared/close-icon';

const RestoreAssignModalBox = ({ open, onClose, handleAssignModal }: any) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.parentBox}>
          <Box sx={styles.modalBox}>
            <Box sx={styles.innerBoxOne}>
              <Box sx={styles.innerBoxTwo}>
                <AssignContactIcon />
                <Typography component="span" sx={styles.modalTypeText}>
                  Restore Contacts
                </Typography>
              </Box>
              <Box sx={{ cursor: 'pointer' }} onClick={onClose}>
                <CloseIcon />
              </Box>
            </Box>
            <Box sx={{ margin: '20px 0' }}>
              You are about to restore a Contacts.
            </Box>

            <Box sx={styles.buttonBox}>
              <Button
                onClick={onClose}
                variant="outlined"
                sx={{ height: '35px' }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleAssignModal}
                sx={{ height: '35px' }}
              >
                Restore
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default RestoreAssignModalBox;
