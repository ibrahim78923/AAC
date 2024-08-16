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
import { useSoftwareAssignCategory } from './useSoftwareAssignCategory';
import { LoadingButton } from '@mui/lab';
import { SoftwareAssignCategoryI } from './SoftwareAssignCategory.interface';

export const SoftwareAssignCategory: React.FC<SoftwareAssignCategoryI> = (
  params,
) => {
  const { openAssignModal, setOpenAssignModal } = params;
  const {
    onSubmit,
    handleSubmit,
    methods,
    putSoftwareAssignCategoryStatus,
    handleClose,
  } = useSoftwareAssignCategory(params);

  return (
    <Dialog
      open={openAssignModal}
      onClose={() => setOpenAssignModal(false)}
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
            <Typography variant="h4">Assign Category</Typography>
            <CloseIcon
              sx={{ color: 'custom.darker', cursor: 'pointer' }}
              onClick={() => handleClose?.()}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <RHFTextField
            name="category"
            size="small"
            required
            fullWidth
            label="Category"
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            variant="outlined"
            color="inherit"
            onClick={() => handleClose?.()}
            disabled={putSoftwareAssignCategoryStatus?.isLoading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant="contained"
            type="submit"
            disabled={putSoftwareAssignCategoryStatus?.isLoading}
            loading={putSoftwareAssignCategoryStatus?.isLoading}
          >
            Assign
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
