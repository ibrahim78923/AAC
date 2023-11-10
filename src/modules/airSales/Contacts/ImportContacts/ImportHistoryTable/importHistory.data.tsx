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
    header: 'fileName',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.RecordsCreated,
    id: 'recordsCreated',
    isSortable: true,
    header: 'recordsCreated',
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
    header: 'recordsUpdated',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.RecordsErrored,
    id: 'recordsErrored',
    isSortable: true,
    header: 'recordsErrored',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.ImportedBy,
    id: 'importedBy',
    isSortable: true,
    header: 'importedBy',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.ImportedAt,
    id: 'importedAt',
    isSortable: true,
    header: 'importedAt',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.Status,
    id: 'status',
    isSortable: true,
    header: 'status',
    cell: (info: any) => info?.getValue(),
  },
];
