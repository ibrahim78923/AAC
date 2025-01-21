import CommonDrawer from '@/components/CommonDrawer';
import { Box } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useFilterContractsForm } from './useFilterContractsForm';
import { FormGrid } from '@/components/Grids/FormGrid';

const FilterContractsForm = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;

  const {
    methods,
    handleSubmit,
    onSubmit,
    resetContractFilterForm,
    contractsFilterFormFields,
  } = useFilterContractsForm(props);

  return (
    <CommonDrawer
      footer
      isDrawerOpen={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      title="Filters"
      okText="Apply"
      cancelText="Reset"
      isOk
      submitHandler={handleSubmit(onSubmit)}
      cancelBtnHandler={() => resetContractFilterForm?.()}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <FormGrid formFieldsList={contractsFilterFormFields} />
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default FilterContractsForm;
