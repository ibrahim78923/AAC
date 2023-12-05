import { useState } from 'react';

const useMarketerReports = () => {
  const [searchBy, setSearchBy] = useState<any>('');
  const cardBorder = '#D2D6DF';

  return {
    searchBy,
    setSearchBy,
    cardBorder,
  };
};

export default useMarketerReports;
