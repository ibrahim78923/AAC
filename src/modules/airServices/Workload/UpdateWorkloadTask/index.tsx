import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpdateWorkloadTask } from './useUpdateWorkloadTask';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';

export const UpdateWorkloadTask = ({
  openDrawer,
  onClose,
  data,
  edit,
}: any) => {
  const {
    handleSubmit,
    onSubmit,
    methods,
    workloadDataArray,
    patchTaskStatus,
    getDynamicFieldsStatus,
    form,
    postAttachmentStatus,
  } = useUpdateWorkloadTask({
    onClose,
    dataGet: data,
  });

  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={() => onClose(false)}
      title={edit ? 'Update Task' : `#${data?.extendedProps?.taskNo}`}
      okText={'Update'}
      isOk={edit}
      cancelText={'Cancel'}
      footer={edit}
      submitHandler={handleSubmit(onSubmit)}
      disabledCancelBtn={
        patchTaskStatus?.isLoading || postAttachmentStatus?.isLoading
      }
      isDisabled={patchTaskStatus?.isLoading || postAttachmentStatus?.isLoading}
      isLoading={patchTaskStatus?.isLoading || postAttachmentStatus?.isLoading}
    >
      <Box mt={1}>
        {getDynamicFieldsStatus?.isLoading ||
        getDynamicFieldsStatus?.isFetching ? (
          <SkeletonForm />
        ) : getDynamicFieldsStatus?.isError ? (
          <ApiErrorState />
        ) : (
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
              {form?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  {componentMap[item?.component] &&
                    createElement(componentMap[item?.component], {
                      ...item?.componentProps,
                      name: item?.componentProps?.label,
                      size: 'small',
                      disabled: item?.componentProps?.disabled || !edit,
                    })}
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        )}
      </Box>
    </CommonDrawer>
  );
};
