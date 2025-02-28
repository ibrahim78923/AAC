import { useGetCommonContractByIdQuery } from '@/services/commonFeatures/contracts';
// import { useRouter } from 'next/router';

export default function useContractView() {
  // const router = useRouter();
  // const { contractId } = router?.query;
  const { data: dataContractById, isLoading: loadingGetContractById } =
    useGetCommonContractByIdQuery('67bec1c9f2afa89e2f555a1d');

  return {
    dataContractById,
    loadingGetContractById,
  };
}
