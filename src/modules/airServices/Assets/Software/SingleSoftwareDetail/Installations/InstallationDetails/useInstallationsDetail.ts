import { useState } from 'react';

export const useInstallationDetail = () => {
  const [activeCheck, setActiveCheck] = useState<string[]>([]);
  return {
    activeCheck,
    setActiveCheck,
  };
};
