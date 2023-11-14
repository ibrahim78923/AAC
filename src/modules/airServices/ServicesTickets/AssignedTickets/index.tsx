import { AlertModalCloseIcon } from '@/assets/icons';
import { FormProvider, RHFSearchableSelect } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import { useForm } from 'react-hook-form';

export const AssignedTickets = (props: any) => {
  const method = useForm({
    defaultValues: {
      user: '',
    },
  });

  const { isAssignedModalOpen, handleClose } = props;

  return (
    <Dialog
      open={isAssignedModalOpen}
      onClose={() => handleClose?.()}
      fullWidth
      maxWidth={'sm'}
    >
      <FormProvider methods={method}>
        <DialogTitle>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={1}
            flexWrap={'wrap'}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={1}
              flexWrap={'wrap'}
            >
              <Typography variant="h3" textTransform={'capitalize'}>
                Assigned To
              </Typography>
            </Box>
            <Box sx={{ cursor: 'pointer' }} onClick={() => handleClose?.()}>
              <AlertModalCloseIcon />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <br />
          <RHFSearchableSelect
            label="select User"
            name="user"
            // label="Select Deal*"
            fullWidth
            options={[
              { value: 'deal1', label: 'Deal Name 1' },
              { value: 'deal2', label: 'Deal Name 2' },
            ]}
          />
        </DialogContent>
        <DialogActions
          sx={{ '&.MuiDialogActions-root': { padding: '1.5rem !important' } }}
        >
          <LoadingButton
            variant="outlined"
            color="secondary"
            //   onClick={() => handleCancelBtn?.()}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant="contained"
            // onClick={() => handleSubmitBtn?.()}
          >
            Assign
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
