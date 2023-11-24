import { useState } from 'react';
import {
  useDeleteEnquiryMutation,
  useGetEnquiriesQuery,
} from '@/services/superAdmin/enquiries';
import { Checkbox } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

export const useEnquiries = () => {
  const [search, setSearch] = useState('');
  const [tableRowIds, setTableRowIds] = useState<string[]>([]);
  const [isEnquiriesDeleteModal, setIsEnquiriesDeleteModal] = useState(false);

  const [deleteRnquiriesMutation] = useDeleteEnquiryMutation();
  const {
    data: enquiriesData,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetEnquiriesQuery({});

  const handleAction = (checked: boolean, id: string) => {
    if (checked) {
      setTableRowIds([...tableRowIds, id]);
    } else {
      setTableRowIds(tableRowIds?.filter((_id) => _id !== id));
    }
  };
  const handleDeleteModal = () => {
    setIsEnquiriesDeleteModal(!isEnquiriesDeleteModal);
  };
  const handleDeleteEnquiries = async () => {
    try {
      await deleteRnquiriesMutation({ ids: tableRowIds?.join(',') });
      handleDeleteModal();
      enqueueSnackbar('Enquiries delete successfully', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('Error while deleting enquiries', {
        variant: 'success',
      });
    }
  };

  const columns: any = [
    {
      accessorFn: (row: any) => row._id,
      id: 'id',
      cell: (info: any) => (
        <Checkbox
          onChange={({ target: { checked } }) => {
            handleAction(checked, info?.row?.original?._id);
          }}
          color="primary"
          checked={tableRowIds.includes(info?.row?.original?._id)}
          name={info?.getValue()}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => info?.getValue() ?? '--',
      header: 'Name',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.companyName,
      id: 'companyName',
      isSortable: true,
      header: 'Company Name',
      cell: (info: any) => info?.getValue() ?? '--',
    },
    {
      accessorFn: (row: any) => row?.email,
      id: 'email',
      isSortable: true,
      header: 'Email',
      cell: (info: any) => info?.getValue() ?? '--',
    },
    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'phoneNumber',
      isSortable: true,
      header: 'Phone Number',
      cell: (info: any) => info?.getValue() ?? '--',
    },
    {
      accessorFn: (row: any) => row?.comments,
      id: 'comments',
      isSortable: true,
      header: 'Comments',
      cell: (info: any) => info?.getValue() ?? '--',
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info?.getValue() ?? '--',
    },
  ];

  const tableData = {
    data: enquiriesData?.data?.enquiries,
    columns,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  };

  return {
    tableData,
    tableRowIds,
    handleDeleteEnquiries,
    handleDeleteModal,
    isEnquiriesDeleteModal,
    search,
    setSearch,
  };
};
