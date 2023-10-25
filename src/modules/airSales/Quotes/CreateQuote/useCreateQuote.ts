import { useState } from 'react';

const useCreateQuote = () => {
  const [isOpenFormCreateDeal, setIsOpenFormCreateDeal] = useState(false);
  const handleOpenFormCreateDeal = () => {
    setIsOpenFormCreateDeal(true);
  };
  const handleCloseFormCreateDeal = () => {
    setIsOpenFormCreateDeal(false);
  };

  return {
    isOpenFormCreateDeal,
    setIsOpenFormCreateDeal,
    handleOpenFormCreateDeal,
    handleCloseFormCreateDeal,
  };
};

export default useCreateQuote;
