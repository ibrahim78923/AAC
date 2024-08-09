import { useState } from 'react';

const useForecast = () => {
  const [activeTab, setActiveTab] = useState(0);

  return {
    activeTab,
    setActiveTab,
  };
};

export default useForecast;
