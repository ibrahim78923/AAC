import { useState } from 'react';

import { useGetLeadCaptureFormQuery } from '@/services/airMarketer/lead-capture/forms';
import { PAGINATION } from '@/config';
import { formStatus } from '../Forms.data';

const useTrash = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchValue, setSearchValue] = useState(null);
  const paginationParams = {
    page: page,
    limit: pageLimit,
  };

  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const { data: dataGetForms, isLoading: loadingGetForms } =
    useGetLeadCaptureFormQuery({
      params: {
        status: formStatus?.TRASH,
        ...searchPayLoad,
        ...paginationParams,
      },
    });

  return {
    setSearchValue,
    loadingGetForms,
    dataGetForms,
    searchValue,
    setPageLimit,
    setPage,
  };
};

export default useTrash;
