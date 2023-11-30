import { useState } from 'react';

const useUserReports = () => {
  const [searchBy, setSearchBy] = useState<any>('');

  return {
    searchBy,
    setSearchBy,
  };
};

export default useUserReports;
