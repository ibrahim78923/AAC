import { useState } from 'react';

const useContractTable = () => {
  const [activeTab, setActiveTab] = useState(0);

  return {
    activeTab,
    setActiveTab,
  };
};

export default useContractTable;
