import { useState } from 'react';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import {
  useGetLeadCaptureCTAQuery,
  useDeleteLeadCaptureCTAMutation,
} from '@/services/airMarketer/lead-capture/cta';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { customDefaultValues } from './Cta.data';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { isNullOrEmpty } from '@/utils';
import { useAppSelector } from '@/redux/store';
import { downloadLink } from '@/utils/download-blob';

const useCta = () => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('Create');
  const [selectedRowData, setSelectedRowData] = useState<any>(null);

  const handleOpenDrawer = (title: string = drawerTitle, data?: any) => {
    setSelectedRowData(data);
    setDrawerTitle(title);
    setIsDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Get CTA's Data
  const [selectedRow, setSelectedRow]: any = useState([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchValue, setSearchValue] = useState(null);
  const paginationParams = {
    page: page,
    limit: pageLimit,
  };

  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }

  const {
    data: dataGetCTAs,
    isLoading: loadingGetCTAs,
    isFetching: fetchingGetCTAs,
  } = useGetLeadCaptureCTAQuery({
    params: { ...searchPayLoad, ...paginationParams },
  });

  // Delete CTA
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteCTA, { isLoading: loadingDelete }] =
    useDeleteLeadCaptureCTAMutation();

  const handleOpenModalDelete = () => {
    setIsDeleteModal(true);
  };
  const handleCloseModalDelete = () => {
    setIsDeleteModal(false);
  };

  const handleDeleteCTA = async () => {
    const items = await selectedRow?.join(',');
    try {
      await deleteCTA(items)?.unwrap();
      handleCloseModalDelete();
      setSelectedRow([]);
      enqueueSnackbar('Record has been deleted.', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  // Export CTA
  const [openModalExport, setOpenModalExport] = useState(false);
  const [checkedValue, setCheckedValue] = useState(null);

  const handleOpenModalExport = () => {
    setOpenModalExport(true);
  };

  const handleCloseModalExport = () => {
    setOpenModalExport(false);
    setCheckedValue(null);
  };

  const handleChangeCheckbox = (value: any) => {
    setCheckedValue(value === checkedValue ? null : value);
  };

  const methods: any = useForm({
    defaultValues: customDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const socket = useAppSelector((state) => state?.chat?.socket);
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);

  const downloadFile = (payload: { url: string }) => {
    setIsLoadingDownload(false);
    handleCloseModalExport();

    if (payload && payload.url) {
      downloadLink(payload.url);
      successSnackbar('Your download will start soon');
      handleCloseModalExport();
      reset();
    } else {
      errorSnackbar('Failed to retrieve download link.');
    }
  };

  const handleExportSubmit = async (value: any) => {
    if (!isNullOrEmpty(value?.file)) {
      let downloadHandled = false;
      const queryParams = {
        exportType: value?.file,
      };

      try {
        setIsLoadingDownload(true);
        socket.emit('exportLeadCaptureCTAs', queryParams);
        socket.once('download-link', (payload: any) => {
          downloadHandled = true;
          downloadFile(payload);
        });
        socket.once('exception', (error: any) => {
          if (!downloadHandled) {
            setIsLoadingDownload(false);
            handleCloseModalExport();
            reset();
            errorSnackbar(error?.message ?? 'error occurred');
          }
        });
      } catch (error: any) {
        setIsLoadingDownload(false);
        handleCloseModalExport();
        errorSnackbar(
          error?.data?.message ?? 'An error occurred while downloading.',
        );
      }
    } else {
      errorSnackbar(`Enter File Format`);
    }
  };

  return {
    theme,
    isDrawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    selectedRowData,
    drawerTitle,
    dataGetCTAs,
    loadingGetCTAs,
    fetchingGetCTAs,
    setSearchValue,
    setPageLimit,
    setPage,
    selectedRow,
    setSelectedRow,

    isDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteCTA,
    loadingDelete,

    openModalExport,
    handleOpenModalExport,
    handleCloseModalExport,
    handleExportSubmit,
    handleChangeCheckbox,
    checkedValue,
    methods,
    handleSubmit,
    isLoadingDownload,
  };
};

export default useCta;
