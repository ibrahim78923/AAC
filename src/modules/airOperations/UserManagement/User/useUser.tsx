import { useTheme } from '@mui/material';
import { useState } from 'react';
import { UserList } from './User.data';

export const useUser = () => {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedUserList, setSelectedUserList] = useState<any>([]);
  const userListColumn = UserList(selectedUserList, setSelectedUserList);
  return {
    theme,
    selectedUserList,
    setSelectedUserList,
    userListColumn,
    searchValue,
    setSearchValue,
  };
};
