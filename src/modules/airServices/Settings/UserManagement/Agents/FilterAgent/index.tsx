import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box } from '@mui/material';
import { useAgentFilter } from './useAgentFilter';
import { IAgentsProps } from '../Agents.interface';
import { agentFilterFields } from './AgentFilter.data';
import { FormGrid } from '@/components/Grids/FormGrid';

const AgentFilter = (props: IAgentsProps) => {
  const { isAgentFilterDrawerOpen } = props;

  const {
    onSubmit,
    handleCloseDrawer,
    resetAgentFilterForm,
    handleSubmit,
    methods,
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
          <FormProvider methods={methods}>
            <FormGrid formFieldsList={agentFilterFields} />
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};

export default AgentFilter;
