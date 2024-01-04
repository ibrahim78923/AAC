import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createComapnySchema,
  defaultCreateCompanyValues,
} from './CreateCompany.data';
import { useGetCompanyContactsQuery } from '@/services/common-APIs';
import { getSession } from '@/utils';
import { companiesAPI } from '@/services/commonFeatures/companies';

import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useCreateCompany = () => {
  const { usePostCompaniesMutation } = companiesAPI;
  const { user } = getSession();
  const params = {
    page: 1,
    limit: 10,
    contactOwnerId: user?._id,
  };

  const { data: getCompanyContacts } = useGetCompanyContactsQuery(params);

  const [postCompanies] = usePostCompaniesMutation();

  const methods: any = useForm<any>({
    resolver: yupResolver(createComapnySchema),
    defaultValues: defaultCreateCompanyValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: any) => {
    if (values) {
      postCompanies({ body: values });
      enqueueSnackbar(`Company Created Successfully`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset();
    } else {
      enqueueSnackbar(`Something went wrong`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    reset,
    getCompanyContacts,
  };
};

export default useCreateCompany;
