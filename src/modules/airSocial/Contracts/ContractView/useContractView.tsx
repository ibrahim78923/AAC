import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useGetCommonContractByIdQuery } from '@/services/commonFeatures/contracts';

export default function useContractView() {
  const router = useRouter();
  const downloadRef = useRef(null);

  const { contractId } = router?.query;
  const { data: dataContractById, isLoading: loadingGetContractById } =
    useGetCommonContractByIdQuery(contractId, { skip: !contractId });

  return {
    dataContractById,
    loadingGetContractById,
    downloadRef,
  };
}
