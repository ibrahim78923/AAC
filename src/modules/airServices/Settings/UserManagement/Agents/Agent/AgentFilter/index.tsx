import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { useAgentFilter } from './useAgentFilter';

const AgentFilter = (props: any) => {
  const { isAgentFilterDrawerOpen } = props;
  const {
    onSubmit,
    handleCloseDrawer,
    agentFilterDrawerMethods,
    agentFilterFormFields,
  } = useAgentFilter(props);
  return (
    <>
      <CommonDrawer
        footer={true}
        isDrawerOpen={isAgentFilterDrawerOpen}
        onClose={handleCloseDrawer}
        title="Filters"
        okText="Apply"
        isOk
        submitHandler={agentFilterDrawerMethods?.handleSubmit?.(onSubmit)}
      >
        <Box mt={1}>
          <FormProvider methods={agentFilterDrawerMethods}>
            <Grid container spacing={3}>
              {agentFilterFormFields?.map((form: any) => (
                <Grid item xs={12} key={form?.id}>
                  <form.component {...form?.componentProps} size="small" />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};

export default AgentFilter;
