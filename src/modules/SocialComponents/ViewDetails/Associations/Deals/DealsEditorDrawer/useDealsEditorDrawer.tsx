import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  productsDefaultValues,
  productsValidationSchema,
} from './DealsEditorDrawer.data';

const useDealsEditorDrawer = () => {
  const [searchProduct, setSearchProduct] = useState('');
  const methodsProducts = useForm({
    resolver: yupResolver(productsValidationSchema),
    defaultValues: productsDefaultValues,
  });

  const onSubmit = () => {};
  const { handleSubmit, watch } = methodsProducts;
  const watchProductstatus = watch(['productStatus']);
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
