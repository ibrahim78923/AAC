import { useState } from 'react';

const useInvoicesReports = () => {
  const [searchBy, setSearchBy] = useState<any>('');

  return {
    searchBy,
    setSearchBy,
  };
};

export default useInvoicesReports;
