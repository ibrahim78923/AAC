import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box } from '@mui/material';
import { useFilterReport } from './useFilterReport';
import { FormGrid } from '@/components/Grids/FormGrid';

export const FilterReport = () => {
  const {
    methods,
    handleSubmit,
    submit,
    resetFilterForm,
    closeFilterForm,
    reportFilterFormFields,
    isPortalOpen,
  } = useFilterReport();

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
        <Box mt={1}>
          <FormProvider methods={methods}>
            <FormGrid formFieldsList={reportFilterFormFields} />
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};
