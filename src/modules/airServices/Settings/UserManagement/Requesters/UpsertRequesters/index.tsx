import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertRequester } from './useUpsertRequester';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';
import { IRequestersProps } from '../Requesters.interface';

const UpsertRequesters = (props: IRequestersProps) => {
  const { isDrawerOpen } = props;
  const {
    handleClose,
    methods,
    handleSubmit,
    submitUpsertRequester,
    addRequesterStatus,
    patchRequesterStatus,
    _id,
    upsertRequestersFormFields,
    getDynamicFieldsStatus,
    postAttachmentStatus,
    form,
  }: any = useUpsertRequester(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen as boolean}
        onClose={handleClose}
        title={!!_id ? 'Edit Requestor' : 'Add Requestor'}
        submitHandler={() => handleSubmit(submitUpsertRequester)()}
        footer
        isOk
        okText={!!_id ? 'Update' : 'Submit'}
        isLoading={
          addRequesterStatus?.isLoading ||
          patchRequesterStatus?.isLoading ||
          postAttachmentStatus?.isLoading
        }
        isDisabled={
          addRequesterStatus?.isLoading ||
          patchRequesterStatus?.isLoading ||
          postAttachmentStatus?.isLoading
        }
        disabledCancelBtn={
          addRequesterStatus?.isLoading ||
          patchRequesterStatus?.isLoading ||
          postAttachmentStatus?.isLoading
        }
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
                {upsertRequestersFormFields?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={item?._id}>
                    <item.component {...item.componentProps} size={'small'} />
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
    </>
  );
};

export default UpsertRequesters;
