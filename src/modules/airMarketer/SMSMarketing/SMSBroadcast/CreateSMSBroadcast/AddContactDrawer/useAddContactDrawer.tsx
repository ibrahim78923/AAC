import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { useGetContactsQuery } from '@/services/commonFeatures/contacts';
import { useGetGroupsQuery } from '@/services/commonFeatures/contact-groups';
import { PAGINATION } from '@/config';

const useAddContactDrawer = () => {
  const theme = useTheme<Theme>();
  const [selectedRec, setSelectedRec] = useState<string[]>([]);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const { data: getContactsData, isLoading: loadingGetContacts } =
    useGetContactsQuery({ params: { limit: pageLimit, page: page } });

  const allContactsData = getContactsData?.data?.contacts;

  const { data: getGroupsData } = useGetGroupsQuery({
    params: { limit: 10, page: 1 },
  });

  return {
    loadingGetContacts,
    getContactsData,
    allContactsData,
    setSelectedRec,
    getGroupsData,
    selectedRec,
    setPageLimit,
    setPage,
    theme,
  };
};

export default useAddContactDrawer;
