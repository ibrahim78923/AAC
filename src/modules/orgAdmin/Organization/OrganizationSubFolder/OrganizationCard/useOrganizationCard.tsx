import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useGetOrganizationMainIdQuery } from '@/services/orgAdmin/organization';

const useOrganizationCard = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const theme = useTheme<Theme>();
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetOrganizationMainIdQuery({ id: '6540b33a0637653df4a4f8ac' });

  const methods: any = useForm({});

  const { handleSubmit } = methods;

  const onSubmit: any = async () => {};
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
  };
};

export default useOrganizationCard;
