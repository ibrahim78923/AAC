import { useState } from 'react';

const useBankAccounts = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  const handleClose = () => {
    setSelectedValue(null);
  };

  return {
    selectedValue,
    setSelectedValue,
    handleClick,
    handleClose,
  };
};

export default useBankAccounts;
