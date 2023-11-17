import { useState } from 'react';

import { allsServices } from './Catalog.data';
import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
const useCatalog = () => {
  const [result, setResult] = useState<any[]>(allsServices);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleClick = (prop: string) => {
    let filteredServices;
    if (prop === 'All Services') {
      filteredServices = allsServices;
    } else {
      filteredServices = allsServices?.filter(
        (service) => service?.serviceId === prop,
      );
    }

    setResult(filteredServices);
  };
  const handleClickService = (id: any) => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL.CATALOG_DETAILS,
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
