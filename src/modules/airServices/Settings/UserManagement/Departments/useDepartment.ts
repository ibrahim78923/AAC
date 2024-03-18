import { PAGINATION } from '@/config';
import { useLazyGetDepartmentQuery } from '@/services/airServices/settings/user-management/departments';
import { useEffect, useState } from 'react';

export const useDepartment = () => {
  //   const [openDelete, setOpenDelete] = useState<any>({
  //     item: null,
  //     val: false,
  //   });
  //   const [openEdit, setOpenEdit] = useState<any>({ item: null, val: false });
  //   const [openAddModal, setOpenAddModal] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');
  const [lazyGetDepartmentTrigger, lazyGetDepartmentData]: any =
    useLazyGetDepartmentQuery();

  const getDepartmentListData = async (currentPage = page) => {
    const getDepartmentParam = new URLSearchParams();
    getDepartmentParam?.append('page', currentPage + '');
    getDepartmentParam?.append('limit', pageLimit + '');
    getDepartmentParam?.append('search', search);
    const getDepartmentParameter = {
      queryParams: getDepartmentParam,
    };
    try {
      await lazyGetDepartmentTrigger(getDepartmentParameter)?.unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    getDepartmentListData;
  }, [page, pageLimit, search]);

  return {
    setSearch,
    setPageLimit,
    setPage,
    lazyGetDepartmentData,
  };
};
