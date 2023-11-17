import { useState } from 'react';

import { allServices } from './Catalog.data';
import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { CATALOG_SERVICE_TYPES } from '@/constants/strings';
const useCatalog = () => {
  const [result, setResult] = useState<any[]>(allServices);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleClick = (prop: string) => {
    let filteredServices;
    if (prop === CATALOG_SERVICE_TYPES?.ALL) {
      filteredServices = allServices;
    } else {
      filteredServices = allServices?.filter(
        (service) => service?.serviceId === prop,
      );
    }

    setResult(filteredServices);
  };
  const handleClickService = (id: any) => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL.SINGLE_CATALOG_SERVICE_DETAILS,
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
