import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid, Box } from '@mui/material';
import { useNewIncident } from './useNewIncident';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';

export const NewIncident = (props: any) => {
  const { openDrawer } = props;
  const {
    handleSubmit,
    onSubmit,
    methods,
    newIncidentFormFields,
    onClose,
    postTicketStatus,
    postRemoveAssociateTicketsStatus,
    form,
    getDynamicFieldsStatus,
    postAttachmentStatus,
  } = useNewIncident(props);

  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={onClose}
      title={'Create and Link a new Incident to this asset'}
      okText={'Create'}
      isOk
      cancelText={'Cancel'}
      footer
      isLoading={
        postTicketStatus?.isLoading ||
        postRemoveAssociateTicketsStatus?.isLoading ||
        postAttachmentStatus?.isLoading
      }
      isDisabled={
        postTicketStatus?.isLoading ||
        postRemoveAssociateTicketsStatus?.isLoading ||
        postAttachmentStatus?.isLoading
      }
      disabledCancelBtn={
        postTicketStatus?.isLoading ||
        postRemoveAssociateTicketsStatus?.isLoading ||
        postAttachmentStatus?.isLoading
      }
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        {getDynamicFieldsStatus?.isLoading ||
        getDynamicFieldsStatus?.isFetching ? (
          <SkeletonForm />
        ) : getDynamicFieldsStatus?.isError ? (
          <ApiErrorState />
        ) : (
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {newIncidentFormFields?.map((item: any) => (
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
