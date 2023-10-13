import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  companiesDefaultValues,
  companiesValidationSchema,
} from './CompaniesEditorDrawer.data';

const useCompaniesEditorDrawer = () => {
  const methodsCompanies = useForm({
    resolver: yupResolver(companiesValidationSchema),
    defaultValues: companiesDefaultValues,
  });

  const onSubmit = () => {};
  const { handleSubmit } = methodsCompanies;
  return { handleSubmit, onSubmit, methodsCompanies };
};

export default useCompaniesEditorDrawer;
