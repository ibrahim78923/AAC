import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useFilterWorkflow } from './useFilterWorkflow';
import { filterWorkflowsDataFields } from './FilterWorkflow.data';

const FilterWorkflow = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const { handleSubmit, onSubmit, methods } = useFilterWorkflow(props);
  return (
    <>
      <CommonDrawer
        footer={true}
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen?.(false)}
        title="Send for Approvals"
        okText="Send"
        isOk
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={3}>
              {filterWorkflowsDataFields?.map((item: any) => (
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
