import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { useAgentFilter } from './useAgentFilter';
import { IAgentsProps } from '../Agents.interface';

const AgentFilter = (props: IAgentsProps) => {
  const { isAgentFilterDrawerOpen } = props;

  const {
    onSubmit,
    handleCloseDrawer,
    agentFilterFormFields,
    resetAgentFilterForm,
    handleSubmit,
    agentFilterDrawerMethods,
  } = useAgentFilter(props);

  return (
    <>
      <CommonDrawer
        footer
        isDrawerOpen={isAgentFilterDrawerOpen as boolean}
        onClose={handleCloseDrawer}
        title="Filters"
        okText="Apply"
        isOk
        submitHandler={() => handleSubmit?.(onSubmit)()}
        cancelText={'Reset'}
        cancelBtnHandler={() => resetAgentFilterForm?.()}
      >
        <Box mt={1}>
          <FormProvider methods={agentFilterDrawerMethods}>
            <Grid container spacing={2}>
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
