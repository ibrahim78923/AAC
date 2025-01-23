import { useGetAssetsSoftwareContractValueQuery } from '@/services/airServices/assets/software/single-software-detail/overview';
import { useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';

export const useContractOverview = (props: {
  contractOverviewLabel: {
    heading: string;
    subHeading1: string;
    subHeading2: string;
  };
}) => {
  const { contractOverviewLabel } = props;
  const theme = useTheme();
  const searchParams = useSearchParams();
  const softwareId = searchParams?.get('softwareId');

  const { data, isLoading, isError, isFetching, refetch } =
    useGetAssetsSoftwareContractValueQuery(softwareId, {
      refetchOnMountOrArgChange: true,
      skip: !!!softwareId,
    });

  return {
    data,
    isLoading,
    isError,
    contractOverviewLabel,
    theme,
    isFetching,
    refetch,
  };
};
