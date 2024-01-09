import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ReceiveFilter } from '../ReceiveFilterDrawer';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ExportModal } from '@/components/ExportModal';
import { ExportIcon } from '@/assets/icons';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const ReceiveHeader = ({ toggleHideZeroPrice, hideZeroPrice }: any) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        px={2}
        py={1}
        borderBottom={`1px solid lightgrey`}
        mb={1}
      >
        <Typography variant="h4">Shops</Typography>
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <Tooltip title="Hide unused shops and widgets">
            <IconButton
              onClick={toggleHideZeroPrice}
              style={{ cursor: 'pointer' }}
            >
              {hideZeroPrice ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Tooltip>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<FilterListIcon />}
            sx={{ borderRadius: '0.5rem' }}
            onClick={() => setDrawerOpen(true)}
          >
            Filters
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<ExportIcon />}
            sx={{ borderRadius: '0.5rem' }}
            onClick={() => setOpenModal(true)}
          >
            Export
          </Button>
          <ExportModal
            open={openModal}
            handleClose={() => setOpenModal(false)}
            onSubmit={() => {
              enqueueSnackbar('Export Successfully', {
                variant: NOTISTACK_VARIANTS?.SUCCESS,
              });
              setOpenModal(false);
            }}
          />
        </Box>
      </Box>
      <ReceiveFilter drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </>
  );
};
