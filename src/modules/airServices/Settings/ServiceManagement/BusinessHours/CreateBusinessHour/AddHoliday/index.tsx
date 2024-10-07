import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
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
          <DialogTitle
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'primary.main',
              mb: 1,
            }}
          >
            Add Public Holiday
          </DialogTitle>

          <DialogContent>
            <FormProvider methods={method} onSubmit={onSubmitRequest}>
              <Grid container gap={2}>
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
                    fullWidth
                  />
                </Grid>
              </Grid>
            </FormProvider>
          </DialogContent>

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
                disabled={postHolidayStatus?.isLoading}
                className={'small'}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                loading={postHolidayStatus?.isLoading}
                type="submit"
                variant="contained"
                className={'small'}
                onClick={() => onSubmitRequest?.()}
              >
                Add
              </LoadingButton>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
