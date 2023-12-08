import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { allServicesData } from './Services.data';
const useServices = () => {
  const [results, setResults] = useState<any[]>(allServicesData);
  const router = useRouter();
  const subQuery = router?.query?.subQuery;
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (!subQuery) {
      setResults(allServicesData);
      return;
    }

    const filteredServices = allServicesData.filter(
      (service) => service?.categoryName === String(subQuery),
    );
    setResults(filteredServices);
  }, [subQuery]);

  return {
    results,
    selectedCheckboxes,
    setSelectedCheckboxes,
    open,
    setOpen,
    handleClickOpen,
  };
};

export default useServices;
