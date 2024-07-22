import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { useAddTime } from './useAddTime';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';

export const AddTime = (props: any) => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    addTimeFormFields,
    isDrawerOpen,
    postTicketStatus,
    closeDrawer,
    getDynamicFieldsStatus,
    postAttachmentStatus,
    form,
  } = useAddTime(props);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => closeDrawer?.()}
      title="Add Time"
      submitHandler={handleSubmit(onSubmit)}
      footer
      isOk
      okText="Submit"
      isLoading={postTicketStatus?.isLoading || postAttachmentStatus?.isLoading}
      isDisabled={
        postTicketStatus?.isLoading || postAttachmentStatus?.isLoading
      }
      disabledCancelBtn={
        postTicketStatus?.isLoading || postAttachmentStatus?.isLoading
      }
    >
      <Box>
        {getDynamicFieldsStatus?.isLoading ||
        getDynamicFieldsStatus?.isFetching ? (
          <SkeletonForm />
        ) : getDynamicFieldsStatus?.isError ? (
          <ApiErrorState />
        ) : (
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {addTimeFormFields?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
              {form?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  {componentMap[item?.component] &&
                    createElement(componentMap[item?.component], {
                      ...item?.componentProps,
                      name: item?.componentProps?.label,
                      size: 'small',
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
