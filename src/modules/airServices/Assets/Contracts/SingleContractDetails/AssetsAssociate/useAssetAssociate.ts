import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';

export const useAssetAssociate = () => {
  const router = useRouter();
  const handleAddAssociateAsset = () => {
    router?.push({
      pathname: AIR_SERVICES?.ADD_ASSOCIATE_ASSET,
    });
  };
  return {
    handleAddAssociateAsset,
  };
};
