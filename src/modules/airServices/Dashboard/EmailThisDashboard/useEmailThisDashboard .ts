import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createEmailThisDashboardDefaultValues,
  createEmailThisDashboardValidationSchema,
} from './EmailThisDashboard.data';

export function useEmailThisDashboard() {
  const methods: any = useForm({
    resolver: yupResolver(createEmailThisDashboardValidationSchema),
    defaultValues: createEmailThisDashboardDefaultValues,
  });

  const { handleSubmit } = methods;

  const submit = () => {};
  const theme = useTheme();
  const router = useRouter();

  return {
    theme,
    router,
    handleSubmit,
    methods,
    submit,
  };
}
