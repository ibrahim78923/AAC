import { useState } from 'react';

export const useAssetsAssociateDetail = () => {
  const [activeCheck, setActiveCheck] = useState<string[]>([]);
  return {
    activeCheck,
    setActiveCheck,
  };
};
