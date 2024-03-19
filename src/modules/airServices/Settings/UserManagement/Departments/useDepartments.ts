import { PAGINATION } from '@/config';
import { useLazyGetDepartmentQuery } from '@/services/airServices/settings/user-management/departments';
import { useEffect, useState } from 'react';
import { departmentActionDropdownFunction } from './Departments.data';

export const useDepartments = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpsertModal, setOpenUpsertModal] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const [lazyGetDepartmentTrigger, lazyGetDepartmentStatus]: any =
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
    getDepartmentListData?.();
  }, [page, pageLimit, search]);

  const actionDropdownData = (item: any) => {
    const actionDropdown = departmentActionDropdownFunction?.(
      item,
      setOpenUpsertModal,
      setOpenDeleteModal,
      setSelectedDepartment,
    );
    return actionDropdown;
  };

  return {
    setSearch,
    setPageLimit,
    setPage,
    lazyGetDepartmentStatus,
    openDeleteModal,
    setOpenDeleteModal,
    openUpsertModal,
    setOpenUpsertModal,
    page,
    getDepartmentListData,
    selectedDepartment,
    setSelectedDepartment,
    actionDropdownData,
  };
};
