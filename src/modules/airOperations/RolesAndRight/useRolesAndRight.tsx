import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  rolesActionsDropdown,
  rolesAndRightListData,
  rolesListsColumnsFunction,
} from './RolesAndRight.data';

export const useRolesAndRight = () => {
  const [selectedAgentList, setSelectedAgentList] = useState([]);
  const [isAgentFilterDrawerOpen, setAgentFilterDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [editAgentModalTitle, setEditAgentModalTitle] = useState('Edit');
  const [isAgentModalOpen, setIsAgentModalOpen] = useState<boolean>(false);
  const [openDeleteModel, setOpenDeleteModel] = useState<boolean>(false);

  const handleOpenDrawer = () => {
    setAgentFilterDrawerOpen(true);
  };

  const handleActionClick = (ActionType: string) => {
    if (ActionType === 'delete') {
      return setOpenDeleteModel(true);
    }
    if (selectedAgentList?.length > 1) {
      enqueueSnackbar(`Can't update multiple records`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
      return;
    }
    setEditAgentModalTitle('Update Agent');
    setIsAgentModalOpen(true);
  };

  const handleAddAgentModal = (isOpen?: boolean) => {
    if (isOpen) {
      setEditAgentModalTitle('Invite Agent');
      return setIsAgentModalOpen(true);
    }
    setIsAgentModalOpen(false);
  };

  const rolesListsColumns = rolesListsColumnsFunction(
    selectedAgentList,
    setSelectedAgentList,
    rolesAndRightListData,
  );

  const handleDelete = () => {
    setOpenDeleteModel(false);
    setSelectedAgentList([]);
    enqueueSnackbar('Record deleted Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  const deleteRolesProps = {
    openDeleteModel,
    setOpenDeleteModel,
    handleDelete,
  };

  const dropdownOptions = rolesActionsDropdown(handleActionClick);

  return {
    selectedAgentList,
    rolesListsColumns,
    dropdownOptions,
    handleActionClick,
    setSearchValue,
    searchValue,
    deleteRolesProps,
    handleOpenDrawer,
    isAgentFilterDrawerOpen,
    setAgentFilterDrawerOpen,
    setIsAgentModalOpen,
    isAgentModalOpen,
    setEditAgentModalTitle,
    editAgentModalTitle,
    handleAddAgentModal,
    rolesListsColumnsFunction,
  };
};
