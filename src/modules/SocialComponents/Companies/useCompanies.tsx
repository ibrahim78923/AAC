import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import useToggle from '@/hooks/useToggle';
import { companiesAPI } from '@/services/commonFeatures/companies';
import { PAGINATION } from '@/config';

const useCompanies = () => {
  const theme = useTheme<Theme>();

  const [isToggled, toggle] = useToggle(false);
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [searchVal, setSearchVal] = useState('');
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [selectedValue, setSelectedValue] = useState(null);

  const [isOpen, setIsOpen] = useState({
    createCompanyDrawer: false,
    createViewDrawer: false,
    filtersDrawer: false,
    customizeDrawer: false,
    importDrawer: false,
    previewDrawer: false,
    reassignModal: false,
    exportModal: false,
    deleteModal: false,
    mergeModal: false,
  });

  const [filterValues, setFilterValues] = useState({
    industry: '',
    name: '',
    crn: '',
    ownerId: '',
    dateStart: null,
    dateEnd: null,
  });

  const companiesParams = {
    page: page,
    limit: pageLimit,
    search: searchVal ?? undefined,
    industry: filterValues?.industry ? filterValues?.industry : undefined,
    name: filterValues?.name ? filterValues?.name : undefined,
    crn: filterValues?.crn ? filterValues?.crn : undefined,
    ownerId: filterValues?.ownerId ? filterValues?.ownerId : undefined,
    dateStart: filterValues?.dateStart ?? undefined,
    dateEnd: filterValues?.dateEnd ?? undefined,
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

  const handleResetFilters = () => {
    setFilterValues({
      industry: '',
      name: '',
      crn: '',
      ownerId: '',
      dateStart: null,
      dateEnd: null,
    });
  };

  return {
    theme,
    isToggled,
    toggle,
    handleClick,
    handleClose,
    selectedValue,
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
    filterValues,
    setFilterValues,
    handleResetFilters,
    isOpen,
    setIsOpen,
  };
};

export default useCompanies;
