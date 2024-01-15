import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  productsDefaultValues,
  productsValidationSchema,
} from './DealEditorDrawer.data';

const useProductsEditorDrawer = () => {
  const [dealType, setDealType] = useState('newDeal');

  const handleChangeDealType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDealType((event.target as HTMLInputElement).value);
  };

  const [searchProduct, setSearchProduct] = useState('');
  const methodsProducts = useForm({
    resolver: yupResolver(productsValidationSchema),
    defaultValues: productsDefaultValues,
  });

  const onSubmit = () => {};
  const { handleSubmit } = methodsProducts;

  return {
    dealType,
    handleChangeDealType,
    handleSubmit,
    onSubmit,
    methodsProducts,
    searchProduct,
    setSearchProduct,
  };
};

export default useProductsEditorDrawer;
