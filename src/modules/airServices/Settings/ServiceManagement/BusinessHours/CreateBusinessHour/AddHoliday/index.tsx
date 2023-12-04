import {
  Box,
  Button,
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
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export const AddHoliday = () => {
  const [openAddHolidayModal, setOpenAddHolidayModal] = useState(false);
  const method = useForm({
    defaultValues: {
      holidayName: '',
      date: null,
    },
  });

  return (
    <>
      <Button
        variant="contained"
        disableElevation
        onClick={() => setOpenAddHolidayModal(true)}
      >
        Add
      </Button>
      {openAddHolidayModal && (
        <Dialog
          open={openAddHolidayModal}
          onClose={() => setOpenAddHolidayModal(false)}
          aria-labelledby="responsive-dialog-title"
          PaperProps={{
            style: {
              width: 440,
              borderRadius: 20,
            },
          }}
        >
          <FormProvider methods={method}>
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
                    name="holidayName"
                    label="Holiday Name"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFDatePicker
                    name="date"
                    label="Date"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
          </FormProvider>
          <DialogActions>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
              }}
            >
              <Button
                onClick={() => setOpenAddHolidayModal(false)}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Add
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
