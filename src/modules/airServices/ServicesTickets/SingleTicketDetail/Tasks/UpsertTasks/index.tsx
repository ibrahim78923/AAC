import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { useUpsertTasks } from './useUpsertTasks';
import { BUTTON_TITLE_FORM_USER, TITLE_FORM_USER } from './UpsertTasks.data';

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
          postTicketTasksStatus?.isLoading || patchTicketTasksStatus?.isLoading
        }
        isDisabled={
          patchTicketTasksStatus?.isLoading || postTicketTasksStatus?.isLoading
        }
        disabledCancelBtn={
          patchTicketTasksStatus?.isLoading || postTicketTasksStatus?.isLoading
        }
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {upsertTicketTaskFormFormFields?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};
