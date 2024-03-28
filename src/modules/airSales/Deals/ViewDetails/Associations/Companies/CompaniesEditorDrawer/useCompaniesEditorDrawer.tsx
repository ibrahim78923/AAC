import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  companiesDefaultValues,
  companiesValidationSchema,
} from './CompaniesEditorDrawer.data';
import { useGetCompanyContactsQuery } from '@/services/common-APIs';
import { getSession } from '@/utils';
import {
  // useCompanyUpdateMutation,
  usePostCompaniesMutation,
} from '@/services/commonFeatures/companies';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useCreateAssociationMutation } from '@/services/airSales/deals/view-details/association';
import { PAGINATION } from '@/config';
import { useState } from 'react';

const useCompaniesEditorDrawer = ({
  openDrawer,
  setOpenDrawer,
  dealId,
}: any) => {
  const [searchTicket, setSearchTicket] = useState('');
  const { user }: any = getSession();
  const params = {
    page: PAGINATION?.PAGE_COUNT,
    limit: PAGINATION?.PAGE_LIMIT,
    contactOwnerId: user?._id,
  };

  const { data: getCompanyContacts } = useGetCompanyContactsQuery(params);

  const [postCompanies] = usePostCompaniesMutation();
  // const [CompanyUpdate] = useCompanyUpdateMutation();
  const [createAssociation] = useCreateAssociationMutation();

  const methodsCompanies = useForm({
    resolver: yupResolver(companiesValidationSchema),
    defaultValues: companiesDefaultValues,
  });
  const { handleSubmit, reset, watch }: any = methodsCompanies;
  const watchCompany = watch(['companyStatus']);

  const onSubmit = async (values: any) => {
    const type = 'deals';
    const formData = new FormData();
    formData?.append('domain', values?.domain);
    formData?.append('name', values?.name);
    formData?.append('ownerId', values?.ownerId);
    formData?.append('industry', values?.industry);
    formData?.append('type', values?.type);
    formData?.append('noOfEmloyee', values?.noOfEmloyee);
    formData?.append('totalRevenue', values?.totalRevenue);
    formData?.append('city', values?.city);
    formData?.append('postalCode', values?.postalCode);
    formData?.append('address', values?.address);
    formData?.append('description', values?.description);
    formData?.append('linkedInUrl', values?.linkedInUrl);
    formData?.append('recordType', type);
    formData?.append('recordId', dealId);
    try {
      const response =
        openDrawer === 'Edit'
          ? 'edited'
          : // await CompanyUpdate({
            //   body: formData,
            //   Id: contactRecord?._id,
            // }).unwrap()
            await postCompanies({ body: formData })?.unwrap();
      if (response?.data) {
        try {
          await createAssociation({
            body: {
              dealId: dealId,
              companyId: response?.data?._id,
            },
          }).unwrap();
          setOpenDrawer(false);
          reset();
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
          const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
          enqueueSnackbar(errMessage ?? 'Error occurred', {
            variant: NOTISTACK_VARIANTS?.ERROR,
          });
        }
      }
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    handleSubmit,
    onSubmit,
    methodsCompanies,
    getCompanyContacts,
    watchCompany,
    searchTicket,
    setSearchTicket,
  };
};

export default useCompaniesEditorDrawer;
