import { PAGINATION } from '@/config';
import { useState } from 'react';
import { getSignUpLeadsColumns } from './SignUpLeads.data';
import { useGetServiceSignUpLeadsQuery } from '@/services/airServices/signup-leads';

export const useSignUpLeads = () => {
  const [searchBy, setSearchBy] = useState('');

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const params = {
    page: page,
    limit: pageLimit,
    search: searchBy,
  };

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetServiceSignUpLeadsQuery(
      { params },
      { refetchOnMountOrArgChange: true },
    );

  const signUpLeadsColumns = getSignUpLeadsColumns();

  return {
    setSearchBy,
    data,
    signUpLeadsColumns,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    setPageLimit,
    setPage,
  };
};
export default useSignUpLeads;
