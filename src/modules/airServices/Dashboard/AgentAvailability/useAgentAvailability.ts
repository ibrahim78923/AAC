import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import * as Yup from 'yup';
import { agentAvailabilityCountDynamic } from './AgentAvailability.data';

export const useAgentAvailability = (props: any) => {
  const { data, departmentId, setDepartmentId } = props;

  const theme = useTheme();

  const methods = useForm({
    defaultValues: { departmentId: null },
    resolver: yupResolver(
      Yup?.object()?.shape({
        departmentId: Yup?.mixed()?.nullable(),
      }),
    ),
  });

  const { control, reset, handleSubmit } = methods;

  const watchDepartment: any = useWatch({
    control,
    name: 'departmentId',
  });

  const onsubmit = (data: any) => {
    setDepartmentId?.(data?.departmentId);
  };

  useEffect(() => {
    reset({ departmentId: departmentId });
  }, [departmentId, reset]);

  useEffect(() => {
    handleSubmit(onsubmit)();
  }, [watchDepartment?._id]);

  const pieChartSeries = [
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

  const noAgentAvailable = agentAvailabilityCountDynamic(
    data?.agentAvailability?.data,
  )?.every((department) => department?.count === 0);

  return {
    methods,
    pieChartSeries,
    pieChartOptions,
    agentAvailabilityCount,
    noAgentAvailable,
  };
};
