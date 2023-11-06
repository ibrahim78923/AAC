import { useState } from 'react';

import { allsServices } from './Catalog.data';
import { useRouter } from 'next/router';
const useCatalog = () => {
  const [result, setResult] = useState<any[]>(allsServices);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleClick = (prop: string) => {
    if (prop === 'All Services') {
      setResult(allsServices);
    } else if (prop === 'Software installation') {
      const filteredServices = allsServices.filter(
        (service) => service.serviceId === 'Software installation',
      );
      setResult(filteredServices);
    } else if (prop === 'PM Tools') {
      const filteredServices = allsServices.filter(
        (service) => service.serviceId === 'PM Tools',
      );
      setResult(filteredServices);
    } else if (prop === 'Hardware') {
      const filteredServices = allsServices.filter(
        (service) => service.serviceId === 'Hardware',
      );
      setResult(filteredServices);
    }
  };
  const handleClickService = (id: any) => {
    router?.push({
      pathname: `/air-services/catalog/detail`,
      query: {
        serviceId: id,
      },
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return {
    handleClick,
    result,
    handleClickService,
    open,
    handleClickOpen,
    handleClose,
    setOpen,
  };
};

export default useCatalog;
