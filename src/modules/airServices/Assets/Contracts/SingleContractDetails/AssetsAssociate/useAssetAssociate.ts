import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLazyGetSingleContractListQuery } from '@/services/airServices/assets/contracts/single-contract-details/asset-associates';

export const useAssetAssociate = () => {
  const searchParams = useSearchParams();
  const contractId = searchParams?.get('contractId');
  const [
    getContractTrigger,
    { data, isLoading, isFetching, isError, isSuccess },
  ]: any = useLazyGetSingleContractListQuery();
  useEffect(() => {
    const handleContract = async () => {
      await getContractTrigger(contractId);
    };
    handleContract();
  }, [contractId, getContractTrigger]);
  const assetAssociatedData = data?.data?.associatedAsset;
  const associatedAssetArray = assetAssociatedData ? [assetAssociatedData] : [];
  return {
    isLoading,
    isFetching,
    isError,
    isSuccess,
    associatedAssetArray,
  };
};
