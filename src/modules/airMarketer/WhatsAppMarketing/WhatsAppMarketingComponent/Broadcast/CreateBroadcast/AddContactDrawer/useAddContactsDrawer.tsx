import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { useGetContactsQuery } from '@/services/commonFeatures/contacts';
import { useGetGroupsQuery } from '@/services/commonFeatures/contact-groups';
import { PAGINATION } from '@/config';
import { contactsDefaultValues } from './AllContactDrawer.data';
import { useForm } from 'react-hook-form';
import { CONTACTS_CONSTANTS } from '@/constants/strings';

const useAddContactDrawer = (recipientType?: any) => {
  const theme = useTheme<Theme>();
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const { data: getContactsData, isLoading: loadingAllContacts } =
    useGetContactsQuery({
      params: {
        limit: pageLimit,
        page: page,
        numberType: CONTACTS_CONSTANTS?.WHATSAPP_NUMBER,
      },
    });

  const allContactsData = getContactsData?.data?.contacts;
  const { data: getGroupsData, isLoading: contactGroupsLoading } =
    useGetGroupsQuery({
      params: {
        limit: pageLimit,
        page: page,
        numberType: CONTACTS_CONSTANTS?.WHATSAPP_NUMBER,
      },
    });

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
