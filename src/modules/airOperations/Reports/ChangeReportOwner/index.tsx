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
import CloseIcon from '@mui/icons-material/Close';

export const ChangeReportOwner = (props: any) => {
  const { isPortalOpen } = props;
  const {
    methods,
    handleSubmit,
    submitChangeOwner,
    closeModal,
    apiQueryAgent,
    changeReportOwnerStatus,
  }: any = useChangeReportOwner(props);

  return (
    <Dialog
      open={isPortalOpen?.isChangeOwner}
      onClose={() => closeModal?.()}
      fullWidth
      maxWidth={'xs'}
    >
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(submitChangeOwner)}
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
              Change Owner
            </Typography>
            <CloseIcon
              sx={{ color: 'custom.darker', cursor: 'pointer' }}
              onClick={() => closeModal?.()}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <RHFAutocompleteAsync
            label="Owner Name"
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
        <DialogActions sx={{ paddingTop: `0rem !important` }}>
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={() => closeModal?.()}
            disabled={changeReportOwnerStatus?.isLoading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={changeReportOwnerStatus?.isLoading}
            disabled={changeReportOwnerStatus?.isLoading}
          >
            Apply
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
