import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { useRenameReport } from './useRenameReport';

export const RenameReport = (props: any) => {
  const { isPortalOpen } = props;
  const { onSubmit, handleSubmit, methods, handleClose, renameReportsStatus } =
    useRenameReport(props);

  return (
    <Dialog
      open={isPortalOpen?.isRename}
      onClose={() => handleClose()}
      maxWidth={'xs'}
      fullWidth
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
              Rename Report
            </Typography>
            <CloseIcon
              sx={{ color: 'custom.darker', cursor: 'pointer' }}
              onClick={() => handleClose?.()}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <RHFTextField
            name="name"
            size="small"
            required
            fullWidth
            label="Report Name"
            placeholder="Enter Report Name"
          />
        </DialogContent>
        <DialogActions sx={{ paddingTop: `0rem !important` }}>
          <LoadingButton
            variant="outlined"
            color="inherit"
            onClick={() => handleClose?.()}
            disabled={renameReportsStatus?.isLoading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant="contained"
            type="submit"
            disabled={renameReportsStatus?.isLoading}
            loading={renameReportsStatus?.isLoading}
          >
            Apply
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
