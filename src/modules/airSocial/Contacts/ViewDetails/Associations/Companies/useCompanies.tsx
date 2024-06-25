import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { useGetContactsQuery } from '@/services/commonFeatures/contacts';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  companiesDefaultValues,
  companiesValidationSchema,
  existingCompanyDefaultValues,
  existingCompanyValidationSchema,
} from './CompaniesEditorDrawer/CompaniesEditorDrawer.data';
import { usePostCompaniesMutation } from '@/services/commonFeatures/companies';
import { enqueueSnackbar } from 'notistack';
import { FORM_TYPE } from './CompaniesEditorDrawer/CompaniesEditorDrawer.data';
import {
  useGetAssociationQuery,
  usePostAssociationMutation,
} from '@/services/commonFeatures/contacts/associations';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';

const useCompanies = (contactId: any) => {
  const theme = useTheme();
  const { data: dataCompaniesList } = useGetContactsQuery({});
  const companyOwners = dataCompaniesList?.data?.contacts?.map((item: any) => ({
    value: item?._id,
    label: `${item?.firstName} ${item?.lastName}`,
  }));

  // Get Association Companies
  const [searchValue, setSearchValue] = useState(null);
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const filterParams = {
    recordId: contactId,
    recordType: 'contacts',
    associationType: 'companies',
  };
  const {
    data: dataGetCompanies,
    isLoading: loadingCompanies,
    isFetching: fetchingCompanies,
  } = useGetAssociationQuery({
    params: { ...searchPayLoad, ...filterParams },
  });

  // Handle Change Form type
  const [formType, setFormType] = useState(FORM_TYPE?.NEW_COMPANY);
  const handleChangeFormType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormType((event.target as HTMLInputElement).value);
  };

  // Drawer Edit
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('Add');
  const [disabledField, setDisabledField] = useState(false);
  const methodsView = useForm<any>({
    resolver: yupResolver(companiesValidationSchema),
    defaultValues: companiesDefaultValues,
  });
  const { handleSubmit, reset }: any = methodsView;
  const methodsExistingCompany = useForm<any>({
    resolver: yupResolver(existingCompanyValidationSchema),
    defaultValues: existingCompanyDefaultValues,
  });
  const {
    handleSubmit: handleSubmitExistingCompany,
    reset: resetExistingForm,
  }: any = methodsExistingCompany;
  useEffect(() => {
    reset();
    resetExistingForm();
  }, [formType]);

  const handleOpenDrawer = (data: any, title: string) => {
    setDrawerTitle(title);
    if (title === 'View') {
      setDisabledField(true);
      if (data) {
        methodsView.setValue('domain', data?.domain);
        methodsView.setValue('name', data?.name);
        methodsView.setValue('ownerId', data?.ownerId);
        methodsView.setValue('industry', data?.industry);
        methodsView.setValue('type', data?.type);
        methodsView.setValue('noOfEmloyee', data?.noOfEmloyee);
        methodsView.setValue('totalRevenue', data?.totalRevenue);
        methodsView.setValue('city', data?.city);
        methodsView.setValue('postalCode', data?.postalCode);
        methodsView.setValue('address', data?.address);
        methodsView.setValue('description', data?.description);
        methodsView.setValue('linkedInUrl', data?.linkedInUrl);
      }
    } else {
      setDisabledField(false);
    }
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setFormType(FORM_TYPE?.NEW_COMPANY);
  };

  const [postCompanies, { isLoading: postCompanyLoading }] =
    usePostCompaniesMutation();
  const [postAssociation, { isLoading: loadingCreateAssociation }] =
    usePostAssociationMutation();

  const [isLoadingAddCompany, setLoadingAddCompany] = useState(false);

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    Object.entries(values)?.forEach(([key, value]: any) => {
      if (value !== undefined && value !== null && value !== '') {
        formData.append(key, value);
      }
    });

    try {
      setLoadingAddCompany(true);
      const response = await postCompanies({ body: formData })?.unwrap();
      if (!response?.data) {
        throw new Error('No data in response');
      }
      if (response?.data) {
        try {
          await postAssociation({
            body: {
              recordId: contactId,
              recordType: ASSOCIATIONS_API_PARAMS_FOR?.CONTACTS,
              operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
              companiesIds: [response?.data?._id],
            },
          })?.unwrap();
          handleCloseDrawer();
          enqueueSnackbar('Company created successfully', {
            variant: 'success',
          });
        } catch (error: any) {
          enqueueSnackbar('Error while creating company', {
            variant: 'error',
          });
        }
      }
      setLoadingAddCompany(false);
    } catch (error) {
      setLoadingAddCompany(false);
      enqueueSnackbar('Error while creating company', {
        variant: 'error',
      });
    }
  };

  const handleAddCompanySubmit = handleSubmit(onSubmit);

  const onExistingDealSubmit = async (values: any) => {
    const payload: any = {
      recordId: contactId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.CONTACTS,
      operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
      companiesIds: [values?.companyId?._id],
    };
    try {
      await postAssociation({
        body: payload,
      }).unwrap();
      handleCloseDrawer();
      enqueueSnackbar('Company added successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('Error while adding company', {
        variant: 'error',
      });
    }
  };
  const handleExsistingCompanySubmit =
    handleSubmitExistingCompany(onExistingDealSubmit);

  // Delete Modal
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [companyRecordId, setCompanyRecordId] = useState('');
  const handleOpenAlert = (id: string) => {
    setCompanyRecordId(id);
    setIsOpenAlert(true);
  };
  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const handleRemoveAssociation = async () => {
    try {
      await postAssociation({
        body: {
          recordId: contactId,
          recordType: ASSOCIATIONS_API_PARAMS_FOR?.CONTACTS,
          companiesIds: [companyRecordId],
          operation: ASSOCIATIONS_API_PARAMS_FOR?.REMOVE,
        },
      })?.unwrap();
      enqueueSnackbar('Record Deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setIsOpenAlert(false);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    disabledField,
    drawerTitle,
    searchValue,
    setSearchValue,
    loadingCompanies,
    fetchingCompanies,
    dataGetCompanies,
    openDrawer,
    handleOpenDrawer,
    handleCloseDrawer,
    methodsView,
    methodsExistingCompany,
    isOpenAlert,
    handleOpenAlert,
    handleCloseAlert,
    theme,
    companyOwners,
    handleAddCompanySubmit,
    postCompanyLoading,
    handleChangeFormType,
    formType,
    handleExsistingCompanySubmit,
    isLoadingAddCompany,
    loadingCreateAssociation,
    handleRemoveAssociation,
  };
};

export default useCompanies;
