import { useForm } from 'react-hook-form';
import { FormProvider, RHFDatePicker } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { RestoreFilterDrawerProps } from '../Restore-interface';
import { restoreDefaultValues } from './RestoreFilterDrawer.data';

const RestoreFilterDrawer = ({
  open,
  onClose,
  setRestoreFilter,
  setIsRestoreFilterDrawer,
  restoreFilter,
}: RestoreFilterDrawerProps) => {
  const methods = useForm({
    defaultValues: restoreDefaultValues(restoreFilter),
  });
  const { handleSubmit } = methods;

  const onSubmit = (values: any) => {
    setRestoreFilter({
      dateStart: values?.startDate,
      dateEnd: values?.endDate,
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
        <RHFDatePicker
          name="startDate"
          fullWidth
          label="Start Date"
          size="small"
        />
        <RHFDatePicker name="endDate" fullWidth label="End Date" size="small" />
      </FormProvider>
    </CommonDrawer>
  );
};

export default RestoreFilterDrawer;
