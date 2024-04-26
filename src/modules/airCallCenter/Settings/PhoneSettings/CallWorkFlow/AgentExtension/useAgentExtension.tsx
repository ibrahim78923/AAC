import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  agentExtDefaultValues,
  agentExtValidationSchema,
} from './AgentExtension.data';

const useAgentExtension = () => {
  const navigate = useRouter();
  //states
  const theme = useTheme();
  const methods: any = useForm({
    resolver: yupResolver(agentExtValidationSchema),
    defaultValues: agentExtDefaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = () => {
    // console.log(values)
  };

  //functions

  return {
    theme,
    navigate,
    methods,
    handleSubmit,
    onSubmit,
  };
};

export default useAgentExtension;
