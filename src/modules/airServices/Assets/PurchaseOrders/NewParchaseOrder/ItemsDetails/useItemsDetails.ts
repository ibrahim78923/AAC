import { useState } from 'react';
import { singleItem } from '../NewPurchaseOrder.data';

const useItemsDetails = () => {
  const [itemsList, setItemsList] = useState([singleItem]);
  const [detailItem, setDetailItem] = useState<any>({});
  const handleAddAdditionalItems = () => {
    setItemsList((prev: any) => {
      return [...prev, singleItem];
    });
  };

  return {
    itemsList,
    setItemsList,
    detailItem,
    setDetailItem,
    handleAddAdditionalItems,
  };
};
export default useItemsDetails;
