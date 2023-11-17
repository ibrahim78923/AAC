import { useState } from 'react';

import { useTheme } from '@mui/material';

const useNotes = () => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<
    { id: number }[]
  >([]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const isChecked = event?.target?.checked;

    if (isChecked) {
      setSelectedCheckboxes((prevSelected) => [...prevSelected, { id: id }]);
    } else {
      setSelectedCheckboxes((prevSelected) =>
        prevSelected.filter((item) => item.id !== id),
      );
    }
  };

  return {
    openDrawer,
    setOpenDrawer,
    theme,
    selectedCheckboxes,
    handleCheckboxChange,
  };
};

export default useNotes;
