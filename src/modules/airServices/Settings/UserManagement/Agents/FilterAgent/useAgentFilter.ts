import { useForm } from 'react-hook-form';
import { defaultValuesAgentFilter } from './AgentFilter.data';
import { IAgentsProps } from '../Agents.interface';
import { PAGINATION } from '@/config';

export const useAgentFilter = (props: IAgentsProps) => {
  const {
    setAgentFilterDrawerOpen,
    setFilterAgentData,
    setPage,
    filterAgentData,
  } = props;

  const agentFilterDrawerMethods: any = useForm({
    defaultValues: defaultValuesAgentFilter?.(filterAgentData),
  });

  const { handleSubmit, reset } = agentFilterDrawerMethods;

  const onSubmit = async (data: any) => {
    const agentFiltered: any = Object?.entries(data || {})
      ?.filter(
        ([, value]: any) => value !== undefined && value != '' && value != null,
      )
      ?.reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {});

    if (!Object?.keys(agentFiltered || {})?.length) {
      setFilterAgentData(agentFiltered);
      handleCloseDrawer();
      return;
    }
    setPage?.(PAGINATION?.CURRENT_PAGE);
    setFilterAgentData(agentFiltered);
    handleCloseDrawer();
  };

  const handleCloseDrawer = () => {
    reset?.();
    setAgentFilterDrawerOpen(false);
  };

  const resetAgentFilterForm = async () => {
    if (!!Object?.keys(filterAgentData)?.length) {
      setFilterAgentData({});
    }
    reset();
    setAgentFilterDrawerOpen?.(false);
  };

  return {
    onSubmit,
    handleCloseDrawer,
    agentFilterDrawerMethods,
    resetAgentFilterForm,
    handleSubmit,
  };
};
