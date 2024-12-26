import { useTheme } from '@mui/material';
import {
  agentAvailabilityCountDynamic,
  agentsAvailabilityValidationSchema,
} from './AgentAvailability.data';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setDepartmentWiseAgents } from '@/redux/slices/airServices/dashboard/slice';
import { departmentWiseAgentSelector } from '@/redux/slices/airServices/dashboard/selectors';
import { useFormLib } from '@/hooks/useFormLib';

export const useAgentAvailability = (props: any) => {
  const { data } = props;

  const departmentWiseAgents = useAppSelector(departmentWiseAgentSelector);

  const dispatch = useAppDispatch();

  const theme = useTheme();

  const formLibProps = {
    defaultValues: { departmentId: departmentWiseAgents },
    validationSchema: agentsAvailabilityValidationSchema,
  };

  const { methods } = useFormLib(formLibProps);

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
