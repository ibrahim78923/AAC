import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AutoCompleteLabelI } from './CreateDashboard.interface';
export const useCreateDashboard = () => {
  const theme = useTheme();
  const [accessValue, setAccessValue] = useState('');
  const [anchorElUserList, setAnchorElUserList] = useState<null | HTMLElement>(
    null,
  );
  const [pendingValue, setPendingValue] = useState<AutoCompleteLabelI[]>([]);
  const [specificUsers, setSpecificUser] = useState<AutoCompleteLabelI[]>([]);
  const [usersPermissions, setUsersPermissions] = useState<any[]>([]);
  const handleOpenUserslist = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(specificUsers);
    setAnchorElUserList(event?.currentTarget);
  };

  const handleCloseUserslist = () => {
    setSpecificUser(pendingValue);
    if (anchorElUserList) {
      anchorElUserList?.focus();
    }
    const uniqueNewPermissions = pendingValue?.filter(
      (newItem) => !usersPermissions?.some((item) => item?.id === newItem?.id),
    );
    const updatedPermissions = usersPermissions?.filter(
      (item) => pendingValue?.some((newItem) => newItem?.id === item?.id),
    );
    const combinedPermissions = updatedPermissions?.concat(
      uniqueNewPermissions?.map((newItem) => ({ ...newItem, permission: '' })),
    );
    setUsersPermissions(combinedPermissions);
    setAnchorElUserList(null);
  };
  const handleChangeAccessValue = (event: any) => {
    setAccessValue(event?.target?.value);
    setUsersPermissions([]);
  };
  const setSpecificUserPermissions = (id: string, event: any) => {
    const tempUsersList = usersPermissions?.map((user) =>
      user?.id === id ? { ...user, permission: event?.target?.value } : user,
    );
    setUsersPermissions([...tempUsersList]);
  };
  const methodsCreateDashboardFilterForm = useForm({
    defaultValues: {
      dashboardName: '',
      default: false,
      dashboardItems: [],
    },
  });
  const submitCreateDashboardFilterForm = async () => {};
  const resetCreateDashboardFilterForm = async () => {
    methodsCreateDashboardFilterForm?.reset();
  };
  const dashboardItems: any[] =
    methodsCreateDashboardFilterForm?.watch('dashboardItems');
  return {
    methodsCreateDashboardFilterForm,
    accessValue,
    handleChangeAccessValue,
    specificUsers,
    setPendingValue,
    pendingValue,
    anchorElUserList,
    handleOpenUserslist,
    handleCloseUserslist,
    usersPermissions,
    setSpecificUserPermissions,
    theme,
    submitCreateDashboardFilterForm,
    resetCreateDashboardFilterForm,
    dashboardItems,
  };
};
