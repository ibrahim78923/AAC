import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetDealNoteQuery } from '@/services/airSales/deals/view-details/note';
import { PAGINATION } from '@/config';

const useNotes = (companyId: any) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState('');
  const [rowData, setRowData] = useState('');
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
    item: any,
  ) => {
    setRowData(item);
    const isChecked = event?.target?.checked;

    if (isChecked) {
      setSelectedCheckboxes((prevSelected) => [
        ...prevSelected,
        { id: item._id },
      ]);
    } else {
      setSelectedCheckboxes(
        (prevSelected) =>
          prevSelected?.filter((item: any) => item?.id !== item._id),
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
    rowData,
  };
};

export default useNotes;
