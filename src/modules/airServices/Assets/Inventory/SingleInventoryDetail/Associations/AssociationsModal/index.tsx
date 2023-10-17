import { Box, Dialog, MenuItem, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import { AssociationsDrawer } from '../AssociationsDrawer';

export const AssociationsModal = ({ openModal, setOpenModal, theme }: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Fragment>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '377px',
            },
          },
        }}
      >
        <Box>
          <MenuItem
            sx={{ p: '16px' }}
            onClick={() => {
              setOpenDrawer(true), setOpenModal(false);
            }}
          >
            <Typography variant="body2" sx={{ color: theme.palette.grey[600] }}>
              New Incident
            </Typography>
          </MenuItem>
          <MenuItem sx={{ p: '16px' }}>
            <Typography variant="body2" sx={{ color: theme.palette.grey[600] }}>
              Existing Incident
            </Typography>
          </MenuItem>
        </Box>
      </Dialog>
      <AssociationsDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </Fragment>
  );
};
