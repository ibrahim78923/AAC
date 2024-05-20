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
import { ROLES } from '@/constants/strings';
import { useChangeReportOwner } from './useChangeReportOwner';
import { PAGINATION } from '@/config';

export const ChangeReportOwner = (props: any) => {
  const { isPortalOpen } = props;
  const {
    assignedTicketsMethod,
    handleSubmit,
    submitAssignedTicketsForm,
    closeModal,
    apiQueryAgent,
  }: any = useChangeReportOwner(props);

  return (
    <Dialog
      open={isPortalOpen?.isChangeOwner}
      onClose={() => closeModal?.()}
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
            <Box sx={{ cursor: 'pointer' }} onClick={() => closeModal?.()}>
              <AlertModalCloseIcon />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <br />
          <RHFAutocompleteAsync
            label="Select Owner"
            name="user"
            fullWidth
            required
            apiQuery={apiQueryAgent}
            size="small"
            placeholder="Choose Owner"
            externalParams={{
              limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
              role: ROLES?.ORG_EMPLOYEE,
            }}
            getOptionLabel={(option: any) =>
              `${option?.firstName} ${option?.lastName}`
            }
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={() => closeModal?.()}
            disabled
          >
            Cancel
          </LoadingButton>
          <LoadingButton variant="contained" type="submit" loading={false}>
            Assign
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
