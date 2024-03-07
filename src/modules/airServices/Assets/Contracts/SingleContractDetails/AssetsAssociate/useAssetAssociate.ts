import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { useGetSingleContractListQuery } from '@/services/airServices/assets/contracts/single-contract-details/asset-associates';

export const useAssetAssociate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contractId = searchParams?.get('contractId');
  const { data, isLoading, isFetching, isError, isSuccess }: any =
    useGetSingleContractListQuery(contractId);
  const assetAssociatedData = [data?.data?.associatedAsset];
  const handleAddAssociateAsset = () => {
    router?.push({
      pathname: AIR_SERVICES?.ADD_ASSOCIATE_ASSET,
      query: { contractId },
    });
  };
  return {
    handleAddAssociateAsset,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    assetAssociatedData,
  };
};
