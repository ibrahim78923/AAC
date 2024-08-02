import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useFilterWorkflow } from './useFilterWorkflow';
import { filterWorkflowsDataFields } from './FilterWorkflow.data';

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
            <Grid container spacing={3}>
              {filterWorkflowsDataFields(userDropdown)?.map((item) => (
                <Grid item xs={12} md={item?.md} key={item?._id}>
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
