import { useEffect, useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import useToggle from '@/hooks/useToggle';
import { companiesAPI } from '@/services/commonFeatures/companies';
import { PAGINATION } from '@/config';
import { useForm } from 'react-hook-form';
import { ALL_COMPANIES } from '@/constants';

const useCompanies = () => {
  const theme = useTheme<Theme>();
  const [isToggled, setIstoggle] = useToggle(false);
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [searchVal, setSearchVal] = useState('');
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [isOpen, setIsOpen] = useState({
    createCompanyDrawer: false,
    createViewDrawer: false,
    filtersDrawer: false,
    customizeDrawer: false,
    // importDrawer: false,
    previewDrawer: false,
    reassignModal: false,
    exportModal: false,
    deleteModal: false,
    mergeModal: false,
  });

  interface Filter {
    page: number;
    limit: number;
    search?: string;
    industry?: string;
    ownerId?: string;
    dateStart?: string;
    dateEnd?: string;
    name?: string;
  }

  const defaultFilterValues = {
    page: page,
    limit: pageLimit,
  };

  const [filterValues, setFilterValues] = useState<Filter>(defaultFilterValues);

  useEffect(() => {
    setFilterValues(defaultFilterValues);
  }, [page, pageLimit]);

  const {
    useGetAllCompaniesQuery,
    useDeleteCompaniesMutation,
    useGetCustomizeColumnsCompaniesQuery,
    useGetCompaniesViewsQuery,
  } = companiesAPI;

  // tabs view code starts here
  const { data: getCompaniesViews } = useGetCompaniesViewsQuery({});

  const dealListApiUrl = getCompaniesViews?.data?.map((obj: any) => {
    const dateStart = obj?.apiUrl?.match(/dateStart=([^&]*)/)[1];
    const dateEnd = obj?.apiUrl?.match(/dateEnd=([^&]*)/)[1];
    return { dateStart, dateEnd, name: obj?.name };
  });

  const tabsArray = [
    { name: 'All Companies', dateStart: '', dateEnd: '' },
  ]?.concat(dealListApiUrl);

  const handleChange = (tab: any, index: number) => {
    setValue(index);
  };

  const handleTabChange = (tab: any) => {
    const startEndDate = {
      dateStart: tab?.dateStart,
      dateEnd: tab?.dateEnd,
    };
    setCheckedRows([]);
    if (tab?.name === ALL_COMPANIES?.ALL_COMPANIES) {
      setFilterValues(defaultFilterValues);
    } else {
      setFilterValues({
        ...filterValues,
        dateStart: startEndDate?.dateStart,
        dateEnd: startEndDate?.dateEnd,
        name: startEndDate?.name,
      });
    }
  };

  const handleSearch = (val: string) => {
    if (val) {
      setFilterValues({ ...filterValues, search: val });
    } else setFilterValues(defaultFilterValues);
  };

  const handleAddTab = () => {
    // setIsAddTabOpen(!isAddTabOpen);
    setIsOpen({ ...isOpen, createViewDrawer: true });
  };

  const handleApplyFilter = (values: any) => {
    const filteredObj = Object?.fromEntries(
      Object.entries(values)?.filter(
        (value) => value[1] !== '' && value[1] !== null,
      ),
    );
    setFilterValues({ ...filterValues, ...filteredObj });
  };

  const {
    data: getAllCompanies,
    isLoading,
    isSuccess,
  } = useGetAllCompaniesQuery({ params: filterValues });

  // tabs view code starts here

  // customize columns code starts here
  const columnsParams = {
    type: 'companies',
  };
  const { data: getCustomizeColumns } =
    useGetCustomizeColumnsCompaniesQuery(columnsParams);

  const activeColumns = getCustomizeColumns?.data?.columns?.filter(
    (column: any) => column?.active === true,
  );

  // customize columns code starts here

  const [deleteCompanies] = useDeleteCompaniesMutation();

  const handleClose = () => {
    setSelectedValue(null);
  };

  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  const methods: any = useForm({});
  const { handleSubmit, reset } = methods;

  const handleResetFilters = () => {
    setFilterValues(defaultFilterValues);
    reset();
    setValue(0);
  };

  return {
    theme,
    isToggled,
    setIstoggle,
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
    tabsArray,
    value,
    setValue,
    handleChange,
    handleTabChange,
    handleAddTab,
    handleSearch,
    handleApplyFilter,
    activeColumns,
    isDrawerOpen,
    setIsDrawerOpen,
    isFilterOpen,
    setIsFilterOpen,
    methods,
    handleSubmit,
  };
};

export default useCompanies;
