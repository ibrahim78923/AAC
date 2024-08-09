import { useState } from 'react';

const useUserManagement = () => {
  const [activeTab, setActiveTab] = useState(0);

  return {
    activeTab,
    setActiveTab,
  };
};

export default useUserManagement;
