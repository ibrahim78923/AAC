import { PAGINATION } from '@/config';
import {
  useDeleteNewsEventsMutation,
  useGetNewsEventsQuery,
  useUpdateNewsEventsMutation,
  usePostNewsEventsMutation,
} from '@/services/superAdmin/settings/news-events';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { MODAL_TITLE } from './NewsAndEvents.data';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import {
  newsAndEventsFormDefaultValues,
  newsAndEventsFormValidationSchema,
} from './NewsAndEventsModal/NewsAndEventsModal.data';

const useNewsAndEvents = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selectedRow, setSelectedRow] = useState([]);
  const [tableRowValues, setTableRowValues] = useState<any>(null);
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
  const [postNewsEvents, { isLoading: loadingAdd }] =
    usePostNewsEventsMutation();
  const [updateNewsEvents, { isLoading: loadingUpdate }] =
    useUpdateNewsEventsMutation();

  const methodsNewsAndEventsFilters = useForm();
  const onSubmit = (value: any) => {
    const filterNewsAndEventsValues = {
      ...(value?.status && { status: value?.status }),
      ...(value?.type && { type: value?.type }),
      ...(value?.createdDate && {
        dateStart: dayjs(value?.createdDate)?.format(DATE_FORMAT?.API),
      }),
      ...(value?.createdDate && {
        dateEnd: dayjs(value?.createdDate)?.format(DATE_FORMAT?.API),
      }),
    };
    setFilterParams(filterNewsAndEventsValues);

    setIsNewsAndEventsFilterDrawerOpen(false);
  };
  const { handleSubmit, reset } = methodsNewsAndEventsFilters;

  const handleRefresh = () => {
    setPageLimit(PAGINATION?.PAGE_LIMIT);
    setPage(PAGINATION?.CURRENT_PAGE);
    setFilterParams({});
    reset();
  };

  // Add/Edit News & Events
  const methodsAddNewsEvents = useForm({
    resolver: yupResolver(newsAndEventsFormValidationSchema),
    defaultValues: newsAndEventsFormDefaultValues,
  });
  const { handleSubmit: handleMethodAddNewsEvent, reset: resetAddNewsEvents } =
    methodsAddNewsEvents;
  const [titleAddModal, setTitleAddModal] = useState('Add');
  const [isNewsAndEventAddModal, setIsNewsAndEventAddModal] = useState(false);

  const handleOpenAddModal = (title: string) => {
    if (title === MODAL_TITLE?.UPDATE) {
      const selectedRowData = NewsEventsData?.data?.newsandevents?.find(
        (item: any) => {
          return item?._id === selectedRow[0];
        },
      );
      methodsAddNewsEvents.setValue('name', selectedRowData?.name);
      methodsAddNewsEvents.setValue('type', selectedRowData?.type);
      methodsAddNewsEvents.setValue(
        'description',
        selectedRowData?.description,
      );
    }
    setTitleAddModal(title);
    setIsNewsAndEventAddModal(true);
  };

  const handleCloseAddModal = () => {
    setIsNewsAndEventAddModal(false);
  };

  const onSubmitAddNewsEvents = async (values: any) => {
    try {
      titleAddModal === MODAL_TITLE.UPDATE
        ? await updateNewsEvents({
            id: tableRowValues?._id,
            body: values,
          })?.unwrap()
        : await postNewsEvents({ body: values })?.unwrap();
      enqueueSnackbar(
        `News Events ${
          titleAddModal === MODAL_TITLE.UPDATE ? 'updated' : 'added'
        } Successfully`,
        {
          variant: 'success',
        },
      );
      handleCloseAddModal();
      resetAddNewsEvents();
      setSelectedRow([]);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleAddNewsEventsSubmit = handleMethodAddNewsEvent(
    onSubmitAddNewsEvents,
  );

  // Delete News & Events
  const [isNewsAndEventsDeleteModal, setisNewsAndEventsDeleteModal] =
    useState(false);
  const [deleteNewsEvents, { isLoading: loadingDelete }] =
    useDeleteNewsEventsMutation();

  const handleDelete = async () => {
    const selectedRowIds = selectedRow?.join(',');
    try {
      await deleteNewsEvents(selectedRowIds)?.unwrap();
      enqueueSnackbar('Record has been deleted.', {
        variant: 'success',
      });
      setisNewsAndEventsDeleteModal(false);
      setSelectedRow([]);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  useEffect(() => {
    if (selectedRow?.length > 0) {
      const selectedRowData = NewsEventsData?.data?.newsandevents?.find(
        (item: any) => {
          return item?._id === selectedRow[0];
        },
      );
      setTableRowValues(selectedRowData);
    }
  }, [selectedRow]);

  const handleUpdateStatus = async (status: string) => {
    if (tableRowValues?.status === status) {
      enqueueSnackbar(`${tableRowValues?.name} is already ${status}`, {
        variant: 'error',
      });
    } else {
      try {
        await updateNewsEvents({
          id: selectedRow[0],
          body: { status: status },
        })?.unwrap();
        enqueueSnackbar(`${tableRowValues?.name} is ${status} now`, {
          variant: status === 'active' ? 'success' : 'error',
        });
        setAnchorEl(null);
        setIsNewsAndEventAddModal(false);
        setSelectedRow([]);
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
    selectedRow,
    setSelectedRow,
    methodsAddNewsEvents,
    titleAddModal,
    isNewsAndEventAddModal,
    handleOpenAddModal,
    handleCloseAddModal,
    handleAddNewsEventsSubmit,
    loadingUpdate,
    loadingAdd,
    tableRowValues,
    setTableRowValues,
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
    handleDelete,
    loadingDelete,
    isNewsAndEventsDeleteModal,
    setisNewsAndEventsDeleteModal,
    handleUpdateStatus,
  };
};
export default useNewsAndEvents;
