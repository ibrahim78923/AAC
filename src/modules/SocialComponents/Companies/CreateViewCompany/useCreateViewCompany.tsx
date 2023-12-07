import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';

const useCreateViewCompany = () => {
  const theme = useTheme<Theme>();
  const methods: any = useForm({});

  const { handleSubmit } = methods;

  const onSubmit = async () => {};
  return {
    theme,
    methods,
    handleSubmit,
    onSubmit,
  };
};

export default useCreateViewCompany;
