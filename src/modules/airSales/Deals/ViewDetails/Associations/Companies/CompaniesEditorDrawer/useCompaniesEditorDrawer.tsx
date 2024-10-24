import { yupResolver } from '@hookform/resolvers/yup';
import {
  companiesDefaultValues,
  companiesValidationSchema,
} from './CompaniesEditorDrawer.data';
import { useLazyGetCompanyContactsListQuery } from '@/services/common-APIs';

import {
  useGetAllCompaniesQuery,
  usePostCompaniesMutation,
} from '@/services/commonFeatures/companies';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useCreateAssociationMutation } from '@/services/airSales/deals/view-details/association';
import { PAGINATION } from '@/config';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';

const useCompaniesEditorDrawer = ({
  openDrawer,
  setOpenDrawer,
  dealId,
  companyRecord,
}: any) => {
  const defaultCompany = 'new-Company';
  const theme = useTheme();
  const getCompanyContactsList = useLazyGetCompanyContactsListQuery();

  const companyParams = {
    page: PAGINATION?.PAGE_COUNT,
    limit: PAGINATION?.PAGE_LIMIT,
    meta: false,
  };
  const { data: getAllCompaniesData } = useGetAllCompaniesQuery(companyParams);

  const overAllCompaniesData = getAllCompaniesData?.companies;

  const companyOptions = overAllCompaniesData?.map((item: any) => ({
    value: item?._id,
    label: item?.name ? `${item?.name}` : 'N/A',
  }));

  const [postCompanies, { isLoading: postCompanyLoading }] =
    usePostCompaniesMutation();

  const [createAssociation, { isLoading: createAssociationLoading }] =
    useCreateAssociationMutation();

  const methodsCompanies = useForm<any>({
    resolver: yupResolver(companiesValidationSchema),
    defaultValues: async () => {
      if (openDrawer === 'View' && companyRecord) {
        const {
          domain,
          name,
          industry,
          type,
          noOfEmloyee,
          totalRevenue,
          city,
          postalCode,
          address,
          description,
          linkedInUrl,
        } = companyRecord;
        return {
          company: defaultCompany,
          domain,
          name,
          ownerId: companyRecord?.owner,
          industry,
          type,
          noOfEmloyee,
          totalRevenue,
          city,
          postalCode,
          address,
          description,
          linkedInUrl,
        };
      }
      return companiesDefaultValues;
    },
  });

  const { handleSubmit, reset, watch }: any = methodsCompanies;
  const watchCompany = watch('company');

  const onSubmit = async (values: any) => {
    const type = 'deals';
    const ExistingCompany = 'company';
    const formData = new FormData();
    formData?.append('recordType', type);
    formData?.append('recordId', dealId);
    Object.entries(values)?.forEach(([key, value]: any) => {
      if (value !== undefined && value !== null && value !== '') {
        if (key === ExistingCompany) {
          return;
        } else if (key === 'ownerId') {
          formData.append(key, value?._id);
        } else {
          formData.append(key, value);
        }
      }
    });
    try {
      watchCompany === 'existing-Company'
        ? await createAssociation({
            body: {
              dealId: dealId,
              companyId: values?.chooseCompany,
            },
          })
            .unwrap()
            .then((res) => {
              if (res) {
                setOpenDrawer(false);
                enqueueSnackbar(` Companies updated Successfully`, {
                  variant: NOTISTACK_VARIANTS?.SUCCESS,
                });
              }
            })
        : await postCompanies({ body: formData })
            ?.unwrap()
            .then((res) => {
              if (res?.data) {
                try {
                  createAssociation({
                    body: {
                      dealId: dealId,
                      companyId: res?.data?._id,
                    },
                  }).unwrap();
                  setOpenDrawer(false);
                  reset();
                  enqueueSnackbar(` Companies added Successfully`, {
                    variant: NOTISTACK_VARIANTS?.SUCCESS,
                  });
                } catch (error: any) {
                  const errMsg = error?.data?.message;
                  const errMessage = Array?.isArray(errMsg)
                    ? errMsg[0]
                    : errMsg;
                  enqueueSnackbar(errMessage ?? 'Error occurred', {
                    variant: NOTISTACK_VARIANTS?.ERROR,
                  });
                }
              }
            });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    theme,
    getCompanyContactsList,
    postCompanyLoading,
    methodsCompanies,
    companyOptions,
    handleSubmit,
    watchCompany,
    onSubmit,
    createAssociationLoading,
  };
};

export default useCompaniesEditorDrawer;
