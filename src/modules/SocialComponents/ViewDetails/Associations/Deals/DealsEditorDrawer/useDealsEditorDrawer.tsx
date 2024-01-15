import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  productsDefaultValues,
  productsValidationSchema,
} from './DealsEditorDrawer.data';
import { usePostDealsMutation } from '@/services/airSales/deals';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useDealsEditorDrawer = ({ setOpenDrawer }: any) => {
  const [searchProduct, setSearchProduct] = useState('');
  const [postDeals] = usePostDealsMutation();
  const methodsProducts = useForm({
    resolver: yupResolver(productsValidationSchema),
    defaultValues: productsDefaultValues,
  });

  const { handleSubmit, watch, reset } = methodsProducts;
  const watchProductstatus = watch(['dealStatus']);

  const onSubmit = async (values: any) => {
    delete values?.dealStatus;
    values.closeDate = dayjs(values?.closeDate)?.format(DATE_FORMAT?.API);

    try {
      await postDeals({ body: values })?.unwrap();
      enqueueSnackbar('Deal Added successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setOpenDrawer('');
      reset();
    } catch (error) {
      enqueueSnackbar('somthing went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    handleSubmit,
    onSubmit,
    methodsProducts,
    watchProductstatus,
    searchProduct,
    setSearchProduct,
  };
};

export default useDealsEditorDrawer;
