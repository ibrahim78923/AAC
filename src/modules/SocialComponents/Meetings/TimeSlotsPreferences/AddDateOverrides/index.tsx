import { AlertModalCloseIcon } from '@/assets/icons';
import { FormProvider, RHFDatePicker } from '@/components/ReactHookForm';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { useAddDateOverrides } from './useAddDateOverrides';
import { AddDateTimeSlots } from './AddDateTimeSlots';

const AddDateOverrides = (props: any) => {
  const {
    openModule,
    setOpenModule,
    methods,
    handleSubmit,
    onSubmit,
    control,
  } = props;
  const { fields } = useAddDateOverrides(props);
  return (
    <>
      <Dialog open={openModule} onClose={() => setOpenModule(false)} fullWidth>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              mb={1}
              flexWrap={'wrap'}
            >
              <Typography variant="h4">Add a date override</Typography>
              <IconButton onClick={() => setOpenModule(false)}>
                <AlertModalCloseIcon />
              </IconButton>
            </Box>
            <Typography variant="h6">
              Select the date(s) you want to assign specific hours
            </Typography>
          </DialogTitle>
          {fields?.map((date: any, dateIndex: number) => (
            <DialogContent sx={{ mt: 1 }} key={date?.id}>
              <RHFDatePicker
                name={`dateOverrides.${dateIndex}.date`}
                label="Select Date"
                fullWidth
              />
              <Grid item xs={12} py={0.5}>
                <Divider />
              </Grid>
              <Typography variant="h6">
                What hours are you available?
              </Typography>
              <AddDateTimeSlots parentIndex={dateIndex} control={control} />
            </DialogContent>
          ))}
          <DialogActions>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenModule(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Apply
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default AddDateOverrides;
