import { useGetSingleContractByIdQuery } from '@/services/airServices/assets/contracts';
import { useRouter } from 'next/router';

export const useHeader = () => {
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

  return {
    data,
    isLoading,
    isFetching,
    isError,
    router,
  };
};
