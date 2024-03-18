import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useGetSingleContractHistoryByIdQuery } from '@/services/airServices/assets/contracts/single-contract-details/contract-history';

export const useContractHistory = () => {
  const theme = useTheme();
  const router = useRouter();

  const { contractId } = router?.query;
  const getSingleContractParameter = {
    pathParam: {
      contractId,
    },
  };

  const { data, isLoading, isFetching, isError }: any =
    useGetSingleContractHistoryByIdQuery(getSingleContractParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!contractId,
    });

  const contractHistory = data?.data?.history;
  return {
    contractHistory,
    theme,
    isLoading,
    isFetching,
    isError,
  };
};
