import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { useRestoreReportsFilter } from './useRestoreReportsFilter';
import { FormGrid } from '@/components/Grids/FormGrid';

const RestoreReportsFilter = () => {
  const {
    methods,
    handleSubmit,
    submit,
    resetFilterForm,
    closeFilterForm,
    restoreReportFilterFormFields,
    isPortalOpen,
  } = useRestoreReportsFilter();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isOpen as boolean}
        onClose={closeFilterForm}
        title={'Filter'}
        submitHandler={handleSubmit(submit)}
        footer
        isOk
        okText={'Apply'}
        cancelText={'Reset'}
        cancelBtnHandler={resetFilterForm}
      >
        <FormProvider methods={methods}>
          <FormGrid formFieldsList={restoreReportFilterFormFields} />
        </FormProvider>
      </CommonDrawer>
    </>
  );
};

export default RestoreReportsFilter;
