import { Box } from '@mui/material';
import { DeleteIcon, EditBlackIcon } from '@/assets/icons';
import { AIR_MARKETER } from '@/routesConstants/paths';
import dayjs from 'dayjs';
import { DATE_FORMAT, TASK_TYPE } from '@/constants';

export const columns = (
  setIsOpenDeleteModal: any,
  navigate: any,
  theme: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => info.getValue(),
      header: 'Template Name',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.detail,
      id: 'description',
      isSortable: false,
      header: 'Description',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.category,
      id: 'Category',
      isSortable: false,
      header: 'Category',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdDate',
      isSortable: false,
      header: 'createdDate',
      cell: (info: any) => dayjs(info.getValue())?.format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: any) => row?.action,
      id: 'action',
      isSortable: false,
      header: 'Action',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box
            sx={{
              cursor: 'pointer',
              background: theme?.palette?.grey?.[400],
              padding: '5px',
              borderRadius: '50%',
            }}
            onClick={() => {
              navigate.push({
                pathname: AIR_MARKETER?.CREATE_TEMPLATE,
                query: {
                  data: JSON.stringify(info?.row?.original),
                  type: TASK_TYPE?.EDIT_TASK,
                },
              });
            }}
          >
            <EditBlackIcon />
          </Box>
          <Box
            sx={{
              cursor: 'pointer',
              background: theme?.palette?.grey?.[400],
              padding: '5px',
              borderRadius: '50%',
            }}
            onClick={() => {
              setIsOpenDeleteModal({
                isToggle: true,
                deleteId: info?.row?.original?._id,
              });
            }}
          >
            <DeleteIcon />
          </Box>
        </Box>
      ),
    },
  ];
};
