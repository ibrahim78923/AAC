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
import { ROLES } from '@/constants/strings';
import { TicketActionComponentPropsI } from '../TicketsLists/TicketsLists.interface';

export const AssignedTickets = (props: TicketActionComponentPropsI) => {
  const { isDrawerOpen } = props;
  const {
    assignedTicketsMethod,
    handleSubmit,
    submitAssignedTicketsForm,
    closeTicketsAssignedModal,
    apiQueryAgent,
    putTicketStatus,
  }: any = useAssignedTickets(props);

  return (
    <Dialog
      open={isDrawerOpen}
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
                Assign To
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
            label="Select user"
            name="user"
            fullWidth
            required
            apiQuery={apiQueryAgent}
            size="small"
            placeholder="Choose Agent"
            externalParams={{ limit: 50, role: ROLES?.ORG_EMPLOYEE }}
            getOptionLabel={(option: any) =>
              `${option?.firstName} ${option?.lastName}`
            }
          />
        </DialogContent>
        <DialogActions
          sx={{ '&.MuiDialogActions-root': { padding: '1.5rem !important' } }}
        >
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={() => closeTicketsAssignedModal?.()}
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
