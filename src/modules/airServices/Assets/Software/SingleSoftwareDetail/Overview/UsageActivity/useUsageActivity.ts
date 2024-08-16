import { useGetAssetsSoftwareOverviewQuery } from '@/services/airServices/assets/software/single-software-detail/overview';
import { useTheme } from '@mui/material';
import { useDrawingArea } from '@mui/x-charts';
import { useSearchParams } from 'next/navigation';
import { UsageActivityI } from './UsageActivity.interface';

export const useUsageActivity = (props: UsageActivityI) => {
  const { usageActivityLabel, usageActivityData } = props;
  const theme = useTheme();
  const { width, height, left, top } = useDrawingArea();
  const searchParams = useSearchParams();
  const softwareId = searchParams?.get('softwareId');
  const { data, isLoading, isError, isFetching } =
    useGetAssetsSoftwareOverviewQuery(softwareId, {
      refetchOnMountOrArgChange: true,
      skip: !!!softwareId,
    });
  return {
    theme,
    usageActivityLabel,
    isLoading,
    isError,
    data,
    usageActivityData,
    width,
    height,
    left,
    top,
    isFetching,
  };
};
