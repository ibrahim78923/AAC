import { useState } from 'react';

const useItemsDetails = () => {
  const [itemsList, setItemsList] = useState([
    {
      itemName: '',
      description: '',
      costPerItem: null,
      quantity: null,
      taxRate: null,
      total: null,
    },
  ]);
  const [itemsRows, setItemsRows] = useState<any>([{}]);

  const handleAddAdditionalItems = () => {
    setItemsRows((prev: any) => [...prev, {}]);
  };

  return {
    itemsList,
    itemsRows,
    setItemsList,
    handleAddAdditionalItems,
  };
};
export default useItemsDetails;
