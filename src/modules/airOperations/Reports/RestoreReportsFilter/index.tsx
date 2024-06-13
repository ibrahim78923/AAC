import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { useRestoreReportsFilter } from './useRestoreReportsFilter';

export const RestoreReportsFilter = (props: any) => {
  const { isPortalOpen } = props;
  const {
    methods,
    handleSubmit,
    submit,
    resetFilterForm,
    closeFilterForm,
    restoreReportFilterFormFields,
  } = useRestoreReportsFilter(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isFilter}
        onClose={() => {
          closeFilterForm?.();
        }}
        title={'Filter'}
        submitHandler={() => {
          handleSubmit(submit)();
        }}
        footer
        isOk
        okText={'Apply'}
        cancelText={'Reset'}
        cancelBtnHandler={() => resetFilterForm?.()}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={2}>
              {restoreReportFilterFormFields?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
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
