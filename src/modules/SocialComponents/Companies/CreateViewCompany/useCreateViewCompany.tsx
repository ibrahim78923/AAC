import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createViewDefaultValues,
  createViwValidationSchema,
} from './CreateViewCompany.data';

const useCreateViewCompany = () => {
  const theme = useTheme<Theme>();

  const methods: any = useForm<any>({
    resolver: yupResolver(createViwValidationSchema),
    defaultValues: createViewDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    reset();
  };

  return {
    theme,
    methods,
    handleSubmit,
    onSubmit,
    reset,
  };
};

export default useCreateViewCompany;
