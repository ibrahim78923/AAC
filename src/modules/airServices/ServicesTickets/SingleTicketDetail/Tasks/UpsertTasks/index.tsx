import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { useUpsertTasks } from './useUpsertTasks';
import { BUTTON_TITLE_FORM_USER, TITLE_FORM_USER } from './UpsertTasks.data';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';

export const UpsertTasks = (props: any) => {
  const { isPortalOpen } = props;

  const {
    submitUpsertTicketTasks,
    methods,
    handleCloseDrawer,
    handleSubmit,
    upsertTicketTaskFormFormFields,
    postTicketTasksStatus,
    patchTicketTasksStatus,
    getDynamicFieldsStatus,
    form,
    postAttachmentStatus,
  } = useUpsertTasks?.(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isUpsert}
        onClose={() => handleCloseDrawer?.()}
        title={TITLE_FORM_USER?.[isPortalOpen?.type]}
        submitHandler={() => handleSubmit?.(submitUpsertTicketTasks)()}
        footer
        isOk
        okText={BUTTON_TITLE_FORM_USER?.[isPortalOpen?.type]}
        isLoading={
          postTicketTasksStatus?.isLoading ||
          patchTicketTasksStatus?.isLoading ||
          postAttachmentStatus?.isLoading
        }
        isDisabled={
          patchTicketTasksStatus?.isLoading ||
          postTicketTasksStatus?.isLoading ||
          postAttachmentStatus?.isLoading
        }
        disabledCancelBtn={
          patchTicketTasksStatus?.isLoading ||
          postTicketTasksStatus?.isLoading ||
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
              <Grid container spacing={1}>
                {upsertTicketTaskFormFormFields?.map((item: any) => (
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
    </>
  );
};
