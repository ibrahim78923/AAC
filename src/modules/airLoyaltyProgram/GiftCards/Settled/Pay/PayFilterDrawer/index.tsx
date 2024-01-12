import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFDateRangePicker } from '@/components/ReactHookForm';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';

export const PayFilterDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer } = props;
  const methods = useForm({
    defaultValues: {
      datePicker: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
    },
  });
  return (
    <Box>
      <CommonDrawer
        title="AddFilter"
        isOk
        cancelText={'Cancel'}
        footer
        isDrawerOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        okText={'Apply'}
      >
        <FormProvider methods={methods}>
          <RHFDateRangePicker
            name="datePicker"
            label="Date Range"
            size="small"
          />
        </FormProvider>
      </CommonDrawer>
    </Box>
  );
};
