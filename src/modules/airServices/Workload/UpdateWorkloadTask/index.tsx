import CommonDrawer from '@/components/CommonDrawer';
import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpdateWorkloadTask } from './useUpdateWorkloadTask';

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
        <Grid container spacing={2}>
          {workloadDataArray?.map((item: any) => (
            <Grid item xs={12} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};
