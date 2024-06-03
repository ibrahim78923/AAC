import { DATE_FORMAT } from '@/constants';
import { setSelectedDealsTaskIds } from '@/redux/slices/airSales/Deals/ViewDetails/Tasks/taskSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { convertIdToShortNumber } from '@/utils';
import { Box, Checkbox } from '@mui/material';
import dayjs from 'dayjs';

export const columns = ({ data }: any) => {
  const dispatch: any = useAppDispatch();
  const selectedTaskIds = useAppSelector(
    (state: any) => state?.task_deals?.selectedDealsTaskIds,
  );
  const handleClick = (itemId: any) => {
    if (selectedTaskIds?.includes(itemId)) {
      dispatch(
        setSelectedDealsTaskIds(
          selectedTaskIds?.filter((id: any) => id !== itemId),
        ),
      );
    } else {
      dispatch(setSelectedDealsTaskIds([...selectedTaskIds, itemId]));
    }
  };
  const handleSelectAll = () => {
    if (selectedTaskIds?.length === data?.length) {
      dispatch(setSelectedDealsTaskIds([]));
    } else {
      const allTaskIds = data?.map((task: any) => task?._id);
      dispatch(setSelectedDealsTaskIds(allTaskIds));
    }
  };

  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          checked={selectedTaskIds?.includes(info?.row?.original?._id)}
          color="primary"
          name={info?.getValue()}
          onClick={() => handleClick(info?.row?.original?._id)}
        />
      ),
      header: (
        <Checkbox
          color="primary"
          name="Id"
          onClick={handleSelectAll}
          checked={selectedTaskIds?.length === data?.length}
        />
      ),
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?._id,
      id: 'taskno',
      cell: (info: any) => convertIdToShortNumber(info?.getValue()) ?? 'N/A',
      header: 'Task No',
      isSortable: true,
    },

    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: true,
      header: 'Task Name',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },

    {
      accessorFn: (row: any) => row?.dueDate,
      id: 'dueDate',
      isSortable: true,
      header: 'Due Date',
      cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
    },

    {
      accessorFn: (row: any) => row?.assignTo?.firstName,
      id: 'assignedTo',
      isSortable: true,
      header: 'Assigned To',
      cell: (info: any) => (
        <Box>
          {`${info?.row?.original?.assignTo?.firstName ?? 'N'} ${
            info?.row?.original?.assignTo?.lastName ?? '/A'
          }`}
        </Box>
      ),
    },
  ];
};
