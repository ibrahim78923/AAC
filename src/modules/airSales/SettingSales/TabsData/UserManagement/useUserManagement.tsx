import { useState } from 'react';

const useUserManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isAddTeam, setIsAddTeam] = useState(false);
  const [isAddUser, setIsAddUser] = useState(false);

  return {
    activeTab,
    setActiveTab,
    isCreateTeamOpen,
    setIsCreateTeamOpen,
    isAddTeam,
    setIsAddTeam,
    isAddUser,
    setIsAddUser,
  };
};

export default useUserManagement;
