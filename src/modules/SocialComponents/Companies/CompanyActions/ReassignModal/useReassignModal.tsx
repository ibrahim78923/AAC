import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { PAGINATION } from '@/config';
import { useGetCompanyContactsQuery } from '@/services/common-APIs';
import { getSession } from '@/utils';

const useReassignModal = () => {
  const { user } = getSession();
  const theme = useTheme<Theme>();
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const params = {
    page: page,
    limit: pageLimit,
    contactOwnerId: user?._id,
  };
  const { data: getCompanyContacts } = useGetCompanyContactsQuery(params);

  const methods = useForm();
  const { watch } = methods;
  const seletedContact = watch('companyOwner');

  return {
    theme,
    methods,
    seletedContact,
    setPage,
    setPageLimit,
    getCompanyContacts,
  };
};

export default useReassignModal;
