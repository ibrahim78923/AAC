import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { useSoftwareAssignCategory } from './useSoftwareAssignCategory';

export const SoftwareAssignCategory = (params: any) => {
  const { openAssignModal, setOpenAssignModal } = params;
  const { onSubmit, handleSubmit, methods } = useSoftwareAssignCategory(params);

  return (
    <Dialog
      open={openAssignModal}
      onClose={() => setOpenAssignModal(false)}
      maxWidth={'sm'}
      fullWidth
    >
      <Box>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} p={2}>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              flexWrap={'wrap'}
              gap={2}
            >
              <Typography variant="h4">Assign Category</Typography>
              <CloseIcon
                sx={{ color: 'custom.darker', cursor: 'pointer' }}
                onClick={() => setOpenAssignModal(false)}
              />
            </Box>
            <DialogContent>
              <RHFTextField name="category" required fullWidth />
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => setOpenAssignModal(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Assign
              </Button>
            </DialogActions>
          </Grid>
        </FormProvider>
      </Box>
    </Dialog>
  );
};
