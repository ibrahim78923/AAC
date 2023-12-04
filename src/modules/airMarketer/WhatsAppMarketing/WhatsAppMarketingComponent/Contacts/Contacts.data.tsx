import { Box } from '@mui/material';
import Image from 'next/image';

export const columns: any = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    header: 'name',
    cell: (info: any) => (
      <>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{}}>
            <Image
              src={info?.row?.original?.image}
              width={20}
              height={20}
              style={{ borderRadius: '50%' }}
              alt="user-image"
            />
          </Box>
          {info?.getValue()}
        </Box>
      </>
    ),
  },
  {
    accessorFn: (row: any) => row?.phoneNo,
    id: 'phoneNo',
    header: 'Phone Number',
    cell: (info: any) => info?.getValue(),
  },
];
