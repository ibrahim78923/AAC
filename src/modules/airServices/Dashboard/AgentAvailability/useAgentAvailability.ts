import { useLazyGetDepartmentDropdownListQuery } from '@/services/airServices/tickets/single-ticket-details/tasks';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import * as Yup from 'yup';

export const useAgentAvailability = (props: any) => {
  const { data, departmentId, setDepartmentId } = props;
  const theme = useTheme();
  const departmentDropdown = useLazyGetDepartmentDropdownListQuery();

  const methods = useForm({
    defaultValues: { departmentId: departmentId },
    resolver: yupResolver(
      Yup?.object()?.shape({
        departmentId: Yup?.mixed()?.nullable(),
      }),
    ),
  });

  const { control } = methods;

  const watchDepartment = useWatch({
    control,
    name: 'departmentId',
    defaultValue: null,
  });

  useEffect(() => {
    setDepartmentId?.(watchDepartment);
  }, [watchDepartment]);

  const pieChartSeries = [
    data?.agentAvailabilty?.data?.availableAgents || 0,
    data?.agentAvailabilty?.data?.unAvailableAgents || 0,
  ];

  return {
    methods,
    departmentDropdown,
    theme,
    pieChartSeries,
  };
};
