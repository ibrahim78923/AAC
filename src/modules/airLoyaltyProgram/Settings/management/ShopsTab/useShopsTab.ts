import { useState } from 'react';

export const useShopsTab = () => {
  const [openDetailDrawer, setOpenDetailDrawer] = useState<any>({
    isOpen: false,
    _id: undefined,
  });

  const [selectedCardList, setSelectedCardList] = useState<any>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addShopModalOpen, setAddShopModalOpen] = useState(false);
  const [search, setSearch] = useState<any>([]);

  const handleSelect = (selectedValue: any) => {
    setSelectedCardList((prev: any) => {
      let cardList = [...prev];
      const isExist = prev?.find(
        (list: any) => list?._id === selectedValue?._id,
      );
      !!isExist
        ? (cardList = cardList?.filter(
            (list) => list?._id !== selectedValue?._id,
          ))
        : cardList?.push(selectedValue);
      return cardList;
    });
  };
  const handleSelectAll = (list: any) => {
    setSelectedCardList(list);
  };

  return {
    search,
    setSearch,
    handleSelect,
    handleSelectAll,
    selectedCardList,
    openDetailDrawer,
    setOpenDetailDrawer,
    deleteModalOpen,
    setDeleteModalOpen,
    addShopModalOpen,
    setAddShopModalOpen,
  };
};
