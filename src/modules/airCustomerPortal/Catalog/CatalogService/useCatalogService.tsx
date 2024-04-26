import { useForm } from 'react-hook-form';
import { useGetServiceCatalogCategoriesDetailsQuery } from '@/services/airCustomerPortal/catalog';
import { useRouter } from 'next/router';
import { useState } from 'react';

const useCatalogService = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const method = useForm({});
  const { serviceId, categoryId } = router?.query;
  const getServiceCatalogCategoriesDetailsParameter = {
    queryParam: {
      id: serviceId,
      categoryId,
    },
  };
  const {
    data: servicesDetails,
    isLoading,
    isFetching,
  } = useGetServiceCatalogCategoriesDetailsQuery(
    getServiceCatalogCategoriesDetailsParameter,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const { handleSubmit } = method;
  const onSubmit = handleSubmit(() => {});

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return {
    method,
    handleSubmit,
    onSubmit,
    handleClickOpen,
    handleClose,
    open,
    setOpen,
    servicesDetails,
    isLoading,
    isFetching,
  };
};
export default useCatalogService;
