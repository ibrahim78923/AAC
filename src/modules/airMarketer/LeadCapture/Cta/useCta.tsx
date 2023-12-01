import { useState } from 'react';
import { useTheme } from '@mui/material';

const useCta = () => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState('');
  const [openModal, setOpenModal] = useState('');

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [checkExportFormats, setCheckExportFormats] = useState([]);

  const handlecheckExportFormats = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    const isChecked = event?.target?.checked;

    if (isChecked) {
      setCheckExportFormats((prevSelected) => [...prevSelected, name]);
    } else {
      setCheckExportFormats(
        (prevSelected) => prevSelected?.filter((item) => item !== name),
      );
    }
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: any,
  ) => {
    const isChecked = event?.target?.checked;

    if (isChecked) {
      setSelectedCheckboxes((prevSelected) => [...prevSelected, row]);
    } else {
      setSelectedCheckboxes(
        (prevSelected) =>
          prevSelected?.filter((item) => item?._id !== row?._id),
      );
    }
  };

  return {
    openDrawer,
    setOpenDrawer,
    openModal,
    setOpenModal,
    theme,
    handleCheckboxChange,
    selectedCheckboxes,
    setSelectedCheckboxes,
    searchTerm,
    setSearchTerm,
    handlecheckExportFormats,
    checkExportFormats,
  };
};

export default useCta;
