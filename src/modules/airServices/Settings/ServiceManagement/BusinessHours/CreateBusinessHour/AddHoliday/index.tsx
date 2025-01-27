import { Box } from '@mui/material';
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
    methods,
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
        <FormProvider methods={methods}>
          <RHFTextField
            name="name"
            label="Holiday Name"
            placeholder="Enter holiday name"
            size="small"
            required
          />
          <Box sx={{ my: 2 }}>
            <RHFDatePicker
              name="date"
              label="Date"
              disablePast
              required
              size="small"
              fullWidth
            />
          </Box>
        </FormProvider>
      </CustomCommonDialog>
    </>
  );
};
