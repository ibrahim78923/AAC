import { useState } from 'react';
export const useCallTags = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    !event.target.checked ? setIsChecked(false) : setIsChecked(true);
  };

  return {
    isChecked,
    handleCheckboxChange,
    search,
    setSearch,
    isDrawerOpen,
    setIsDrawerOpen,
  };
};
