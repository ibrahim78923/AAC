import { useState } from 'react';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import {
  useGetLeadCaptureCTAQuery,
  useDeleteLeadCaptureCTAMutation,
} from '@/services/airMarketer/lead-capture/cta';
import { enqueueSnackbar } from 'notistack';

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

  const handleExportSubmit = () => {
    handleCloseModalExport();
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
  };
};

export default useCta;
