import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import {
  rolesListData,
  rolesListsColumnsFunction,
  rolesActionsDropdown,
} from './RolesAndRightTable.data';
import {
  NOTISTACK_VARIANTS,
  ROLES_ACTION_CONSTANTS,
  ROLES_ACTION_CONSTANTS_DRAWER_ACTION,
} from '@/constants/strings';

export const useRolesAndRightTable = () => {
  const [selectedRolesList, setSelectedRolesList] = useState([]);
  const [isRolesFilterDrawerOpen, setRolesFilterDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [editRolesModalTitle, setEditRolesModalTitle] = useState('');
  const [isRolesModalOpen, setIsRolesModalOpen] = useState<boolean>(false);
  const [openDeleteModel, setOpenDeleteModel] = useState<boolean>(false);

  const handleOpenDrawer = () => {
    setRolesFilterDrawerOpen(true);
  };
  const handleCloseEditRole = () => {
    setIsRolesModalOpen(false);
  };
  const handleActionClick = (ActionType: string) => {
    if (ActionType === ROLES_ACTION_CONSTANTS?.DELETE) {
      if (selectedRolesList?.length > 1) {
        enqueueSnackbar(`Record deleted Successfully`, {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        setSelectedRolesList([]);
        return;
      }
      return setOpenDeleteModel(true);
    }

    if (selectedRolesList?.length > 1) {
      enqueueSnackbar(`Can't ${ActionType} multiple records`, {
        variant: NOTISTACK_VARIANTS?.WARNING,
      });
      return;
    }

    if (ActionType === ROLES_ACTION_CONSTANTS?.EDIT) {
      setEditRolesModalTitle(ROLES_ACTION_CONSTANTS_DRAWER_ACTION?.UPDATE_ROLE);
    } else if (ActionType === ROLES_ACTION_CONSTANTS?.VIEW) {
    }

    setIsRolesModalOpen(true);
  };

  const handleAddRolesModal = (isOpen?: boolean) => {
    if (isOpen) {
      setEditRolesModalTitle(ROLES_ACTION_CONSTANTS_DRAWER_ACTION?.ADD_ROLE);
      return setIsRolesModalOpen(true);
    }
    setIsRolesModalOpen(false);
  };

  const RolesListsColumns = rolesListsColumnsFunction(
    selectedRolesList,
    setSelectedRolesList,
    rolesListData,
  );

  const handleDelete = () => {
    setOpenDeleteModel(false);
    setSelectedRolesList([]);
    enqueueSnackbar('Record deleted Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  const handleDeleteClose = () => {
    setOpenDeleteModel(false);
    setSelectedRolesList([]);
  };
  const dropdownOptions = rolesActionsDropdown(handleActionClick);

  return {
    selectedRolesList,
    RolesListsColumns,
    dropdownOptions,
    handleActionClick,
    setSearchValue,
    searchValue,
    handleOpenDrawer,
    isRolesFilterDrawerOpen,
    setRolesFilterDrawerOpen,
    setIsRolesModalOpen,
    isRolesModalOpen,
    setEditRolesModalTitle,
    editRolesModalTitle,
    handleAddRolesModal,
    openDeleteModel,
    setOpenDeleteModel,
    handleDelete,
    handleDeleteClose,
    handleCloseEditRole,
  };
};
