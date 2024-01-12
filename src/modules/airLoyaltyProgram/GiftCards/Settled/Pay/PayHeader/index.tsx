import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ExportModal } from '@/components/ExportModal';
import { ExportIcon } from '@/assets/icons';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { PayFilterDrawer } from '../PayFilterDrawer';

export const PayHeader = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
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
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<FilterListIcon />}
            sx={{ borderRadius: '0.5rem' }}
            onClick={() => setOpenDrawer(true)}
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
      <PayFilterDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
};
