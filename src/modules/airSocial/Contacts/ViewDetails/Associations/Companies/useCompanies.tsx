import { useState } from 'react';
import { useTheme } from '@mui/material';
import {
  useGetContactAssociationsQuery,
  useGetContactsQuery,
} from '@/services/commonFeatures/contacts';
import { useForm } from 'react-hook-form';

const useCompanies = (contactId: any) => {
  const { data: dataCompaniesList } = useGetContactsQuery({});
  const companyOwners = dataCompaniesList?.data?.contacts?.map((item: any) => ({
    value: item?._id,
    label: `${item?.firstName} ${item?.lastName}`,
  }));

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
  const methodsView = useForm({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = (data: any) => {
    if (data) {
      methodsView.setValue('domain', data?.domain);
      methodsView.setValue('name', data?.name);
      methodsView.setValue('ownerId', data?.ownerId);
      methodsView.setValue('description', data?.description);
      methodsView.setValue('industry', data?.industry);
      methodsView.setValue('city', data?.city);
      methodsView.setValue('postalCode', data?.postalCode);
      methodsView.setValue('noOfEmloyee', data?.noOfEmloyee);
      methodsView.setValue('totalRevenue', data?.totalRevenue);
      methodsView.setValue('timeZone', data?.timeZone);
      methodsView.setValue('companyPage', data?.companyPage);
      methodsView.setValue('joiningDate', new Date(data?.createdAt));
      methodsView.setValue('joiningTime', new Date(data?.createdAt));
    }
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

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
  };
};

export default useCompanies;
