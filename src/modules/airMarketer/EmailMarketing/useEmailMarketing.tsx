import { useTheme } from '@mui/material';
import { useState } from 'react';
import { emailOptions } from './EmailMarketing.data';

const useEmailMarketing = () => {
  const theme = useTheme();
  const [checkedRows, setCheckedRows] = useState<any>();
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedActionsValue, setSelectedOptionsValue] = useState('');
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [actionsModalDetails, setActionsModalDetails] = useState({
    isClone: false,
    isOpenFilterDrawer: false,
    isExportCompaign: false,
    isEditCompaign: false,
    isEditColumns: false,
    isViewDeatsils: false,
    isDuplicate: false,
    isArchive: false,
  });
  const [isDelete, setIsDelete] = useState(false);

  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };
  const handleOpenFilter = () => {
    setIsOpenFilter(true);
  };
  const handleSelectedOptionValue = (option: any) => {
    switch (option) {
      case emailOptions?.DUPLICATE:
        setActionsModalDetails({ ...actionsModalDetails, isDuplicate: true });
        break;
      case emailOptions?.ARCHIVED:
        setActionsModalDetails({ ...actionsModalDetails, isArchive: true });
        break;

      case emailOptions?.VIEW_DETAILS:
        setActionsModalDetails({
          ...actionsModalDetails,
          isViewDeatsils: true,
        });
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
    isDelete,
    setIsDelete,
    actionsModalDetails,
    setActionsModalDetails,
    isOpenFilter,
    setIsOpenFilter,
    handleOpenFilter,
  };
};
export default useEmailMarketing;
