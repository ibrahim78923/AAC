import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetDealNoteQuery } from '@/services/airSales/deals/view-details/note';

const useNotes = () => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<
    { _id: number }[]
  >([]);
  // const { data } = useGetDealNoteQuery({});

  //Todo: temporarily id this be updated after list view
  const { data } = useGetDealNoteQuery({
    recordId: '654dbb4a211df87d0a9c4d80',
  });

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: any,
  ) => {
    const isChecked = event?.target?.checked;

    if (isChecked) {
      setSelectedCheckboxes((prevSelected) => [...prevSelected, item]);
    } else {
      setSelectedCheckboxes((prevSelected) =>
        prevSelected.filter((selectedItem) => selectedItem?._id !== item?._id),
      );
    }
  };

  return {
    openDrawer,
    setOpenDrawer,
    theme,
    selectedCheckboxes,
    setSelectedCheckboxes,
    handleCheckboxChange,
    data,
  };
};

export default useNotes;
