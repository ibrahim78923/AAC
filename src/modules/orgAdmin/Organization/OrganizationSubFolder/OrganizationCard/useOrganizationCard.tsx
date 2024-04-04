import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useGetOrganizationMainIdQuery } from '@/services/orgAdmin/organization';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, validationSchema } from './OrganizationCard.data';

const useOrganizationCard = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const theme = useTheme<Theme>();

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetOrganizationMainIdQuery({ id: '6540b33a0637653df4a4f8ac' });

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: any = async () => {};

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false), reset();
  };
  return {
    theme,
    isOpenDrawer,
    setIsOpenDrawer,
    handleSubmit,
    onSubmit,
    methods,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    data,
    handleCloseDrawer,
  };
};

export default useOrganizationCard;
