import { useLazyGetDashboardAgentQuery } from '@/services/airServices/dashboard';
import { useLazyGetDepartmentDropdownListQuery } from '@/services/airServices/tickets/single-ticket-details/tasks';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const usePieChart = () => {
  const theme = useTheme();
  const departmentDropdown = useLazyGetDepartmentDropdownListQuery();
  const [getDashboardAgentTrigger, { data: pieChart, isLoading, isFetching }] =
    useLazyGetDashboardAgentQuery();
  const methods = useForm({
    defaultValues: { departmentId: null },
    resolver: yupResolver(
      Yup?.object()?.shape({
        departmentId: Yup?.mixed()?.nullable(),
      }),
    ),
  });

  useEffect(() => {
    const onSubmit = () => {
      methods.handleSubmit((formData: any) => {
        const params = formData?.departmentId
          ? { departmentId: formData?.departmentId?._id }
          : null;
        getDashboardAgentTrigger(params);
      })();
    };
    onSubmit();
    methods.watch(onSubmit);
  }, [methods, getDashboardAgentTrigger]);
  const pieChartData = pieChart?.data;
  const pieChartSeries = [
    pieChartData?.availableAgents || 0,
    pieChartData?.unAvailableAgents || 0,
  ];
  return {
    pieChartData,
    methods,
    departmentDropdown,
    theme,
    pieChartSeries,
    isLoading,
    isFetching,
  };
};
