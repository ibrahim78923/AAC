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
import { useChangeReportOwner } from './useChangeReportOwner';
import CloseIcon from '@mui/icons-material/Close';

export const ChangeReportOwner = (props: any) => {
  const { isPortalOpen } = props;
  const {
    methods,
    handleSubmit,
    submitChangeOwner,
    closeModal,
    reportOwnerApiQuery,
    changeReportOwnerStatus,
    productId,
  }: any = useChangeReportOwner(props);

  return (
    <Dialog
      open={isPortalOpen?.isChangeOwner}
      onClose={() => closeModal?.()}
      fullWidth
      maxWidth={'sm'}
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
            name="owner"
            fullWidth
            required
            apiQuery={reportOwnerApiQuery}
            size="small"
            placeholder="Choose Owner"
            externalParams={{
              productId,
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
