import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  companiesDefaultValues,
  companiesValidationSchema,
} from './CompaniesEditorDrawer.data';
import { useGetCompanyContactsQuery } from '@/services/common-APIs';
import { getSession } from '@/utils';
import { usePostCompaniesMutation } from '@/services/commonFeatures/companies';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useCreateAssociationMutation } from '@/services/airSales/deals/view-details/association';
import { PAGINATION } from '@/config';

const useCompaniesEditorDrawer = (openDrawer: any) => {
  const { user } = getSession();
  const params = {
    page: PAGINATION?.PAGE_COUNT,
    limit: PAGINATION?.PAGE_LIMIT,
    contactOwnerId: user?._id,
  };

  const { data: getCompanyContacts } = useGetCompanyContactsQuery(params);

  const [postCompanies] = usePostCompaniesMutation();
  const [createAssociation] = useCreateAssociationMutation();

  const methodsCompanies = useForm({
    resolver: yupResolver(companiesValidationSchema),
    defaultValues: companiesDefaultValues,
  });
  const { handleSubmit, reset } = methodsCompanies;

  const onSubmit = async (values: any) => {
    try {
      const response = await postCompanies({ body: values })?.unwrap();
      if (response?.data) {
        try {
          await createAssociation({
            body: {
              //TODO:temporary id data come from backend
              dealId: '655b2b2ecd318b576d7d71e8',
              companyId: response?.data?._id,
            },
          }).unwrap();
          enqueueSnackbar(
            ` Companies ${
              openDrawer === 'Edit' ? 'Updated' : 'Added'
            } Successfully`,
            {
              variant: NOTISTACK_VARIANTS?.SUCCESS,
            },
          );
        } catch (error: any) {
          const errMsg = error?.data?.message;
          enqueueSnackbar(errMsg ?? 'Error occurred', {
            variant: NOTISTACK_VARIANTS?.ERROR,
          });
        }
      }
      // setIsOpenDrawer(false);
      reset();
    } catch (error) {
      enqueueSnackbar(`Something went wrong`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  // const watchProducts = watch(['companyStatus']);
  return {
    handleSubmit,
    onSubmit,
    methodsCompanies,
    getCompanyContacts,
  };
};

export default useCompaniesEditorDrawer;
