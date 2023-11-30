import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  defaultValuesAgentFilter,
  validationSchemaAgentFilterFields,
} from './AgentFilter.data';

export const useAgentFilter = (props: any) => {
  const { setAgentFilterDrawerOpen } = props;
  const agentFilterDrawerMethods: any = useForm({
    resolver: yupResolver(validationSchemaAgentFilterFields),
    defaultValues: defaultValuesAgentFilter,
  });
  const onSubmit = async () => {
    enqueueSnackbar('Form Submit Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setAgentFilterDrawerOpen(false);
    agentFilterDrawerMethods?.reset();
  };

  const handleCloseDrawer = () => {
    setAgentFilterDrawerOpen(false);
  };

  return {
    onSubmit,
    handleCloseDrawer,
    agentFilterDrawerMethods,
  };
};
