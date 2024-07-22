import CommonDrawer from '@/components/CommonDrawer';
import { upsertSoftwareFormFields } from './UpsertSoftware.data';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { useUpsertSoftware } from './useUpsertSoftware';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';

export const UpsertSoftware = (props: any) => {
  const { isAddDrawerOpen } = props;
  const {
    onClose,
    methods,
    handleSubmit,
    postSoftwareStatus,
    userQuery,
    softwareId,
    isLoading,
    isFetching,
    editSoftwareStatus,
    submitUpsertSoftware,
    getDynamicFieldsStatus,
    postAttachmentStatus,
    form,
  } = useUpsertSoftware(props);

  return (
    <CommonDrawer
      isDrawerOpen={isAddDrawerOpen}
      onClose={onClose}
      isOk
      okText={!!softwareId ? 'Update' : 'Save'}
      footer
      title={!!softwareId ? 'Edit Software' : 'New Software'}
      submitHandler={() => handleSubmit(submitUpsertSoftware)()}
      isLoading={
        postSoftwareStatus?.isLoading ||
        editSoftwareStatus?.isLoading ||
        postAttachmentStatus?.isLoading
      }
      isDisabled={
        postSoftwareStatus?.isLoading ||
        editSoftwareStatus?.isLoading ||
        postAttachmentStatus?.isLoading
      }
      disabledCancelBtn={
        postSoftwareStatus?.isLoading ||
        editSoftwareStatus?.isLoading ||
        postAttachmentStatus?.isLoading
      }
    >
      <Box mt={1}>
        {isLoading ||
        isFetching ||
        getDynamicFieldsStatus?.isLoading ||
        getDynamicFieldsStatus?.isFetching ? (
          <SkeletonForm />
        ) : getDynamicFieldsStatus?.isError ? (
          <ApiErrorState />
        ) : (
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {upsertSoftwareFormFields(userQuery)?.map((item: any) => (
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
