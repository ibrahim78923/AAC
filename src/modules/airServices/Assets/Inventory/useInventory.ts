import { useRouter } from 'next/router';

const useInventory = () => {
  const { push } = useRouter();
  const handleAddInventory = () => {
    push('/air-services/assets/inventory/add-inventory');
  };
  return {
    handleAddInventory,
  };
};

export default useInventory;
