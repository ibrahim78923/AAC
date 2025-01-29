import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpdateWorkloadTask } from './useUpdateWorkloadTask';
import { FormGrid } from '@/components/Grids/FormGrid';

export const UpdateWorkloadTask = ({ openDrawer, onClose, data }: any) => {
  const {
    handleSubmit,
    onSubmit,
    methods,
    patchTaskStatus,
    workloadDataArray,
  } = useUpdateWorkloadTask({
    onClose,
    dataGet: data,
  });

  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={() => onClose(false)}
      title={data?.extendedProps?.taskId}
      okText={'Update'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
      disabledCancelBtn={patchTaskStatus?.isLoading}
      isDisabled={patchTaskStatus?.isLoading}
      isLoading={patchTaskStatus?.isLoading}
    >
      <FormProvider methods={methods}>
        <FormGrid formFieldsList={workloadDataArray} />
      </FormProvider>
    </CommonDrawer>
  );
};
