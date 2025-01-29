import { useGetAssetsSoftwareContractUtilizationQuery } from '@/services/airServices/assets/software/single-software-detail/overview';
import { useMediaQuery, useTheme } from '@mui/material';
import { useDrawingArea } from '@mui/x-charts';
import { useSearchParams } from 'next/navigation';
import { ARRAY_INDEX } from '@/constants/strings';
import { pxToRem } from '@/utils/getFontValue';

export const useContractUtilization = () => {
  const theme: any = useTheme();
  const { width, height, left, top } = useDrawingArea();
  const searchParams = useSearchParams();
  const softwareId = searchParams?.get('softwareId');
  const { data, isLoading, isError, isFetching, refetch } =
    useGetAssetsSoftwareContractUtilizationQuery(softwareId, {
      refetchOnMountOrArgChange: true,
      skip: !!!softwareId,
    });

  const transformDataIfAllZero = (contractUtilizationData: any) => {
    const inActiveUsers = data?.data?.[ARRAY_INDEX?.ZERO]?.inActiveUsers;
    const inActiveContracts =
      data?.data?.[ARRAY_INDEX?.ZERO]?.inActiveContracts;
    const transformableData = {
      inActiveContracts: inActiveContracts,
      inActiveUsers: inActiveUsers,
    };
    const allZero = Object?.values(transformableData)?.every(
      (value) => value === 0,
    );
    return allZero
      ? contractUtilizationData?.map(
          (
            item: {
              textLabel: string;
              heading: string;
            },
            index: number,
          ) => ({
            ...item,
            value: index === 0 ? 1e-10 : 1e-10,
          }),
        )
      : contractUtilizationData?.map(
          (
            item: {
              textLabel: string;
              heading: string;
            },
            index: number,
          ) => ({
            ...item,
            value: index === 0 ? inActiveUsers : inActiveContracts,
          }),
        );
  };

  const inActiveUsers = data?.data?.[ARRAY_INDEX?.ZERO]?.inActiveUsers ?? 0;
  const inActiveContracts =
    data?.data?.[ARRAY_INDEX?.ZERO]?.inActiveContracts ?? 0;
  const contractCount =
    data?.data?.[ARRAY_INDEX?.ZERO]?.contractUtilization ?? 0;

  const totalCount = contractCount + inActiveUsers + inActiveContracts;

  const isMobile = useMediaQuery(theme?.breakpoints?.down('sm'));

  const options: any = {
    labels: ['Inactive Contracts', 'Inactive Users'],
    legend: { show: false },
    colors: [theme?.palette?.primary?.main, theme?.palette?.blue?.dark],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 20,
          size: '50%',
          background: !isMobile && theme?.palette?.common?.white,
        },
        dataLabels: {
          value: {
            show: !isMobile,
            color: theme?.palette?.common?.black,
            fontWeight: '600',
            fontSize: pxToRem(14),
          },
          total: {
            show: !isMobile,
            label: 'Purchased',
            formatter: function () {
              return `${
                data?.data?.[ARRAY_INDEX?.ZERO]?.contractUtilization ?? 0
              }`;
            },
            color: theme?.palette?.common?.black,
            fontSize: pxToRem(14),
          },
        },
      },
    },
    stroke: {
      lineCap: 'round',
    },
  };

  const contractUtilizationChartData = [inActiveContracts, inActiveUsers];

  return {
    theme,
    isLoading,
    isError,
    data,
    transformDataIfAllZero,
    width,
    height,
    left,
    top,
    isFetching,
    options,
    contractUtilizationChartData,
    totalCount,
    refetch,
  };
};
