import { useState } from 'react';
import { singleItem } from './ItemsDetails.data';

const useItemsDetails = () => {
  const [itemsList, setItemsList] = useState([singleItem]);
  const [detailItem, setDetailItem] = useState<any>({});

  const handleAddAdditionalItems = () => {
    setItemsList((prev: any) => [...prev, singleItem]);
  };

  const handleChange = (e: any) => {
    setDetailItem((prev: any) => ({
      ...prev,
      [e?.target?.name]: [e?.target?.value],
    }));
  };

  const handleSelectItem = (v: any, data: any, index: number) => {
    const item = data?.find((option: any) => option?.itemName === v);
    setDetailItem(item);
    setItemsList((prev: any) => {
      const data = prev;
      data[index] = item;
      return data;
    });
  };

  return {
    itemsList,
    setItemsList,
    detailItem,
    setDetailItem,
    handleAddAdditionalItems,
    handleChange,
    handleSelectItem,
  };
};
export default useItemsDetails;
