import { useRouter } from 'next/router';

export const useAssetAssociate = () => {
  const router = useRouter();
  const handleAddAssociateAsset = () => {
    router.push({
      pathname: '/air-services/assets/contracts/detail/add-associate-asset',
    });
  };
  return {
    handleAddAssociateAsset,
  };
};
