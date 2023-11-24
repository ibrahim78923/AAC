import { useTheme } from '@mui/material';
import { useState } from 'react';
const useCompaigns = () => {
  const theme = useTheme();
  const [tabVal, setTabVal] = useState<number>(0);
  const [checkedRows, setCheckedRows] = useState<any>();
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedActionsValue, setSelectedOptionsValue] = useState('');

  const [actionsModalDetails, setActionsModalDetails] = useState({
    isClone: false,
    isOpenFilterDrawer: false,
    isExportCompaign: false,
    isEditCompaign: false,
  });
  const [isDelete, setIsDelete] = useState(false);
  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  const handleSelectedOptionValue = (option: any) => {
    if (option === 'Delete') {
      setIsDelete(true);
    } else if (option === 'Clone') {
      setActionsModalDetails({ ...actionsModalDetails, isClone: true });
    } else if (option === 'Edit Goal') {
      setActionsModalDetails({
        ...actionsModalDetails,
        isOpenFilterDrawer: true,
      });
    } else if (option === 'Export Compaign') {
      setActionsModalDetails({
        ...actionsModalDetails,
        isExportCompaign: true,
      });
    } else if (option === 'Edit Compaign') {
      setActionsModalDetails({
        ...actionsModalDetails,
        isEditCompaign: true,
      });
    }
    setSelectedOptionsValue(option);
    setSelectedValue(null);
  };

  return {
    theme,
    tabVal,
    setTabVal,
    checkedRows,
    setCheckedRows,
    selectedValue,
    handleClick,
    handleSelectedOptionValue,
    selectedActionsValue,
    isDelete,
    setIsDelete,
    actionsModalDetails,
    setActionsModalDetails,
  };
};
export default useCompaigns;
