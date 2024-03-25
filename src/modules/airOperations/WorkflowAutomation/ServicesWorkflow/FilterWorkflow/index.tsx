import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useFilterWorkflow } from './useFilterWorkflow';
import { filterWorkflowsDataFields } from './FilterWorkflow.data';

const FilterWorkflow = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen, onSubmitFilter } = props;
  const { handleSubmit, methods, userDropdown, statusValue, createdByValue } =
    useFilterWorkflow();
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
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={3}>
              {filterWorkflowsDataFields(userDropdown)?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};

export default FilterWorkflow;
