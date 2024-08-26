import { useEffect } from 'react';
import { useLazyGetAssignedUsersQuery } from '@/services/airSales/task';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { viewTaskDefaultValues } from './TaskEditor.data';

const useViewTask = (data: any) => {
  const theme = useTheme();
  const usersData = useLazyGetAssignedUsersQuery();
  const methods: any = useForm({
    defaultValues: viewTaskDefaultValues(data),
  });

  useEffect(() => {
    if (data) {
      methods.reset(viewTaskDefaultValues(data));
    }
  }, [data]);

  return {
    theme,
    methods,
    usersData,
  };
};

export default useViewTask;
