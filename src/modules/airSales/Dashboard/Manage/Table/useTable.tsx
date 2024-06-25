import { PAGINATION } from '@/config';
import { useGetSalesDashboardsQuery } from '@/services/airSales/dashboard';
import { useState } from 'react';

const useTable = ({ searchByName }: any) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isGetRowValues, setIsGetRowValues] = useState('');
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const {
    data: manageDashboadDataArray,
    isLoading,
    status,
  } = useGetSalesDashboardsQuery({
    params: {
      page,
      limit: pageLimit,
      ...(searchByName && { search: searchByName }),
    },
  });

  return {
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleCloseDeleteModal,
    handleDelete,
    isChecked,
    setIsChecked,
    isGetRowValues,
    setIsGetRowValues,
    setPage,
    isLoading,
    manageDashboadDataArray,
    setPageLimit,
    searchByName,
    status,
    page,
    pageLimit,
  };
};
export default useTable;
