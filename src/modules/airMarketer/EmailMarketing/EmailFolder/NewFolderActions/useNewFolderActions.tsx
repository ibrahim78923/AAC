import { useTheme } from '@mui/material';
import { useState } from 'react';
import { folderOptions } from './NewFolderActions.data';

const useNewFolderActions = () => {
  const theme = useTheme();
  const [checkedRows, setCheckedRows] = useState<any>();
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedActionsValue, setSelectedOptionsValue] = useState('');
  const [actionsModalDetails, setActionsModalDetails] = useState({
    isDelete: false,
    isDuplicate: false,
  });

  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  const handleSelectedOptionValue = (option: any) => {
    switch (option) {
      case folderOptions?.DUPLICATE:
        setActionsModalDetails({ ...actionsModalDetails, isDuplicate: true });
        break;
      case folderOptions?.DELETE:
        setActionsModalDetails({ ...actionsModalDetails, isDelete: true });
        break;

      default:
        break;
    }

    setSelectedOptionsValue(option);
    setSelectedValue(null);
  };

  return {
    theme,
    checkedRows,
    setCheckedRows,
    selectedValue,
    handleClick,
    handleSelectedOptionValue,
    selectedActionsValue,
    actionsModalDetails,
    setActionsModalDetails,
  };
};
export default useNewFolderActions;
