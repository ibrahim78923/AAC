import { useGetAssetsSoftwareOverviewQuery } from '@/services/airServices/assets/software/single-software-detail/overview';
import { useTheme } from '@mui/material';
import { useDrawingArea } from '@mui/x-charts';
import { useSearchParams } from 'next/navigation';

export const useUsageActivity = (props: any) => {
  const { usageActivityLabel, usageActivityData } = props;
  const theme: any = useTheme();
  const { width, height, left, top } = useDrawingArea();
  const searchParams = useSearchParams();
  const softwareId = searchParams.get('softwareId');
  const { data, isLoading, isError } =
    useGetAssetsSoftwareOverviewQuery(softwareId);
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
  };
};
