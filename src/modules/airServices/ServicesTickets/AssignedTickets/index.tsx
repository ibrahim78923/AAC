import { FormProvider } from '@/components/ReactHookForm';
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
import CloseIcon from '@mui/icons-material/Close';
import { AgentFieldDropdown } from '../ServiceTicketFormFields/AgentFieldDropdown';

export const AssignedTickets = () => {
  const {
    assignedTicketsMethod,
    handleSubmit,
    submitAssignedTicketsForm,
    closeTicketsAssignedModal,
    putTicketStatus,
    isPortalOpen,
  }: any = useAssignedTickets();

  return (
    <Dialog
      open={isPortalOpen?.isOpen as boolean}
      onClose={closeTicketsAssignedModal}
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
            mb={1.5}
          >
            <Typography variant="h4" color="slateBlue.main">
              Assign To
            </Typography>
            <CloseIcon
              sx={{ color: 'custom.darker', cursor: 'pointer' }}
              onClick={closeTicketsAssignedModal}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <AgentFieldDropdown />
        </DialogContent>
        <DialogActions sx={{ paddingTop: `0rem !important` }}>
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={closeTicketsAssignedModal}
            disabled={putTicketStatus?.isLoading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={putTicketStatus?.isLoading}
          >
            Assign
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
