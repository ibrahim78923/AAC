import { useTheme, Theme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './AddRoleDrawer.data';

const useAddRoleDrawer: any = () => {
  const theme = useTheme<Theme>();

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
  });

  return {
    theme,
    methods,
  };
};

export default useAddRoleDrawer;
