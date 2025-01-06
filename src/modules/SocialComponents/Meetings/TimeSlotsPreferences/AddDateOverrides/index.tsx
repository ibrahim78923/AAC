import { FormProvider, RHFDatePicker } from '@/components/ReactHookForm';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { useAddDateOverrides } from './useAddDateOverrides';
import { AddDateTimeSlots } from './AddDateTimeSlots';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

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
      <CustomCommonDialog
        isPortalOpen={openModule}
        closePortal={() => setOpenModule(false)}
        dialogTitle="Add a date override"
        submitButtonText="Apply"
        handleSubmitButton={handleSubmit(onSubmit)}
      >
        <FormProvider methods={methods}>
          <Typography variant="h6">
            Select the date(s) you want to assign specific hours
          </Typography>
          {fields?.map((date: any, dateIndex: number) => (
            <Box sx={{ mt: 1 }} key={date?.id}>
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
            </Box>
          ))}
        </FormProvider>
      </CustomCommonDialog>
    </>
  );
};

export default AddDateOverrides;
