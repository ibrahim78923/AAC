import { useState } from 'react';

import { Theme, useTheme } from '@mui/material';

import useToggle from '@/hooks/useToggle';
import { companiesAPI } from '@/services/commonFeatures/companies';
import { PAGINATION } from '@/config';

const useCompanies = () => {
  const theme = useTheme<Theme>();

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isCreateView, setIsCreateView] = useState<any>(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isCustomize, setIsCustomize] = useState(false);
  const [isToggled, toggle] = useToggle(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isReassign, setIsReassign] = useState(false);
  const [isExport, setIsExport] = useState(false);
  const [isDeleteCompany, setIsDeleteCompany] = useState(false);
  const [isImport, setIsImport] = useState(false);
  const [isMerge, setIsMerge] = useState(false);

  const [searchVal, setSearchVal] = useState('');
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [checkedRows, setCheckedRows] = useState();
  const [selectedValue, setSelectedValue] = useState(null);

  const companiesParams = {
    page: page,
    limit: pageLimit,
    search: searchVal ?? undefined,
  };

  const { useGetAllCompaniesQuery, useDeleteCompaniesMutation } = companiesAPI;

  const {
    data: getAllCompanies,
    isLoading,
    isSuccess,
  } = useGetAllCompaniesQuery(companiesParams);

  const [deleteCompanies] = useDeleteCompaniesMutation();

  const handleClose = () => {
    setSelectedValue(null);
  };

  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  return {
    theme,
    isOpenDrawer,
    setIsOpenDrawer,
    isFilter,
    setIsFilter,
    isCustomize,
    setIsCustomize,
    isToggled,
    toggle,
    handleClick,
    handleClose,
    selectedValue,
    isCreateView,
    setIsCreateView,
    isPreview,
    setIsPreview,
    isReassign,
    setIsReassign,
    isExport,
    setIsExport,
    isDeleteCompany,
    setIsDeleteCompany,
    isMerge,
    setIsMerge,
    isImport,
    setIsImport,
    getAllCompanies,
    setPageLimit,
    setPage,
    checkedRows,
    setCheckedRows,
    searchVal,
    setSearchVal,
    isLoading,
    isSuccess,
    deleteCompanies,
  };
};

export default useCompanies;
