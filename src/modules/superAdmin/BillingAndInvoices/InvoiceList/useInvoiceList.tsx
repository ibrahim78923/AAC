import { useState } from 'react';

const useInvoiceList = () => {
  const [isOpenInvoiceList, setIsOpenInvoiceList] = useState(false);
  const handleCloseInvoiceList = () => {
    setIsOpenInvoiceList(false);
  };
  return { isOpenInvoiceList, setIsOpenInvoiceList, handleCloseInvoiceList };
};
export default useInvoiceList;
