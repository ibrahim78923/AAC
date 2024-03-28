import { pxToRem } from '@/utils/getFontValue';
import { useMediaQuery, useTheme } from '@mui/material';

export default function useRadialBarChart({ chartData }: any) {
  const theme: any = useTheme();
  const pirorityCounts: { [key: string]: number } = {
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
    URGENT: 0,
  };
  const isMobile = useMediaQuery(theme?.breakpoints?.down('sm'));

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
          background: !isMobile && theme?.palette?.secondary?.main,
        },
        dataLabels: {
          value: {
            show: !isMobile,
            color: theme?.palette?.primary?.lighter,
            fontSize: pxToRem(16),
          },
          total: {
            show: !isMobile,
            label: `${chartData?.totalTickets?.[0]?.count ?? 0} Tickets`,
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

  // Aggregate counts based on pirority
  chartData?.pirorityStats?.forEach((entry: any) => {
    const { count, pirority } = entry;
    if (pirority) {
      pirorityCounts[pirority] += count;
    }
  });

  // Extract counts for each pirority in the order required for the chart
  const radialBarChartData = [
    pirorityCounts?.LOW,
    pirorityCounts?.MEDIUM,
    pirorityCounts?.HIGH,
    pirorityCounts?.URGENT,
  ];

  return { options, radialBarChartData };
}
