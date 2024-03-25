import { useForm } from 'react-hook-form';

import { useTheme } from '@mui/material';

import { detailsDefaultValues, detailsValidationSchema } from './Details.data';

import { yupResolver } from '@hookform/resolvers/yup';
import { useGetDealsActionPreviewQuery } from '@/services/airSales/deals';
import { useEffect } from 'react';

const useDetails = ({ selected }: any) => {
  const theme = useTheme();

  const { data, isLoading } = useGetDealsActionPreviewQuery({ id: selected });

  const methodsDetails = useForm({
    resolver: yupResolver(detailsValidationSchema),
    defaultValues: detailsDefaultValues,
  });
  const { handleSubmit, reset } = methodsDetails;

  useEffect(() => {
    const fieldsData = data?.data;
    reset({
      dealName: fieldsData?.name,
      amount: fieldsData?.amount,
      dealOwner: '',
      dealType: '',
      priority: '',
      stage: '',
      pipeline: '',
      lastContacted: '',
      contactedMode: '',
      lastActivity: '',
      createdDate: '',
      closedDate: '',
    });
  }, [data]);

  const onSubmit = () => {};
  return {
    theme,
    methodsDetails,
    onSubmit,
    handleSubmit,
    isLoading,
  };
};

export default useDetails;
