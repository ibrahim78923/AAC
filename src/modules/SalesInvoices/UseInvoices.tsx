import { useState } from 'react';

const UseInvoices = () => {
  const [isListView, setIsListView] = useState(false);

  return {
    isListView,
    setIsListView,
  };
};

export default UseInvoices;
