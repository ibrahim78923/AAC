import { DATE_TIME_FORMAT } from '@/constants';
import { calculatePercentage } from '@/utils';
import { Checkbox, Typography } from '@mui/material';
import dayjs from 'dayjs';

export const columns = (
  setSelectedRecords: any,
  selectedRecords: any,
  data: any,
) => {
  //select on checkbox TO check all records and save them in selectedRecords
  const handleSelectAll = () => {
    if (selectedRecords?.length === data?.length) {
      setSelectedRecords([]);
    } else {
      const allTaskIds = data?.map((task: any) => task);
      setSelectedRecords(allTaskIds);
    }
  };

  const handleClick = (item: any) => {
    if (selectedRecords?.some((record: any) => record?._id === item?._id)) {
      setSelectedRecords(
        selectedRecords?.filter((record: any) => record?._id !== item?._id),
      );
    } else {
      setSelectedRecords([...selectedRecords, item]);
    }
  };

  return [
    {
      accessorFn: (row: any) => row?.id,
      id: 'id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          name={info?.getValue()}
          checked={selectedRecords?.some(
            (record: any) => record._id === info?.row?.original?._id,
          )}
          onClick={() => handleClick(info?.row?.original)}
        />
      ),
      header: (
        <Checkbox
          color="primary"
          name="id"
          onClick={handleSelectAll}
          checked={
            data?.length > 0 ? data?.length === selectedRecords?.length : false
          }
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.subject,
      id: 'subject',
      cell: (info: any) => (
        <Typography variant="body3" fontWeight={500}>
          {info?.getValue()}
        </Typography>
      ),
      header: 'Subject',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.visibleTo,
      id: 'visibleTo',
      isSortable: true,
      header: 'Visible To',
      cell: (info: any) => (
        <>
          {info?.getValue()?.charAt(0)?.toUpperCase() +
            info?.getValue()?.slice(1)?.toLowerCase()}
        </>
      ),
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Published Date',
      cell: (info: any) => (
        <>{dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.DMDHMA)}</>
      ),
    },
    {
      accessorFn: (row: any) => row?.createdByName,
      id: 'createdByName',
      isSortable: true,
      header: 'Created By',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.open,
      id: 'open',
      isSortable: true,
      header: 'Open Rate',
      cell: (info: any) => (
        <Typography variant="body3" fontWeight={500}>
          {calculatePercentage(
            info?.row?.original?.open,
            info?.row?.original?.total,
          )}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.updatedAt,
      id: 'updatedAt',
      isSortable: true,
      header: 'Last Updated',
      cell: (info: any) => (
        <>{dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.DMDHMA)}</>
      ),
    },
  ];
};
