import { PAGINATION } from '@/config';
import {
  useDeleteNewsEventsMutation,
  useGetNewsEventsQuery,
  useUpdateNewsEventsMutation,
} from '@/services/superAdmin/settings/news-events';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import {
  newsAndEventsDateDefaultValues,
  newsAndEventsDateValidationSchema,
} from './NewsAndEvents.data';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

const useNewsAndEvents = () => {
  const theme = useTheme();
  const [isOpenEditDrawer, setIsOpenEditDrawer] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [tableRowValues, setTableRowValues] = useState();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isNewsAndEventAddModal, setIsNewsAndEventAddModal] = useState(false);
  const [isNewsAndEventAdd, setIsNewsAndEventAdd] = useState(false);
  const [isNewsAndEventsDeleteModal, setisNewsAndEventsDeleteModal] =
    useState(false);

  const actionMenuOpen = Boolean(anchorEl);

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [isNewsAndEventsFilterDrawerOpen, setIsNewsAndEventsFilterDrawerOpen] =
    useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [filterParams, setFilterParams] = useState({});
  const paginationParams = {
    page: page,
    limit: pageLimit,
  };
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const { data: NewsEventsData, isLoading } = useGetNewsEventsQuery({
    params: { ...paginationParams, ...searchPayLoad, ...filterParams },
  });
  const [updateNewsEvents] = useUpdateNewsEventsMutation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenEditDrawer = () => {
    setAnchorEl(null);
    setIsNewsAndEventAddModal(true);
    setIsNewsAndEventAdd(true);
  };
  const handleCloseEditDrawer = () => {
    setIsOpenEditDrawer(false);
  };

  const methodsNewsAndEventsFilters = useForm({
    resolver: yupResolver(newsAndEventsDateValidationSchema),
    defaultValues: newsAndEventsDateDefaultValues,
  });
  const onSubmit = (value: any) => {
    const filterNewsAndEventsValues = {
      ...(value?.status && { status: value?.status }),
      ...(value?.type && { type: value?.type }),
      ...(value?.createdDate && {
        createdDate: dayjs(value?.createdDate)?.format(DATE_FORMAT?.API),
      }),
    };
    setFilterParams(filterNewsAndEventsValues);

    setIsNewsAndEventsFilterDrawerOpen(false);
  };
  const { handleSubmit, reset } = methodsNewsAndEventsFilters;

  const handleRefresh = () => {
    setFilterParams('');
    reset();
  };

  const [deleteNewsEvents] = useDeleteNewsEventsMutation();

  const handleDelete = async () => {
    try {
      await deleteNewsEvents(tableRowValues?.row?.original?._id)?.unwrap();
      enqueueSnackbar('Record has been deleted.', {
        variant: 'success',
      });
      setisNewsAndEventsDeleteModal(false);
      setTableRowValues('');
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  const handleUpdateStatus = async (status: string) => {
    if (tableRowValues?.row?.original?.status === status) {
      enqueueSnackbar(
        `${tableRowValues?.row?.original?.name} is already ${status}`,
        {
          variant: 'error',
        },
      );
      setTableRowValues('');
      setIsDisabled(false);
    } else {
      try {
        await updateNewsEvents({
          id: tableRowValues?.row?.original?._id,
          body: { status: status },
        })?.unwrap();
        enqueueSnackbar(
          `${tableRowValues?.row?.original?.name} is ${status} now`,
          {
            variant: status === 'active' ? 'success' : 'error',
          },
        );
        setAnchorEl(null);
        setIsNewsAndEventAddModal(false);
        setTableRowValues('');
        setIsDisabled(false);
        reset();
      } catch (error: any) {
        enqueueSnackbar('An error occured', {
          variant: 'error',
        });
      }
    }
  };

  return {
    anchorEl,
    actionMenuOpen,
    handleClick,
    handleClose,
    isDisabled,
    setIsDisabled,
    tableRowValues,
    setTableRowValues,
    isOpenEditDrawer,
    handleOpenEditDrawer,
    handleCloseEditDrawer,
    NewsEventsData,
    isLoading,
    setPageLimit,
    setPage,
    searchValue,
    setSearchValue,
    methodsNewsAndEventsFilters,
    handleSubmit,
    setIsNewsAndEventsFilterDrawerOpen,
    isNewsAndEventsFilterDrawerOpen,
    onSubmit,
    handleRefresh,
    theme,
    isNewsAndEventAddModal,
    setIsNewsAndEventAddModal,
    isNewsAndEventAdd,
    handleDelete,
    isNewsAndEventsDeleteModal,
    setisNewsAndEventsDeleteModal,
    setAnchorEl,
    handleUpdateStatus,
  };
};
export default useNewsAndEvents;
