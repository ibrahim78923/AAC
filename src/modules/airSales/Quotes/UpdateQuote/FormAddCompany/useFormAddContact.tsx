import { useLazyGetContactsUpdatedQuery } from '@/services/airSales/quotes';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  createComapnySchema,
  defaultCreateCompanyValues,
} from './FormAddCompany.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { companiesAPI } from '@/services/commonFeatures/companies';
import useUpdateQuote from '../useUpdateQuote';
import { useGetAllCompaniesQuery } from '@/services/commonFeatures/companies';
import { useCreateAssociationMutation } from '@/services/airSales/deals/view-details/association';
import { COMPANITES_TYPE } from '@/constants';

const useFormAddContact = (onClose: () => void) => {
  const { usePostCompaniesMutation } = companiesAPI;
  const contacts = useLazyGetContactsUpdatedQuery();

  const { dataGetQuoteById } = useUpdateQuote();
  const [createAssociation, { isLoading: createAssociationLoading }] =
    useCreateAssociationMutation();
  const [postCompanies, { isLoading: loadingCompnayPost }] =
    usePostCompaniesMutation();

  const methods: any = useForm<any>({
    resolver: yupResolver(createComapnySchema),
    defaultValues: defaultCreateCompanyValues,
  });

  const { handleSubmit, reset, watch } = methods;
  const watchCompany = watch('companyType');

  const onSubmit = async (values: any) => {
    delete values?.companyType;
    const type = 'deals';
    const formData = new FormData();
    formData?.append('recordType', type);
    formData?.append('recordId', dataGetQuoteById?.data?.dealId);
    Object.entries(values)?.forEach(([key, value]: any) => {
      if (value !== undefined && value !== null && value !== '') {
        if (key === COMPANITES_TYPE?.EXT_COMPANY) {
          return;
        } else if (key === 'ownerId') {
          formData.append(key, value?._id);
        } else {
          formData.append(key, value);
        }
      }
    });
    try {
      watchCompany === COMPANITES_TYPE?.EXT_COMPANY
        ? await createAssociation({
            body: {
              dealId: dataGetQuoteById?.data?.dealId,
              companyId: values?.chooseCompany,
            },
          })
            .unwrap()
            .then((res) => {
              if (res) {
                onClose();
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
                      dealId: dataGetQuoteById?.data?.dealId,
                      companyId: res?.data?._id,
                    },
                  }).unwrap();
                  onClose();
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

  const companyParams = { meta: false };

  const { data: getAllCompanies } = useGetAllCompaniesQuery(companyParams);

  const overAllCompaniesData = getAllCompanies?.data?.companies;

  const companyOptions = overAllCompaniesData?.map((item: any) => ({
    value: item?._id,
    label: item?.name ? `${item?.name}` : 'N/A',
  }));

  return {
    onSubmit,
    handleSubmit,
    methods,
    contacts,
    loadingCompnayPost,
    watchCompany,
    companyOptions,
    createAssociationLoading,
  };
};

export default useFormAddContact;
