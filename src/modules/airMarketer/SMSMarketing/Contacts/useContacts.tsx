import { PAGINATION } from '@/config';
import { CONTACTS_CONSTANTS } from '@/constants/strings';
import { useGetContactsQuery } from '@/services/commonFeatures/contacts';
import { useTheme } from '@mui/material';
import { useState } from 'react';

const useContacts = () => {
  const theme = useTheme();
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const { data: dataGetContacts, isLoading: loadingGetContacts } =
    useGetContactsQuery({
      params: {
        limit: pageLimit,
        page: page,
        numberType: CONTACTS_CONSTANTS?.PHONE_NUMBER,
      },
    });

  const allContacts = dataGetContacts?.data?.contacts;

  return {
    loadingGetContacts,
    dataGetContacts,
    setPageLimit,
    allContacts,
    setPage,
    theme,
  };
};

export default useContacts;
