import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { useGetGroupsQuery } from '@/services/commonFeatures/contact-groups';
import { PAGINATION } from '@/config';
import { contactsDefaultValues } from './AllContactDrawer.data';
import { useForm } from 'react-hook-form';
import { CONTACTS_CONSTANTS } from '@/constants/strings';
import { useGetContactsListQuery } from '@/services/common-APIs';

const useAddContactDrawer = (recipientType?: string) => {
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
    defaultValues: contactsDefaultValues(recipientType),
  });

  const { watch } = methods;
  const radioVal = watch('contacts');

  return {
    contactGroupsLoading,
    loadingAllContacts,
    contactsGroupData,
    getContactsData,
    allContactsData,
    getGroupsData,
    setPageLimit,
    radioVal,
    setPage,
    methods,
    theme,
  };
};

export default useAddContactDrawer;
