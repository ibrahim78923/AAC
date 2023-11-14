import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AutoCompleteLabelI } from './CreateDashboard.interface';
import { DropResult } from 'react-beautiful-dnd';
import {
  createDashboardDefaultValue,
  dashboardCheckboxData,
} from './CreateDashboard.data';
export const useCreateDashboard = () => {
  const theme = useTheme();
  const methodsCreateDashboardFilterForm = useForm({
    defaultValues: createDashboardDefaultValue,
  });
  const [accessValue, setAccessValue] = useState('');
  const [anchorElUserList, setAnchorElUserList] = useState<null | HTMLElement>(
    null,
  );
  const [dashboardCheckboxItems, setDashboardCheckboxItems] = useState(
    dashboardCheckboxData,
  );
  const [pendingValue, setPendingValue] = useState<AutoCompleteLabelI[]>([]);
  const [specificUsers, setSpecificUser] = useState<AutoCompleteLabelI[]>([]);
  const [usersPermissions, setUsersPermissions] = useState<any[]>([]);
  const dashboardItems: any[] =
    methodsCreateDashboardFilterForm?.watch('dashboardItems');
  //optional chaining does not work on interfaces
  const handleOpenUsersList = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(specificUsers);
    setAnchorElUserList(event?.currentTarget);
  };

  const handleCloseUsersList = () => {
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

  const submitCreateDashboardFilterForm = async () => {};
  const resetCreateDashboardFilterForm = async () => {
    methodsCreateDashboardFilterForm?.reset();
  };
  const alignArrays = (firstArray: string[], secondArray: any[]) => {
    const dragAndDropAlignment = secondArray?.reduce((acc, item) => {
      if (firstArray?.includes(item)) {
        acc?.push(item);
      }
      return acc;
    }, []);
    return dragAndDropAlignment;
  };
  const reorder = <T>(list: T[], startIndex: number, endIndex: number): T[] => {
    const result = Array?.from(list);
    const [removed] = result?.splice(startIndex, 1);
    result?.splice(endIndex, 0, removed);
    return result;
  };
  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    const newItems = reorder(
      dashboardCheckboxItems,
      source?.index,
      destination?.index,
    );
    const dragAndDropAlignment = alignArrays(dashboardItems, newItems);
    methodsCreateDashboardFilterForm?.setValue(
      'dashboardItems',
      dragAndDropAlignment,
    );
    setDashboardCheckboxItems(newItems);
  };

  return {
    methodsCreateDashboardFilterForm,
    accessValue,
    handleChangeAccessValue,
    specificUsers,
    setPendingValue,
    pendingValue,
    anchorElUserList,
    handleOpenUsersList,
    handleCloseUsersList,
    usersPermissions,
    setSpecificUserPermissions,
    theme,
    submitCreateDashboardFilterForm,
    resetCreateDashboardFilterForm,
    dashboardItems,
    onDragEnd,
    dashboardCheckboxItems,
  };
};
