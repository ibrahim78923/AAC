import { Grid } from '@mui/material';
import {
  FormProvider,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { useAddHoliday } from './useAddHoliday';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const AddHoliday = (props: any) => {
  const {
    openAddHolidayModal,
    method,
    onSubmitRequest,
    postHolidayStatus,
    closeHolidayModal,
  } = useAddHoliday(props);

  return (
    <>
      <CustomCommonDialog
        isPortalOpen={openAddHolidayModal}
        closePortal={closeHolidayModal}
        dialogTitle="Add Public Holiday"
        submitButtonText="Add"
        showSubmitLoader={postHolidayStatus?.isLoading}
        disabledCancelButton={postHolidayStatus?.isLoading}
        handleSubmitButton={onSubmitRequest}
      >
        <FormProvider methods={method}>
          <Grid container gap={2}>
            <Grid item xs={12}>
              <RHFTextField
                name="name"
                label="Holiday Name"
                placeholder="Enter holiday name"
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
      </CustomCommonDialog>
    </>
  );
};
