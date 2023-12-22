import { PAGINATION } from '@/config';
import {
  useDeleteCallsMutation,
  useGetCallsQuery,
} from '@/services/commonFeatures/calling';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

const useScheduleCalls = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [deleteCalls] = useDeleteCallsMutation();
  const { data: Calls, isLoading } = useGetCallsQuery({
    page,
    pageLimit,
  });

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);

  const selectedId = selectedCheckboxes.map(
    (selectedItem: any) => selectedItem?._id,
  );

  const selectedCheckboxesId = selectedCheckboxes && selectedId[0];

  const deleteCallsHandler = async () => {
    try {
      await deleteCalls({ id: selectedCheckboxesId })?.unwrap();
      enqueueSnackbar('Record Deleted Successfully', { variant: 'success' });
    } catch (error) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
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
    Calls: Calls?.data,
    setPage,
    setPageLimit,
    isLoading,
    selectedCheckboxes,
    handleCheckboxChange,
    deleteCallsHandler,
  };
};

export default useScheduleCalls;
