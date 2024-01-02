import { useState } from 'react';
import { useTheme } from '@mui/material';
import {
  useDeleteCallsMutation,
  useGetCallsQuery,
} from '@/services/commonFeatures/calling';
import { PAGINATION } from '@/config';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useCalls = () => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const [openAlertModal, setOpenAlertModal] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const query = '&';

  const {
    data: CompanyCalls,
    isLoading,
    isError,
  } = useGetCallsQuery({
    page,
    pageLimit,
    query,
  });

  const [deleteCalls] = useDeleteCallsMutation();

  const selectedId = selectedCheckboxes.map(
    (selectedItem: any) => selectedItem?._id,
  );

  const selectedCheckboxesId = selectedCheckboxes && selectedId;

  const deleteCallsHandler = async () => {
    try {
      await deleteCalls({ id: selectedCheckboxesId })?.unwrap();
      enqueueSnackbar('Record Deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setOpenAlertModal('');
      setSelectedCheckboxes([]);
    } catch (error) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: any,
  ) => {
    const isChecked = event?.target?.checked;

    if (isChecked) {
      setSelectedCheckboxes((prevSelected: any) => [...prevSelected, row]);
    } else {
      setSelectedCheckboxes(
        (prevSelected: any) =>
          prevSelected?.filter((item: any) => item?._id !== row?._id),
      );
    }
  };

  return {
    openDrawer,
    setOpenDrawer,
    theme,
    CompanyCalls,
    isLoading,
    isError,
    setPageLimit,
    setPage,
    handleCheckboxChange,
    setSelectedCheckboxes,
    selectedCheckboxes,
    deleteCallsHandler,
    openAlertModal,
    setOpenAlertModal,
  };
};

export default useCalls;
