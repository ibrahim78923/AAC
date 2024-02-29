import { useState } from 'react';
import { useForm } from 'react-hook-form';

const useCompaniesEditorDrawer = () => {
  const [searchProduct, setSearchProduct] = useState('');
  const methodsCompanies = useForm({});

  const onSubmit = () => {};
  const { handleSubmit, watch } = methodsCompanies;
  const watchProducts = watch(['companieStatus']);
  return {
    handleSubmit,
    onSubmit,
    methodsCompanies,
    searchProduct,
    setSearchProduct,
    watchProducts,
  };
};

export default useCompaniesEditorDrawer;
