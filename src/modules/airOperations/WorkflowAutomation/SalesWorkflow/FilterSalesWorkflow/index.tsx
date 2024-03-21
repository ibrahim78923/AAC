import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { salesWorkflowFilterFields } from './FilterSalesWorkflow.data';
import { useFilterSalesWorkflow } from './useFilterSalesWorkflow';

export const FilterSalesWorkflow = (props: any) => {
  const { isFilterOpen, setIsFilterOpen, loading, onSubmit } = props;
  const {
    filterMethod,
    handleSubmit,
    userDropdown,
    statusValue,
    createdByValue,
  } = useFilterSalesWorkflow();
  return (
    <CommonDrawer
      isDrawerOpen={isFilterOpen}
      onClose={() => setIsFilterOpen?.(false)}
      title="Filters"
      footer
      isOk
      isCancel={false}
      okText="Apply"
      submitHandler={handleSubmit(onSubmit)}
      isLoading={loading}
      isDisabled={!(statusValue || createdByValue)}
    >
      <FormProvider methods={filterMethod} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {salesWorkflowFilterFields(userDropdown)?.map((item) => (
            <Grid item key={item?.id} xs={12}>
              <item.component {...item?.componentProps} size="small" />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};
