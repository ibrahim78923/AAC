import { useState } from 'react';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import {
  useGetLeadCaptureCTAQuery,
  useDeleteLeadCaptureCTAMutation,
  useLazyGetCTAsListAsExportQuery,
} from '@/services/airMarketer/lead-capture/cta';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { customDefaultValues } from './Cta.data';
import { downloadFile } from '@/utils/file';
import { EXPORT_FILE_TYPE } from '@/constants/strings';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { isNullOrEmpty } from '@/utils';

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
  const [lazyGetExportCTAsTrigger, { isLoading }] =
    useLazyGetCTAsListAsExportQuery();

  const handleExportSubmit = async (value: any) => {
    if (!isNullOrEmpty(value?.file)) {
      const queryParams = {
        exportType: value?.file,
      };
      try {
        const response = await lazyGetExportCTAsTrigger(queryParams)?.unwrap();
        downloadFile(response, 'CTAsLists', EXPORT_FILE_TYPE?.[value?.file]);
        handleCloseModalExport();
        reset();
        successSnackbar(`CTAs Exported successfully`);
      } catch (error: any) {
        errorSnackbar(error?.data?.message);
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
    isLoading,
  };
};

export default useCta;
