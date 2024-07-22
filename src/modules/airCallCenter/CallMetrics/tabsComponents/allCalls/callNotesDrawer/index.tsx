import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useCallsNotesDrawer } from './useCallNotesDrawer';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_CALL_CENTER_CALL_METRICS_PERMISSION } from '@/constants/permission-keys';

const CallsNotesDrawer = (props: any) => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    cancelCallNotes,
    viewCallNotesFormFields,
    isViewDrawerOpen,
    setIsViewDrawerOpen,
  } = useCallsNotesDrawer(props);

  return (
    <PermissionsGuard
      permissions={[
        AIR_CALL_CENTER_CALL_METRICS_PERMISSION?.ALL_CALLS_ACTIONS_ADD_NOTES,
      ]}
    >
      <CommonDrawer
        footer
        isDrawerOpen={isViewDrawerOpen}
        onClose={() => setIsViewDrawerOpen(false)}
        title="View Call Notes"
        okText="Add"
        cancelText="cancel"
        isOk
        submitHandler={handleSubmit(onSubmit)}
        cancelBtnHandler={() => cancelCallNotes?.()}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {viewCallNotesFormFields?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </PermissionsGuard>
  );
};

export default CallsNotesDrawer;
