import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { useFilterReport } from './useFilterReport';

export const FilterReport = (props: any) => {
  const { isDrawerOpen } = props;
  const {
    methods,
    handleSubmit,
    submit,
    resetFilterForm,
    closeFilterForm,
    reportFilterFormFields,
  } = useFilterReport(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen?.isFilter}
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
              {reportFilterFormFields?.map((item: any) => (
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
