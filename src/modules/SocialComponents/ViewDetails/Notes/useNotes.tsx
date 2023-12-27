import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetDealNoteQuery } from '@/services/airSales/deals/view-details/note';
import { PAGINATION } from '@/config';

const useNotes = (companyId: any) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<
    { id: number }[]
  >([]);

  const pagination = {
    page: PAGINATION?.CURRENT_PAGE,
    limit: PAGINATION?.PAGE_LIMIT,
  };

  const params = { ...pagination, recordId: companyId };
  const { data: NotesData } = useGetDealNoteQuery({ params });

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const isChecked = event?.target?.checked;

    if (isChecked) {
      setSelectedCheckboxes((prevSelected) => [...prevSelected, { id: id }]);
    } else {
      setSelectedCheckboxes(
        (prevSelected) => prevSelected?.filter((item) => item?.id !== id),
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
    NotesData,
  };
};

export default useNotes;
