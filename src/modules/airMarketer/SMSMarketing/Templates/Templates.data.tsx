import { Box } from '@mui/material';
import { DeleteIcon, EditBlackIcon } from '@/assets/icons';
import { AIR_MARKETER } from '@/routesConstants/paths';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

// table
// export const TemplatesTableData: any = [
//   {
//     Id: 1,
//     name: `Fund Raising`,
//     Description:
//       'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con',
//     Category: ' Account update',
//     createdDate: ' 31-Dec-2023 ',
//     action: 'action',
//   },
//   {
//     Id: 2,
//     name: `Summer Sale`,
//     Description:
//       'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed qu',
//     Category: ' Ticket Update',
//     createdDate: ' 14-Dec-2022',
//     action: 'action',
//   },

//   {
//     Id: 3,
//     name: `New Launch`,
//     Description:
//       'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al',
//     Category: ' Alert Update',
//     createdDate: '11-Dec-2022',
//     action: 'action',
//   },
// ];

export const columns = (setIsOpenAlert: any, navigate: any, theme: any) => {
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
      cell: (info: any) => dayjs(info.getValue())?.format(DATE_FORMAT?.API),
    },
    {
      accessorFn: (row: any) => row?.action,
      id: 'action',
      isSortable: false,
      header: 'Action',
      cell: () => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
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
                query: { type: 'Edit' },
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
              setIsOpenAlert(true);
            }}
          >
            <DeleteIcon />
          </Box>
        </Box>
      ),
    },
  ];
};
