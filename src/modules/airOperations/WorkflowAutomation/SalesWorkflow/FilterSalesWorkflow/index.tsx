import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { salesWorkflowFilterFields } from './FilterSalesWorkflow.data';
import { useFilterSalesWorkflow } from './useFilterSalesWorkflow';

export const FilterSalesWorkflow = (props: any) => {
  const { isFilterOpen, setIsFilterOpen } = props;
  const { filterMethod, handleSubmit, onSubmit } =
    useFilterSalesWorkflow(props);
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
    >
      <FormProvider methods={filterMethod} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {salesWorkflowFilterFields?.map((item) => (
            <Grid item key={item?.id} xs={12}>
              <item.component {...item?.componentProps} size="small" />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};
