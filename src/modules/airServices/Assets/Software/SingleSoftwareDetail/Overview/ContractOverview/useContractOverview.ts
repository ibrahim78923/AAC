import { DATE_TIME_FORMAT } from '@/constants';
import { useGetAssetsSoftwareContractValueQuery } from '@/services/airServices/assets/software/single-software-detail/overview';
import { useTheme } from '@mui/material';
import dayjs from 'dayjs';
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
  const { data, isLoading, isError, isFetching } =
    useGetAssetsSoftwareContractValueQuery(softwareId, {
      refetchOnMountOrArgChange: true,
      skip: !!!softwareId,
    });
  const formatDate = (date: any) => {
    const parsedDate = dayjs(date);
    const presentDate = dayjs();
    const isExpired = presentDate?.isAfter(parsedDate);
    if (isExpired) return 'Expired';
    else {
      const formattedDate = parsedDate?.format(DATE_TIME_FORMAT?.DMMMY);
      const daysDifference = parsedDate?.diff(dayjs(), 'day');
      const finalOutput = `${formattedDate} (in ${daysDifference} days)`;
      return finalOutput;
    }
  };
  return {
    data,
    isLoading,
    isError,
    contractOverviewLabel,
    formatDate,
    theme,
    isFetching,
  };
};
