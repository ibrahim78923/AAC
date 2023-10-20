import { useRouter } from 'next/router';

const useInventory = () => {
  const router = useRouter();
  const { push } = useRouter();
  const handleAddInventory = () => {
    push('/air-services/assets/inventory/add-inventory');
  };
  return {
    handleAddInventory,
    router,
  };
};

export default useInventory;
