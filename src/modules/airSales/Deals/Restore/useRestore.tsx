import { useState } from 'react';
import { useTheme } from '@mui/material';
import {
  useGetRestoreDealsQuery,
  useUpdateRestoreDealsMutation,
} from '@/services/airSales/deals';
import { enqueueSnackbar } from 'notistack';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { PAGINATION } from '@/config';

const useRestore = () => {
  const theme = useTheme();
  const [IsRestoreFilterDrawer, setIsRestoreFilterDrawer] = useState(false);
  const [search, setSearch] = useState('');
  const [isPermanantlyDel, setIsPermanantlyDel] = useState(false);
  const [IsRestoreDealModal, setIsRestoreDealModal] = useState(false);
  const [checkedAll, setCheckedAll] = useState<string[]>([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [restoreFilter, setRestoreFilter] = useState({
    dateStart: '',
    dateEnd: '',
  });

  const restoeApiParam = {
    page: page,
    limit: pageLimit,
    search: search ? search : undefined,
    dateStart: restoreFilter?.dateStart
      ? dayjs(restoreFilter?.dateStart)?.format(DATE_FORMAT?.API)
      : undefined,
    dateEnd: restoreFilter?.dateEnd
      ? dayjs(restoreFilter?.dateEnd)?.format(DATE_FORMAT?.API)
      : undefined,
  };

  const {
    data: restoeDealData,
    isLoading: getRestoreDealsLoading,
    isSuccess,
  } = useGetRestoreDealsQuery({
    params: restoeApiParam,
  });

  const [updateRestoreMutation, { isLoading: updateRestoreLoading }] =
    useUpdateRestoreDealsMutation();

  const handlePermanantDelete = () => {
    setIsPermanantlyDel(!isPermanantlyDel);
  };
  const handleResDealModal = () => {
    setIsRestoreDealModal(!IsRestoreDealModal);
  };

  const handleRestoreFilter = () => {
    setIsRestoreFilterDrawer(!IsRestoreFilterDrawer);
  };
  const handleActions = (value: string | any) => {
    switch (value) {
      case 'Restore':
        handleResDealModal();
        break;
      case 'Delete':
        handlePermanantDelete();
        break;
      default:
        break;
    }
  };
  const handleCheckAll = (event: any) => {
    const { checked } = event.target;
    setCheckedAll(
      checked ? restoeDealData?.data?.deals?.map((deal: any) => deal?._id) : [],
    );
  };
  const handleSingleChecked = (event: any, info: any) => {
    const _id = info?.row?.original?._id;
    const { checked } = event.target;
    setCheckedAll(
      checked ? [...checkedAll, _id] : checkedAll?.filter((id) => id !== _id),
    );
  };
  const handlePermanantDeleteRetore = async (
    action: string,
    message: string,
  ) => {
    try {
      await updateRestoreMutation({
        id: checkedAll?.join(','),
        action,
      })?.unwrap();
      enqueueSnackbar(message, { variant: 'success' });
      if (action === 'HARD_DELETED') handlePermanantDelete();
      else handleResDealModal();
      setCheckedAll([]);
    } catch (error) {
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  return {
    IsRestoreFilterDrawer,
    handleRestoreFilter,
    search,
    setSearch,
    handlePermanantDelete,
    handleResDealModal,
    isPermanantlyDel,
    IsRestoreDealModal,
    theme,
    handleActions,
    restoeDealData,
    handleCheckAll,
    handleSingleChecked,
    checkedAll,
    handlePermanantDeleteRetore,
    setRestoreFilter,
    restoreFilter,
    setIsRestoreFilterDrawer,
    setCheckedAll,
    updateRestoreLoading,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    getRestoreDealsLoading,
    isSuccess,
  };
};

export default useRestore;
