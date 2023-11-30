import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import {
  agentListData,
  agentsListsColumnsFunction,
  agentActionsDropdown,
} from './Agent.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useAgent = () => {
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

  const agentListsColumns = agentsListsColumnsFunction(
    selectedAgentList,
    setSelectedAgentList,
    agentListData,
  );

  const handleDelete = () => {
    setOpenDeleteModel(false);
    setSelectedAgentList([]);
    enqueueSnackbar('Record deleted Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  const deleteAgentProps = {
    openDeleteModel,
    setOpenDeleteModel,
    handleDelete,
  };

  const dropdownOptions = agentActionsDropdown(handleActionClick);

  return {
    selectedAgentList,
    agentListsColumns,
    dropdownOptions,
    handleActionClick,
    setSearchValue,
    searchValue,
    deleteAgentProps,
    handleOpenDrawer,
    isAgentFilterDrawerOpen,
    setAgentFilterDrawerOpen,
    setIsAgentModalOpen,
    isAgentModalOpen,
    setEditAgentModalTitle,
    editAgentModalTitle,
    handleAddAgentModal,
  };
};
