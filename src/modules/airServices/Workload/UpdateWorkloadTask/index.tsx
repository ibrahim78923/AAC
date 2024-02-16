import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpdateWorkloadTask } from './useUpdateWorkloadTask';

export const UpdateWorkloadTask = ({
  openDrawer,
  onClose,
  data,
  edit,
}: any) => {
  const { handleSubmit, onSubmit, methods, workloadDataArray } =
    useUpdateWorkloadTask({
      onClose,
      dataGet: data,
    });

  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={() => onClose(false)}
      title={edit ? 'Update Task' : `#${data?.extendedProps?.ticketNo}`}
      okText={'Update'}
      isOk={edit}
      cancelText={'Cancel'}
      footer={edit}
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {workloadDataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component
                  {...item?.componentProps}
                  size={'small'}
                  disabled={item?.componentProps?.disabled || !edit}
                />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};
