import { DATE_TIME_FORMAT } from '@/constants';
import { Box, Checkbox } from '@mui/material';
import dayjs from 'dayjs';
export const columns: any = (columnsProps: any) => {
  const { selectedRec, setSelectedRec, compaignsTasksData, setStatusVariant } =
    columnsProps;

  const handleSelectTaskById = (
    checked: boolean,
    id: string,
    status: any,
  ): void => {
    if (checked) {
      setSelectedRec([...selectedRec, id]);
      setStatusVariant(status);
    } else {
      setSelectedRec(selectedRec?.filter((_id: any) => _id !== id));
    }
  };

  const handleSelectAllTasks = (checked: boolean): void => {
    setSelectedRec(
      checked ? compaignsTasksData?.map(({ _id }: any) => _id) : [],
    );
  };

  return [
    {
      accessorFn: (row: any) => row?._id,
      id: 'Id',
      cell: ({ row: { original } }: any) => (
        <Checkbox
          checked={selectedRec?.includes(original?._id)}
          onChange={({ target }) => {
            handleSelectTaskById(
              target.checked,
              original?._id,
              original?.status,
            );
          }}
        />
      ),
      header: (
        <Checkbox
          onChange={({ target }) => {
            handleSelectAllTasks(target.checked);
          }}
          checked={
            compaignsTasksData?.length &&
            selectedRec?.length === compaignsTasksData?.length
          }
        />
      ),
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.taskName,
      id: 'taskName',
      cell: (info: any) => info?.getValue() ?? 'N/A',
      header: 'Task Name',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'taskStatus',
      isSortable: true,
      header: 'Task Status',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.campaignDetails[0]?.title,
      id: 'campaignName',
      isSortable: true,
      header: 'Campaign Name',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.taskType,
      id: 'taskType',
      isSortable: true,
      header: 'Task Type',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.assignedTo[0],
      id: 'assignedUser',
      isSortable: true,
      header: 'Assigned User',
      cell: (info: any) =>
        ` ${info?.getValue()?.firstName} ${info?.getValue()?.lastName}` ??
        'N/A',
    },
    {
      accessorFn: (row: any) => row?.dueDate,
      id: 'lastDate',
      isSortable: true,
      header: 'Last Date',
      cell: (info: any) =>
        dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.DDMMYYYYT) ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.note,
      id: 'taskNotes',
      isSortable: true,
      header: 'Task Notes',
      cell: (info: any) => (
        <Box dangerouslySetInnerHTML={{ __html: info?.getValue() ?? 'N/A' }} />
      ),
    },
  ];
};
