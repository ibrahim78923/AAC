import { useTheme } from '@mui/material';
import { useState } from 'react';
import { userDropdown, userList } from './User.data';

export const useUser = () => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedUserList, setSelectedUserList] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const userDropdownOptions = userDropdown(setDeleteModal);
  const userListColumn = userList(
    selectedUserList,
    setSelectedUserList,
    setIsDrawerOpen,
  );
  return {
    theme,
    selectedUserList,
    setSelectedUserList,
    userListColumn,
    searchValue,
    setSearchValue,
    isDrawerOpen,
    setIsDrawerOpen,
    userDropdownOptions,
    deleteModal,
    setDeleteModal,
  };
};
