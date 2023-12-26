import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createComapnySchema,
  defaultCreateCompanyValues,
} from './CreateCompany.data';
// import { companiesAPI } from '@/services/commonFeatures/companies';

// import { enqueueSnackbar } from 'notistack';
// import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useCreateCompany = () => {
  // const { usePostCompaniesMutation } = companiesAPI;

  // const [postCompanies] = usePostCompaniesMutation();

  const methods: any = useForm<any>({
    resolver: yupResolver(createComapnySchema),
    defaultValues: defaultCreateCompanyValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    // console.log(values, 'values are here');
    // if (values) {
    //   postCompanies({ body: values })
    //   enqueueSnackbar(`Company Created Successfully`,
    //     { variant: NOTISTACK_VARIANTS?.SUCCESS },
    //   );
    //   reset();
    // } else {
    //   enqueueSnackbar(`Something went wrong`,
    //     { variant: NOTISTACK_VARIANTS?.ERROR },
    //   );
    // }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    reset,
  };
};

export default useCreateCompany;
