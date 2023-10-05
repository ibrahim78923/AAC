import { useState } from 'react';

export const UseTasks = () => {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState<number>(0);
  const [activeCheck, setActiveCheck] = useState<any>([]);
  return {
    isAddDrawerOpen,
    setIsAddDrawerOpen,
    isDetailDrawerOpen,
    setIsDetailDrawerOpen,
    activeCheck,
    setActiveCheck,
  };
};
