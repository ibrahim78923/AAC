import { indexNumbers } from '@/constants';
import { generateImage } from '@/utils/avatarUtils';
import { Avatar, Box, Theme, Typography } from '@mui/material';

export const columns: any = (theme: Theme) => {
  return [
    {
      accessorFn: (row: any) => `${row?.firstName} ${row?.lastName}`,
      id: 'name',
      header: 'Name',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Avatar
            alt="user"
            src={generateImage(info?.row?.original?.profilePicture?.url)}
            sx={{
              width: 35,
              height: 35,
              background: theme?.palette?.grey[400],
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: theme?.palette?.custom?.dim_grey,
              }}
            >
              {info?.row?.original?.firstName
                ?.charAt(indexNumbers?.ZERO)
                ?.toUpperCase()}
              {info?.row?.original?.lastName
                ?.charAt(indexNumbers?.ZERO)
                ?.toUpperCase()}
            </Typography>
          </Avatar>
          {info?.getValue() ?? 'N/A'}
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'phoneNo',
      header: 'Phone Number',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
  ];
};
