import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useGetDealNoteQuery } from '@/services/airSales/deals/view-details/note';
import { PAGINATION } from '@/config';
import { getSession } from '@/utils';

const useNotes = (selected: any) => {
  const theme = useTheme();
  const { user }: any = getSession();

  const [openDrawer, setOpenDrawer] = useState('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<
    { _id: number }[]
  >([]);

  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const params = { page: page, limit: pageLimit, recordId: selected };
  const { data } = useGetDealNoteQuery({ params });

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
    setSelectedCheckboxes,
    handleCheckboxChange,
    selectedCheckboxes,
    setOpenDrawer,
    setPageLimit,
    openDrawer,
    setPage,
    theme,
    data,
    user,
  };
};

export default useNotes;
