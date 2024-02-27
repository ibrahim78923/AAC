import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { enqueueSnackbar } from 'notistack';
// import { yupResolver } from '@hookform/resolvers/yup';
// import dayjs from 'dayjs';

import { PAGINATION } from '@/config';
// import { DATE_FORMAT } from '@/constants/index';

const useUsers = () => {
  const [selectedRow, setSelectedRow]: any = useState([]);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [rowId, setRowId] = useState(null);

  // OPEN/CLOSE ACTIONS MENU
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // GET USERS
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  // const defaultParams = {
  //   page: PAGINATION?.CURRENT_PAGE,
  //   limit: PAGINATION?.PAGE_LIMIT,
  // };
  const [searchValue, setSearchValue] = useState(null);
  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageLimit,
  });
  // let searchPayLoad;
  // if (searchValue) {
  //   searchPayLoad = { search: searchValue };
  // }
  // const { data: jopPostingData, isLoading: loadingJobPosting } =
  //   useGetJobsQuery({ params: { ...filterParams, ...searchPayLoad } });
  // const methodsFilter: any = useForm();
  //const { handleSubmit: handleMethodFilter, reset: ressetFilterForm } = methodsFilter;

  // Hadle PAGE CHANGE
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setFilterParams((prev) => {
      return {
        ...prev,
        page: newPage,
      };
    });
  };

  return {
    anchorEl,
    actionMenuOpen,
    handleActionsClick,
    handleClose,
    filterParams,
    searchValue,
    setSearchValue,
    setPageLimit,
    setPage,
    handlePageChange,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,
  };
};
export default useUsers;
