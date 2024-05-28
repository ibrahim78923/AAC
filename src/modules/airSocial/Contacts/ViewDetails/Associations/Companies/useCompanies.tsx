import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useGetContactsQuery } from '@/services/commonFeatures/contacts';
import { useGetContactAssociationsQuery } from '@/services/commonFeatures/contacts/associations';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { companiesDefaultValues, companiesValidationSchema } from './CompaniesEditorDrawer/CompaniesEditorDrawer.data';
// import { useCreateAssociationMutation } from '@/services/airSales/deals/view-details/association';
import {
  // useGetAllCompaniesQuery,
  usePostCompaniesMutation,
} from '@/services/commonFeatures/companies';
import { enqueueSnackbar } from 'notistack';
// import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useCompanies = (contactId: any) => {
  const { data: dataCompaniesList } = useGetContactsQuery({});
  const companyOwners = dataCompaniesList?.data?.contacts?.map((item: any) => ({
    value: item?._id,
    label: `${item?.firstName} ${item?.lastName}`,
  }));

  // Get Associate Companies
  const [searchValue, setSearchValue] = useState(null);
  const [filterParams] = useState({
    contactId: contactId,
    association_type: 'companies',
  });
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const { data: dataGetCompanies, isLoading: loadingCompanies } =
    useGetContactAssociationsQuery({
      params: { ...filterParams, ...searchPayLoad },
    });

  // Drawer Edit
  const [postCompanies, { isLoading: postCompanyLoading }] =
    usePostCompaniesMutation();

  // const [createAssociation] = useCreateAssociationMutation();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('Add');
  const [disabledField, setDisabledField] = useState(false);
  const methodsView = useForm<any>();
  const { handleSubmit, reset }: any = methodsView;

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
    reset();
  };

  const onSubmit = async (values: any) => {
    const type = 'contacts';
    const formData = new FormData();
    formData?.append('recordType', type);
    formData?.append('recordId', contactId);
    Object.entries(values)?.forEach(([key, value]: any) => {
      if (value !== undefined && value !== null && value !== '') {
        formData.append(key, value);
      }
    });
    try {
      await postCompanies({ body: formData })?.unwrap();
      handleCloseDrawer();
      enqueueSnackbar('Company added Successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  const handleAddCompanySubmit = handleSubmit(onSubmit);

  // Delete Modal
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const handleOpenAlert = () => {
    setIsOpenAlert(true);
  };
  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };
  const theme = useTheme();

  return {
    disabledField,
    drawerTitle,
    searchValue,
    setSearchValue,
    loadingCompanies,
    dataGetCompanies,
    openDrawer,
    handleOpenDrawer,
    handleCloseDrawer,
    methodsView,
    isOpenAlert,
    handleOpenAlert,
    handleCloseAlert,
    theme,
    companyOwners,
    handleAddCompanySubmit,
    postCompanyLoading,
  };
};

export default useCompanies;
