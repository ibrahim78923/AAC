import { MouseEvent, useState } from 'react';

export const useSelectAgentsModal = () => {
  const [pendingValue, setPendingValue] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [anchorElUserList, setAnchorElUserList] = useState<null | HTMLElement>(
    null,
  );
  const handleOpenUsersList = (event: MouseEvent<HTMLElement>) => {
    setPendingValue(agents);
    setAnchorElUserList(event?.currentTarget);
  };

  const handleCloseUsersList = () => {
    setAgents(pendingValue);
    if (anchorElUserList) {
      anchorElUserList?.focus();
    }
    setAnchorElUserList(null);
  };
  return {
    agents,
    setPendingValue,
    pendingValue,
    handleCloseUsersList,
    anchorElUserList,
    handleOpenUsersList,
    setAgents,
  };
};
