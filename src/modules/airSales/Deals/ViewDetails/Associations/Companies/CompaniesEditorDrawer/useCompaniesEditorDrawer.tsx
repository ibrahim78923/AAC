import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  companiesDefaultValues,
  companiesValidationSchema,
} from './CompaniesEditorDrawer.data';

const useCompaniesEditorDrawer = () => {
  const [searchProduct, setSearchProduct] = useState('');
  const methodsCompanies = useForm({
    resolver: yupResolver(companiesValidationSchema),
    defaultValues: companiesDefaultValues,
  });

  const onSubmit = () => {};
  const { handleSubmit, watch } = methodsCompanies;
  const watchProducts = watch(['companyStatus']);
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
