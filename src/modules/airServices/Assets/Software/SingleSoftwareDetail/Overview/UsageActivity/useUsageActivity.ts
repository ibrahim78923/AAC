import { useGetAssetsSoftwareOverviewQuery } from '@/services/airServices/assets/software/single-software-detail/overview';
import { pxToRem } from '@/utils/getFontValue';
import { useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';

export const useUsageActivity = () => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const softwareId = searchParams?.get('softwareId');
  const { data, isLoading, isError, isFetching } =
    useGetAssetsSoftwareOverviewQuery(softwareId, {
      refetchOnMountOrArgChange: true,
      skip: !!!softwareId,
    });

  const activeUsersCount = data?.data?.usageActivity || 0;
  const inactiveUsersCount = data?.data?.inActiveUsers || 0;
  const totalUsersCount = activeUsersCount + inactiveUsersCount;

  const chartOptions = {
    labels: ['Active Users'],
    legend: { show: false },
    colors: [theme?.palette?.primary?.main],
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: {
            show: true,
            total: {
              show: true,
              fontWeight: '600',
              fontSize: pxToRem(16),
              label: 'Total Users',
              formatter: function () {
                return `${totalUsersCount ?? 0}`;
              },
            },
            value: {
              show: true,
              color: theme?.palette?.common?.black,
              fontWeight: '600',
              fontSize: pxToRem(16),
            },
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 3,
        gradientToColors: [theme?.palette?.primary?.light],
        inverseColors: true,
        opacityFrom: 0.5,
        opacityTo: 10,
        stops: [0, 100],
      },
    },
    stroke: {
      width: 0,
    },
  };

  const usageChartData = [data?.data?.usageActivity];
  return {
    theme,
    isLoading,
    isError,
    data,
    isFetching,
    usageChartData,
    chartOptions,
    totalUsersCount,
  };
};
