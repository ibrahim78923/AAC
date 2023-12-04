import { useState } from 'react';

const useMarketerReports = () => {
  const [searchBy, setSearchBy] = useState<any>('');

  return {
    searchBy,
    setSearchBy,
  };
};

export default useMarketerReports;
