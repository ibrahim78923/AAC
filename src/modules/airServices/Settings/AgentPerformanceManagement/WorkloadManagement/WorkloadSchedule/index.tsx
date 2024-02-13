import {
  Box,
  Button,
  DialogActions,
  IconButton,
  Typography,
} from '@mui/material';
import {
  TimerPauseIcon,
  PencilEditIcon,
  DeleteBlackIcon,
} from '@/assets/icons';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { NOTISTACK_VARIANTS, WORKLOAD_SCHEDULE } from '@/constants/strings';
import { useState } from 'react';
import { WorkLloadScheduleDeleteModal } from './WorkLloadScheduleDeleteModal';
import { enqueueSnackbar } from 'notistack';

export const WorkloadSchedule = () => {
  const { push } = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const submitDeleteModal = () => {
    enqueueSnackbar('Delete', {
      variant: NOTISTACK_VARIANTS?.ERROR,
    });
    setModalOpen(false);
  };
  return (
    <>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() =>
            push({
              pathname: AIR_SERVICES?.UPSERT_WORKFLOW_MANAGEMENT,
              query: { type: WORKLOAD_SCHEDULE?.CREATE },
            })
          }
        >
          Create new
        </Button>
      </DialogActions>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        bgcolor={'lightgrey'}
        mt={1}
      >
        <Box display={'flex'} alignItems={'center'}>
          <TimerPauseIcon />
          <Typography> Work Scheduled</Typography>
        </Box>
        <Box mx={2} display={'flex'} alignItems={'center'} gap={1}>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              push({
                pathname: AIR_SERVICES?.UPSERT_WORKFLOW_MANAGEMENT,
                query: { type: WORKLOAD_SCHEDULE?.EDIT },
              })
            }
          >
            <IconButton>
              <PencilEditIcon />
            </IconButton>
          </Box>
          <Box>
            <WorkLloadScheduleDeleteModal
              open={modalOpen}
              handleClose={() => {
                setModalOpen(false);
              }}
              submitDeleteModal={submitDeleteModal}
            />
            <IconButton onClick={() => setModalOpen(true)}>
              <DeleteBlackIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};
