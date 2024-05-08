import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createComapnySchema,
  defaultCreateCompanyValues,
} from './CreateCompany.data';
import { useGetCompanyContactsQuery } from '@/services/common-APIs';
import { getSession, isNullOrEmpty } from '@/utils';
import { companiesAPI } from '@/services/commonFeatures/companies';

import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useCreateCompany = (setIsOpenDrawer?: any) => {
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
    const formData = new FormData();

    formData.append('noOfEmloyee', values?.noOfEmloyee);
    formData.append('totalRevenue', values?.totalRevenue);
    formData.append('domain', values?.domain);
    formData.append('name', values?.name);
    formData.append('ownerId', values?.ownerId);
    formData.append('industry', values?.industry);
    if (!isNullOrEmpty(values?.type)) {
      formData.append('type', values?.type);
    }
    formData.append('city', values?.city);
    formData.append('postalCode', values?.postalCode);
    formData.append('address', values?.address);
    if (!isNullOrEmpty(values?.description)) {
      formData.append('description', values?.description);
    }
    if (!isNullOrEmpty(values?.linkedInUrl)) {
      formData.append('linkedInUrl', values?.linkedInUrl);
    }

    try {
      await postCompanies({ body: formData }).unwrap();
      enqueueSnackbar(`Company Created Successfully`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setIsOpenDrawer(false);
      reset();
    } catch (error) {
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
