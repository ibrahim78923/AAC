import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createViewDefaultValues,
  createViwValidationSchema,
} from './CreateViewCompany.data';
// import { usePostCompaniesViewMutation } from '@/services/commonFeatures/companies';

const useCreateViewCompany = () => {
  const theme = useTheme<Theme>();

  // const [postCompaniesView] = usePostCompaniesViewMutation();

  const methods: any = useForm<any>({
    resolver: yupResolver(createViwValidationSchema),
    defaultValues: createViewDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    // console.log(values, 'values are')
    reset();
  };

  return {
    theme,
    methods,
    handleSubmit,
    onSubmit,
    reset,
  };
};

export default useCreateViewCompany;
