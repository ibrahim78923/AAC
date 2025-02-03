import CommonDrawer from '@/components/CommonDrawer';
import { Box } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useFilterWorkflow } from './useFilterWorkflow';
import { filterWorkflowsDataFields } from './FilterWorkflow.data';
import { FormGrid } from '@/components/Grids/FormGrid';

const FilterWorkflow = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen, onSubmitFilter } = props;
  const {
    handleSubmit,
    methods,
    userDropdown,
    statusValue,
    createdByValue,
    handleReset,
  } = useFilterWorkflow(props);
  return (
    <>
      <CommonDrawer
        footer={true}
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen?.(false)}
        title="Filters"
        okText="Apply"
        cancelText="Reset"
        isOk
        submitHandler={handleSubmit(onSubmitFilter)}
        isDisabled={!(statusValue || createdByValue)}
        cancelBtnHandler={handleReset}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <FormGrid
              formFieldsList={filterWorkflowsDataFields(userDropdown)}
            />
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};

export default FilterWorkflow;
