import { ARRAY_INDEX } from '@/constants/strings';
import { pxToRem } from '@/utils/getFontValue';
import { useTheme } from '@mui/material';

export const useTicketPriorityGraph = (props: any) => {
  const { chartData } = props;
  const theme: any = useTheme();
  const pirorityCounts: { [key: string]: number } = {
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
    URGENT: 0,
  };

  const options: any = {
    labels: ['Low', 'Medium', 'High', 'Urgent'],
    colors: [
      theme?.palette?.warning?.main,
      theme?.palette?.custom?.bright,
      theme?.palette?.success?.main,
      theme?.palette?.error?.main,
    ],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 20,
          size: '50%',
          background: theme?.palette?.secondary?.main,
        },
        dataLabels: {
          value: {
            show: true,
            color: theme?.palette?.primary?.lighter,
            fontSize: pxToRem(16),
          },
          total: {
            show: true,
            label: `${
              chartData?.totalTickets?.[ARRAY_INDEX?.ZERO]?.count ?? 0
            } Tickets`,
            color: theme?.palette?.primary?.lighter,
            fontSize: pxToRem(16),
          },
        },
      },
    },
    stroke: {
      lineCap: 'round',
    },
  };

  chartData?.pirorityStats?.forEach((entry: any) => {
    const { count, pirority } = entry;
    if (pirority) {
      pirorityCounts[pirority] += count;
    }
  });

  const radialBarChartData = [
    pirorityCounts?.LOW,
    pirorityCounts?.MEDIUM,
    pirorityCounts?.HIGH,
    pirorityCounts?.URGENT,
  ];

  return { options, radialBarChartData };
};
