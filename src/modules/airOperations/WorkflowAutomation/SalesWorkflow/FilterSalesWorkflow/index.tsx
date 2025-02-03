import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { useFilterSalesWorkflow } from './useFilterSalesWorkflow';
import { FilterSalesWorkflowI } from './FilterSalesWorkflow.interface';
import { FormGrid } from '@/components/Grids/FormGrid';

export const FilterSalesWorkflow: React.FC<FilterSalesWorkflowI> = (props) => {
  const { isFilterOpen, setIsFilterOpen, loading, onSubmit } = props;
  const {
    methods,
    handleSubmit,
    handleReset,
    buttonCalled,
    createdByValue,
    statusValue,
    typeValue,
    salesWorkflowFilterFormFields,
  } = useFilterSalesWorkflow(props);

  return (
    <CommonDrawer
      isDrawerOpen={isFilterOpen}
      onClose={() => setIsFilterOpen?.(false)}
      title="Filters"
      footer
      isOk
      okText="Apply"
      submitHandler={handleSubmit(onSubmit)}
      isLoading={loading && !buttonCalled}
      isCancel
      cancelText="Reset"
      cancelBtnHandler={handleReset}
      disabledCancelBtn={loading}
      isDisabled={loading || !(statusValue || createdByValue || typeValue)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <FormGrid formFieldsList={salesWorkflowFilterFormFields} />
      </FormProvider>
    </CommonDrawer>
  );
};
