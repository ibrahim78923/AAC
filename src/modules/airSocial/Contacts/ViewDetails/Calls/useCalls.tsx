import { useState } from 'react';

import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import {
  useGetCallsQuery,
  usePostCallMutation,
} from '@/services/commonFeatures/contact-calls';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';

const useCalls = () => {
  const [selectedRow, setSelectedRow]: any = useState([]);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [rowId, setRowId] = useState(null);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  // const defaultParams = {
  //   page: PAGINATION?.CURRENT_PAGE,
  //   limit: PAGINATION?.PAGE_LIMIT,
  // };
  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageLimit,
  });

  const { data: dataGetCalls, isLoading: loadingGetCalls } = useGetCallsQuery({
    params: filterParams,
  });

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

  // Dropdown Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleActionsMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleActionsMenuClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  // Add FAQ
  const [postAddCall, { isLoading: loadingAddCall }] = usePostCallMutation();
  const [openDrawerAddCall, setOpenDrawerAddCall] = useState(false);
  const methodsAddCall = useForm({});

  const { handleSubmit: handleMethodAddCall, reset: resetAddCallForm } =
    methodsAddCall;

  const handleOpenDrawerAddCall = () => {
    setOpenDrawerAddCall(true);
  };
  const handleCloseDrawerAddCall = () => {
    setOpenDrawerAddCall(false);
    resetAddCallForm();
  };

  const onSubmitAddCall = async (values: any) => {
    try {
      await postAddCall({ body: values })?.unwrap();
      handleCloseDrawerAddCall();
      enqueueSnackbar('FAQ added successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleAddCallSubmit = handleMethodAddCall(onSubmitAddCall);

  return {
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
    loadingGetCalls,
    dataGetCalls,
    setPageLimit,
    setPage,
    handlePageChange,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,

    theme,
    loadingAddCall,
    openDrawerAddCall,
    methodsAddCall,
    handleOpenDrawerAddCall,
    handleCloseDrawerAddCall,
    handleAddCallSubmit,
  };
};

export default useCalls;
