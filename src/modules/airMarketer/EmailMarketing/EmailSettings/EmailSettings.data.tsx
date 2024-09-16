import { RHFTextField } from '@/components/ReactHookForm';
import { IMG_URL } from '@/config';
import { DATE_TIME_FORMAT } from '@/constants';
import { Box, Checkbox } from '@mui/material';
import dayjs from 'dayjs';
import Image from 'next/image';
import * as Yup from 'yup';

export const linkNewEmailValidationSchema = () => {
  return Yup?.object()?.shape({
    name: Yup?.string()?.required('Name is required'),
    email: Yup?.string()
      ?.required('Email is required')
      .email('Invalid email format'),
  });
};

export const linkNewEmailDefaultValues = () => {
  return {
    name: '',
    email: '',
  };
};
export const linkNewEmailDataArray = [
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
      required: true,
      placeholder: 'Enter name',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'email',
      label: 'Email',
      fullWidth: true,
      required: true,
      placeholder: 'Enter email',
    },
    component: RHFTextField,
    md: 12,
  },
];

export const columns = (
  setSelectedRecords: any,
  selectedRecords: any,
  data: any,
) => {
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
            (record: any) => record?._id === info?.row?.original?._id,
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
      accessorFn: (row: any) => row?.username,
      id: 'username',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image
            src={`${IMG_URL}${info?.row?.original?.createdByAvatar?.url}`}
            alt="user"
            width={20}
            height={20}
            style={{ borderRadius: '50%', overflow: 'hidden' }}
          />
          {info.row.original?.username}
        </Box>
      ),
      header: 'Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.email,
      id: 'email',
      isSortable: true,
      header: 'Email',
      cell: (info: any) => <>{info?.getValue()}</>,
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => <>{info?.getValue()}</>,
    },
    {
      accessorFn: (row: any) => row?.updatedAt,
      id: 'updatedAt',
      isSortable: true,
      header: 'Date',
      cell: (info: any) => (
        <>{dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.DMDHMA)}</>
      ),
    },
  ];
};
