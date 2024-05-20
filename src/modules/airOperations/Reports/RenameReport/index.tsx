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
  const { onSubmit, handleSubmit, methods, handleClose } =
    useRenameReport(props);

  return (
    <Dialog
      open={isPortalOpen?.isRename}
      onClose={() => handleClose()}
      maxWidth={'sm'}
      fullWidth
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            gap={2}
            mb={1.5}
          >
            <Typography variant="h4">Rename Report</Typography>
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
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            variant="outlined"
            color="inherit"
            onClick={() => handleClose?.()}
            disabled
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant="contained"
            type="submit"
            disabled
            loading={false}
          >
            Apply
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
