import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { useGetGroupsQuery } from '@/services/commonFeatures/contact-groups';
import { PAGINATION } from '@/config';
import {
  contactsDefaultValues,
  contactsValidationSchema,
} from './AllContactDrawer.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CONTACTS_CONSTANTS } from '@/constants/strings';
import { useGetContactsListQuery } from '@/services/common-APIs';

const useAddContactDrawer = (
  onClose?: any,
  setSelectedContactsData?: any,
  selectedRec?: any,
) => {
  const theme = useTheme<Theme>();
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const params = {
    limit: pageLimit,
    page: page,
    numberType: CONTACTS_CONSTANTS?.PHONE_NUMBER,
  };
  const { data: getContactsData, isLoading: loadingAllContacts } =
    useGetContactsListQuery(params);

  const allContactsData = getContactsData?.data?.contacts;
  const { data: getGroupsData, isLoading: contactGroupsLoading } =
    useGetGroupsQuery({ params: params });

  const contactsGroupData = getGroupsData?.data?.contactgroups;

  const methods: any = useForm({
    resolver: yupResolver(contactsValidationSchema),
    defaultValues: contactsDefaultValues,
  });

  const { handleSubmit, watch } = methods;
  const radioVal = watch('contacts');

  const onSubmit = () => {
    setSelectedContactsData(selectedRec);
    onClose();
  };

  return {
    contactGroupsLoading,
    loadingAllContacts,
    contactsGroupData,
    getContactsData,
    allContactsData,
    getGroupsData,
    setPageLimit,
    handleSubmit,
    onSubmit,
    radioVal,
    setPage,
    methods,
    theme,
  };
};

export default useAddContactDrawer;
