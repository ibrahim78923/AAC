import { useForm } from 'react-hook-form';

import { Box } from '@mui/material';

import { FormProvider, RHFDatePicker } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';

const RestoreFilterDrawer = ({
  open,
  onClose,
  setRestoreFilter,
  setIsRestoreFilterDrawer,
}: any) => {
  const methods = useForm({});
  const { handleSubmit } = methods;

  const onSubmit = (values: any) => {
    setRestoreFilter({
      dateStart: values?.startDate,
      dateEnd: values?.closeDate,
    });
    setIsRestoreFilterDrawer(false);
  };
  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      footer
      isOk
      okText="Apply"
      title="Filter"
      submitHandler={handleSubmit(onSubmit)}
    >
      <FormProvider methods={methods}>
        <Box sx={{ my: '20px' }}>
          <RHFDatePicker name="startDate" fullWidth label="Start Date" />
        </Box>
        <RHFDatePicker name="endDate" fullWidth label="End Date" />
      </FormProvider>
    </CommonDrawer>
  );
};

export default RestoreFilterDrawer;
