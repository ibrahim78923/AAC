import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { columns } from './Templates.data';
import { useRouter } from 'next/router';
import { PAGINATION } from '@/config';
import { useGetSmsTemplatesQuery } from '@/services/airMarketer/SmsMarketing/Templates';

const useTemplatese = () => {
  const navigate = useRouter();
  const theme = useTheme<Theme>();
  // const [productSearch, setproductSearch] = useState<string>('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [filterValues, setFilterValues] = useState({
    search: '',
  });

  const templateParams = {
    page: page,
    limit: pageLimit,
    search: filterValues?.search,
  };

  const {
    data: smsTemplateData,
    isLoading,
    isSuccess,
  } = useGetSmsTemplatesQuery(templateParams);

  const deleteTemplete = async () => {
    setIsOpenAlert(false);
  };

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const getRowValues = columns(setIsOpenAlert, navigate, theme);

  return {
    // productSearch,
    // setproductSearch,
    theme,
    getRowValues,
    isOpenAlert,
    handleCloseAlert,
    deleteTemplete,
    navigate,
    setPageLimit,
    setPage,
    isLoading,
    isSuccess,
    filterValues,
    setFilterValues,
    smsTemplateData,
  };
};

export default useTemplatese;
