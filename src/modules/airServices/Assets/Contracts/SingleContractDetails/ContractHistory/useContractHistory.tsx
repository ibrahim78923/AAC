import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useGetContractHistoryQuery } from '@/services/airServices/assets/contracts/single-contract-details/contract-history';

export const useContractHistory = () => {
  const theme = useTheme();
  const router = useRouter();

  const { contractId } = router?.query;
  const getContractHistoryParameter = {
    queryParam: {
      id: contractId,
    },
  };
  const { data }: any = useGetContractHistoryQuery(
    getContractHistoryParameter.queryParam,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const contractHistory = data?.data.contracts;
  return {
    contractHistory,
    theme,
  };
};
