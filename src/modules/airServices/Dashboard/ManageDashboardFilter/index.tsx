import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useManageDashboardFilter } from './useManageDashboardFilter';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { ManageDashboardPortalComponentPropsI } from '../ManageDashboard/ManageDashboard.interface';

export const ManageDashboardFilter = (
  props: ManageDashboardPortalComponentPropsI,
) => {
  const { isPortalOpen } = props;
  const {
    methods,
    handleSubmit,
    onSubmit,
    resetDashboardFilterForm,
    dashboardFilterFormFields,
    closePortal,
  } = useManageDashboardFilter(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isFilter as boolean}
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
