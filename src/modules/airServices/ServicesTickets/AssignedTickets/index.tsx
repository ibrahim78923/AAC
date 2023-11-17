import { AlertModalCloseIcon } from '@/assets/icons';
import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useAssignedTickets } from './useAssignedTickets';

export const AssignedTickets = (props: any) => {
  const { isAssignedModalOpen } = props;
  const {
    assignedTicketsMethod,
    handleSubmit,
    submitAssignedTicketsForm,
    closeTicketsAssignedModal,
    apiQueryOrganizations,
  } = useAssignedTickets(props);

  return (
    <Dialog
      open={isAssignedModalOpen}
      onClose={() => closeTicketsAssignedModal?.()}
      fullWidth
      maxWidth={'sm'}
    >
      <FormProvider
        methods={assignedTicketsMethod}
        onSubmit={handleSubmit(submitAssignedTicketsForm)}
      >
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
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => closeTicketsAssignedModal?.()}
            >
              <AlertModalCloseIcon />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <br />
          <RHFAutocompleteAsync
            label="select User"
            name="user"
            fullWidth
            apiQuery={apiQueryOrganizations}
            size="small"
          />
        </DialogContent>
        <DialogActions
          sx={{ '&.MuiDialogActions-root': { padding: '1.5rem !important' } }}
        >
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={() => closeTicketsAssignedModal?.()}
          >
            Cancel
          </LoadingButton>
          <LoadingButton variant="contained" type="submit">
            Assign
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
