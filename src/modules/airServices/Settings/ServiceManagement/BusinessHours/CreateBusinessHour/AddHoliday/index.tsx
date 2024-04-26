import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import {
  FormProvider,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { useAddHoliday } from './useAddHoliday';
import { LoadingButton } from '@mui/lab';

export const AddHoliday = (props: any) => {
  const {
    openAddHolidayModal,
    setOpenAddHolidayModal,
    method,
    onSubmitRequest,
    reset,
    postHolidayStatus,
  } = useAddHoliday(props);

  return (
    <>
      {openAddHolidayModal && (
        <Dialog
          open={openAddHolidayModal}
          onClose={() => {
            setOpenAddHolidayModal(false);
            reset();
          }}
          aria-labelledby="responsive-dialog-title"
          PaperProps={{
            style: {
              width: 440,
              borderRadius: 20,
            },
          }}
        >
          <FormProvider methods={method} onSubmit={onSubmitRequest}>
            <DialogTitle
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 2.4,
              }}
            >
              <Typography variant="h4" color="primary?.main">
                Add Public Holiday
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container gap={2.4}>
                <Grid item xs={12}>
                  <RHFTextField
                    name="name"
                    label="Holiday Name"
                    size="small"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFDatePicker
                    name="date"
                    label="Date"
                    disablePast
                    required
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 2,
                }}
              >
                <LoadingButton
                  onClick={() => {
                    setOpenAddHolidayModal(false);
                    reset();
                  }}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  loading={postHolidayStatus?.isLoading}
                  type="submit"
                  variant="contained"
                >
                  Add
                </LoadingButton>
              </Box>
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
};
