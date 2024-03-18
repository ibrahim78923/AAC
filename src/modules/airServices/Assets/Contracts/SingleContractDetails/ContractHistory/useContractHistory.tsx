import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useGetSingleContractByIdQuery } from '@/services/airServices/assets/contracts';

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
    useGetSingleContractByIdQuery(getSingleContractParameter, {
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
