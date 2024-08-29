import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { useGetContactsQuery } from '@/services/commonFeatures/contacts';
import { useGetGroupsQuery } from '@/services/commonFeatures/contact-groups';
import { PAGINATION } from '@/config';
import {
  contactsDefaultValues,
  contactsValidationSchema,
} from './AllContactDrawer.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CONTACTS_CONSTANTS } from '@/constants/strings';

const useAddContactDrawer = (
  onClose?: any,
  setSelectedContactsData?: any,
  selectedRec?: any,
  recipientType?: any,
) => {
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
    resolver: yupResolver(contactsValidationSchema),
    defaultValues: contactsDefaultValues(recipientType),
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
