import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useManageDashboardFilter } from './useManageDashboardFilter';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const ManageDashboardFilter = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    resetDashboardFilterForm,
    dashboardFilterFormFields,
    closePortal,
    isPortalOpen,
  } = useManageDashboardFilter();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isOpen as boolean}
        onClose={closePortal}
        okText={'apply'}
        title={'Filters'}
        submitHandler={handleSubmit(onSubmit)}
        cancelBtnHandler={resetDashboardFilterForm}
        isOk
        cancelText={'Reset'}
        footer
      >
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {dashboardFilterFormFields?.map((item: ReactHookFormFieldsI) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </CommonDrawer>
    </>
  );
};
