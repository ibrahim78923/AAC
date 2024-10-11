import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
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
            <IconButton onClick={() => handleClose?.()}>
              <CloseIcon sx={{ color: 'custom.darker' }} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <RHFTextField
            name="category"
            size="small"
            placeholder="Enter Category"
            required
            fullWidth
            label="Category"
          />
        </DialogContent>
        <DialogActions sx={{ paddingTop: `0rem !important` }}>
          <LoadingButton
            variant="outlined"
            color="inherit"
            onClick={() => handleClose?.()}
            disabled={putSoftwareAssignCategoryStatus?.isLoading}
            className="small"
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            className="small"
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
