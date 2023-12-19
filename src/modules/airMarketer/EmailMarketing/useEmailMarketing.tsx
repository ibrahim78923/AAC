import { useTheme } from '@mui/material';
import { useState } from 'react';
import { emailOptions } from './EmailMarketing.data';

const useEmailMarketing = () => {
  const theme = useTheme();
  const [checkedRows, setCheckedRows] = useState<any>();
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedActionsValue, setSelectedOptionsValue] = useState('');
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [searchEmailMarketing, setSearchEmailMarketing] = useState('');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [actionsModalDetails, setActionsModalDetails] = useState({
    isViewDeatsils: false,
    isDuplicate: false,
    isArchive: false,
    isDelete: false,
    isMoveToFolder: false,
    isSaveAsTemplate: false,
  });
  const [isDelete, setIsDelete] = useState(false);

  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };
  const handleOpenFilter = () => {
    setIsOpenFilter(true);
  };
  const handleExportModalOpen = () => {
    setIsExportModalOpen(!isExportModalOpen);
  };
  const handleSelectedOptionValue = (option: any) => {
    switch (option) {
      case emailOptions?.DUPLICATE:
        setActionsModalDetails({ ...actionsModalDetails, isDuplicate: true });
        break;
      case emailOptions?.ARCHIVED:
        setActionsModalDetails({ ...actionsModalDetails, isArchive: true });
        break;

      case emailOptions?.DELETE:
        setActionsModalDetails({
          ...actionsModalDetails,
          isDelete: true,
        });
        break;
      case emailOptions?.VIEW_DETAILS:
        setActionsModalDetails({
          ...actionsModalDetails,
          isViewDeatsils: true,
        });
        break;
      case emailOptions?.MOVE_TO_FOLDER:
        setActionsModalDetails({
          ...actionsModalDetails,
          isMoveToFolder: true,
        });
        break;
      case emailOptions?.SAVE_EMAIL_AS_TEMPLATE:
        setActionsModalDetails({
          ...actionsModalDetails,
          isSaveAsTemplate: true,
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
    handleExportModalOpen,
    isExportModalOpen,
    searchEmailMarketing,
    setSearchEmailMarketing,
  };
};
export default useEmailMarketing;
