import { useState } from 'react';

export const useAccordion = () => {
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
