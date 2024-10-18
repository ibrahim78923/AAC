import { useEffect } from 'react';
import { useTheme } from '@mui/material';
import { useUpdateDealsViewMutation } from '@/services/airSales/deals';
import { useForm } from 'react-hook-form';
import { viewDealsDeafultValues } from './ViewAllDeals.data';
import { enqueueSnackbar } from 'notistack';

const useViewAllDeals = (newDealViewsData: any) => {
  const theme = useTheme();
  const [updateDealsView, { isLoading: updateViewLoading }] =
    useUpdateDealsViewMutation();

  const methods = useForm({
    defaultValues: viewDealsDeafultValues,
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    setValue(
      'viewDeals',
      newDealViewsData?.map((item: any) => (item?.isActive && item?._id) || []),
    );
  }, [newDealViewsData, setValue]);

  const onSubmit = async (data: any) => {
    const selectedIds = data?.viewDeals;
    const updatedData = newDealViewsData?.map((item: any) => ({
      ...item,
      isActive: selectedIds?.includes(item?._id),
    }));
    updatedData?.shift();
    try {
      const shortUpdatedData = updatedData?.map((item: any) => ({
        ids: item?._id,
        name: item?.name,
        isActive: item?.isActive,
      }));

      await updateDealsView({ body: shortUpdatedData })?.unwrap();
      enqueueSnackbar('View updated successfully', { variant: 'success' });
    } catch (error: any) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  return {
    theme,
    methods,
    handleSubmit,
    setValue,
    onSubmit,
    updateViewLoading,
  };
};

export default useViewAllDeals;
