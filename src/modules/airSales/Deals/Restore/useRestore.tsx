import { useState } from 'react';

import { useTheme } from '@mui/material';

import {
  useGetRestoreDealsQuery,
  useUpdateRestoreDealsMutation,
} from '@/services/airSales/deals';
import { enqueueSnackbar } from 'notistack';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

const useRestore = () => {
  const theme = useTheme();
  const [IsRestoreFilterDrawer, setIsRestoreFilterDrawer] = useState(false);
  const [search, setSearch] = useState('');
  const [isPermanantlyDel, setIsPermanantlyDel] = useState(false);
  const [IsRestoreDealModal, setIsRestoreDealModal] = useState(false);
  const [checkedAll, setCheckedAll] = useState<string[]>([]);
  const [restoreFilter, setRestoreFilter] = useState({
    dateStart: '',
    dateEnd: '',
  });
  const restoeApiParam = {
    page: 1,
    limit: 10,
    search: search ? search : undefined,
    dateStart: restoreFilter?.dateStart
      ? dayjs(restoreFilter?.dateStart)?.format(DATE_FORMAT?.API)
      : undefined,
    dateEnd: restoreFilter?.dateEnd
      ? dayjs(restoreFilter?.dateEnd)?.format(DATE_FORMAT?.API)
      : undefined,
  };

  const { data: restoeDealData } = useGetRestoreDealsQuery({
    params: restoeApiParam,
  });

  const [updateRestoreMutation] = useUpdateRestoreDealsMutation();

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
      await updateRestoreMutation({ id: checkedAll, action })?.unwrap();
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
  };
};

export default useRestore;
