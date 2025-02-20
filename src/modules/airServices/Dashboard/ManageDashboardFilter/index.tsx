import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useManageDashboardFilter } from './useManageDashboardFilter';
import { FormGrid } from '@/components/Grids/FormGrid';

const ManageDashboardFilter = () => {
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
          <FormGrid formFieldsList={dashboardFilterFormFields} />
        </FormProvider>
      </CommonDrawer>
    </>
  );
};

export default ManageDashboardFilter;
