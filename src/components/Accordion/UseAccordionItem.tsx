import { useState } from 'react';

export const useAccordionItem = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleAccordionClick = () => {
    setIsActive(!isActive);
  };
  return {
    isActive,
    setIsActive,
    handleAccordionClick,
  };
};
