import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { useRestoreReportsFilter } from './useRestoreReportsFilter';
import { RestoreReportsListsComponentPropsI } from '../RestoreReportsLists/RestoreReportsLists.interface';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const RestoreReportsFilter = (
  props: RestoreReportsListsComponentPropsI,
) => {
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
        isDrawerOpen={isPortalOpen?.isFilter as boolean}
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
              {restoreReportFilterFormFields?.map(
                (item: ReactHookFormFieldsI) => (
                  <Grid item xs={12} key={item?.id}>
                    <item.component {...item?.componentProps} size={'small'} />
                  </Grid>
                ),
              )}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};
