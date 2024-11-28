import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { agentAvailabilityCountDynamic } from './AgentAvailability.data';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setDepartmentWiseAgents } from '@/redux/slices/airServices/dashboard/slice';
import { departmentWiseAgentSelector } from '@/redux/slices/airServices/dashboard/selectors';

export const useAgentAvailability = (props: any) => {
  const { data } = props;

  const departmentWiseAgents = useAppSelector(departmentWiseAgentSelector);

  const dispatch = useAppDispatch();

  const theme = useTheme();

  const methods = useForm({
    defaultValues: { departmentId: departmentWiseAgents },
    resolver: yupResolver(
      Yup?.object()?.shape({
        departmentId: Yup?.mixed()?.nullable(),
      }),
    ),
  });

  const onChangeHandler = (_: any, data: any) => {
    dispatch(setDepartmentWiseAgents?.(data));
  };

  const pieChartSeriesData = [
    data?.agentAvailability?.data?.availableAgents || 0,
    data?.agentAvailability?.data?.unAvailableAgents || 0,
  ];

  const pieChartOptions = {
    colors: [theme?.palette?.success?.main, theme?.palette?.warning?.main],
    labels: ['Available', 'Not Available'],
  };

  const agentAvailabilityCount = agentAvailabilityCountDynamic(
    data?.agentAvailability?.data,
  );

  const pieChartSeries = pieChartSeriesData?.filter(
    (agent: any) => agent !== 0,
  );

  return {
    methods,
    pieChartOptions,
    pieChartSeries,
    agentAvailabilityCount,
    onChangeHandler,
  };
};
