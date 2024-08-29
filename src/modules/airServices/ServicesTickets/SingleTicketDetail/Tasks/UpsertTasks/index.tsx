import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { useUpsertTasks } from './useUpsertTasks';
import { BUTTON_TITLE_FORM_USER, TITLE_FORM_USER } from './UpsertTasks.data';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';
import { TicketsTasksPortalComponentPropsI } from '../Tasks.interface';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const UpsertTasks = (props: TicketsTasksPortalComponentPropsI) => {
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
    getDynamicFormData,
  } = useUpsertTasks?.(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isUpsert as boolean}
        onClose={() => handleCloseDrawer?.()}
        title={TITLE_FORM_USER?.[isPortalOpen?.type as string]}
        submitHandler={() => handleSubmit?.(submitUpsertTicketTasks)()}
        footer
        isOk
        okText={BUTTON_TITLE_FORM_USER?.[isPortalOpen?.type as string]}
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
            <ApiErrorState canRefresh refresh={() => getDynamicFormData?.()} />
          ) : (
            <FormProvider methods={methods}>
              <Grid container spacing={1}>
                {upsertTicketTaskFormFormFields?.map(
                  (item: ReactHookFormFieldsI) => (
                    <Grid item xs={12} md={item?.md} key={item?.id}>
                      <item.component
                        {...item?.componentProps}
                        size={'small'}
                      />
                    </Grid>
                  ),
                )}
                {form?.map((item: ReactHookFormFieldsI) => (
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
