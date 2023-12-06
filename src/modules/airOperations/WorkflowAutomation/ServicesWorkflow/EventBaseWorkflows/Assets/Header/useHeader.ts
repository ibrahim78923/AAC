import { useState } from 'react';
import { EventBaseWorkflowActionsDropdown } from '../Assets.data';

export const useHeader = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleActionClick = () =>
    // ActionType: string
    {
      // if (ActionType === 'delete') {
      //   return setOpenDeleteModel(true);
      // }
      // if (selectedAgentList?.length > 1) {
      //   enqueueSnackbar(`Can't update multiple records`, {
      //     variant: NOTISTACK_VARIANTS?.ERROR,
      //   });
      //   return;
      // }
      // setEditAgentModalTitle('Update Agent');
      // setIsAgentModalOpen(true);
    };
  const dropdownOptions = EventBaseWorkflowActionsDropdown(handleActionClick);
  return {
    searchValue,
    setSearchValue,
    isDrawerOpen,
    setIsDrawerOpen,
    dropdownOptions,
  };
};
