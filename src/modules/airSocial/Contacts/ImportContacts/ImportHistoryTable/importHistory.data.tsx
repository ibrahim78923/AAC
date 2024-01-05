import { Box, Typography } from '@mui/material';

import { SUPER_ADMIN } from '@/constants';

import { useRouter } from 'next/router';

export const ContactsHistoryColumns: any = [
  {
    accessorFn: (row: any) => row?.id,
    id: 'Sr.No',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.FileName,
    id: 'fileName',
    header: 'File Name',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.RecordsCreated,
    id: 'recordsCreated',
    isSortable: true,
    header: 'Records Created',
    cell: (info: any) => {
      const route = useRouter();
      const value = info?.getValue();
      return (
        <Box display="flex" gap={1}>
          {value}
          {value === '0' && (
            <Typography
              onClick={() => route?.push(SUPER_ADMIN?.IMPORT_RECORD)}
              variant="body3"
              sx={{
                cursor: 'pointer',
                textDecoration: 'underline',
                color: '#4CCFBC',
              }}
            >
              {' '}
              (view){' '}
            </Typography>
          )}
        </Box>
      );
    },
  },
  {
    accessorFn: (row: any) => row?.RecordsUpdated,
    id: 'recordsUpdated',
    isSortable: true,
    header: 'Records Updated',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.RecordsErrored,
    id: 'recordsErrored',
    isSortable: true,
    header: 'Records Errored',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.ImportedBy,
    id: 'importedBy',
    isSortable: true,
    header: 'Imported By',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.ImportedAt,
    id: 'importedAt',
    isSortable: true,
    header: 'Imported At',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.Status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => info?.getValue(),
  },
];
