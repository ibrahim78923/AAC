import { CallCompletedIcon, CallNotesIcon } from '@/assets/icons';

import { UserDefault, UserProfileVectorImage } from '@/assets/images';

import { Box, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';

export const singleCallDetailsColumns = ({ setIsViewDrawerOpen }: any) => {
  return [
    {
      accessorFn: (row: any) => row?.title,
      id: 'agent',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image
            src={info?.row?.original?.agents?.profileAvatar}
            alt="user-image"
          />
          <Box sx={{ width: '90px' }}>
            <Typography variant="body3">
              {info?.row?.original?.agents?.name}
            </Typography>
          </Box>

          <Box>
            <CallCompletedIcon />
          </Box>
        </Box>
      ),
      header: 'Agent',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.title,
      id: 'Customer',
      cell: (info: any) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Image
            src={info?.row?.original?.customer?.profileAvatar}
            width={40}
            height={40}
            alt="user-image"
          />
          <Box
            sx={{
              width: '140px',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography variant="body3">
              {info?.row?.original?.customer?.name}
            </Typography>
            <Typography variant="body3" color="custom.light">
              {info?.row?.original?.customer?.helpLine}
            </Typography>
          </Box>
        </Box>
      ),
      header: 'Customer',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.callTime,
      id: 'callTime',
      cell: (info: any) => info?.getValue(),
      header: 'Call Time',
      isSortable: true,
    },

    {
      accessorFn: (row: any) => row?.title,
      id: 'id',
      cell: () => (
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Tooltip title="Call Notes" placement="top-start">
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => setIsViewDrawerOpen(true)}
            >
              <CallNotesIcon />
            </Box>
          </Tooltip>
        </Box>
      ),
      header: 'Actions',
      isSortable: true,
    },
  ];
};

export const singleAllCallsDetailsData = [
  {
    id: '01',
    agents: {
      profileAvatar: UserProfileVectorImage,
      name: 'Eleanor Pena',
    },
    customer: {
      profileAvatar: UserDefault,
      name: 'Benjamin Nash',
      helpLine: 'Medical Helpline',
    },
    callTime: '7 min ago',
  },
  {
    id: '02',
    agents: {
      profileAvatar: UserProfileVectorImage,
      name: 'Courtney ',
    },
    customer: {
      profileAvatar: UserDefault,
      name: 'Benjamin Nash',
      helpLine: 'Medical Helpline',
    },
    callTime: '8 min ago',
  },

  {
    id: '03',
    agents: {
      profileAvatar: UserProfileVectorImage,
      name: 'Jerome Bell',
    },
    customer: {
      profileAvatar: UserDefault,
      name: 'Benjamin Nash',
      helpLine: 'Medical Helpline',
    },
    callTime: '10 min ago',
  },
  {
    id: '04',
    agents: {
      profileAvatar: UserProfileVectorImage,
      name: 'Annette Black',
    },
    customer: {
      profileAvatar: UserDefault,
      name: 'Benjamin Nash',
      helpLine: 'Medical Helpline',
    },

    callTime: '6 min ago',
  },
  {
    id: '05',
    agents: {
      profileAvatar: UserProfileVectorImage,
      name: 'Annette Black',
      helpLine: 'Medical Helpline',
    },

    customer: {
      profileAvatar: UserDefault,
      name: 'Benjamin Nash',
      helpLine: 'Medical Helpline',
    },
    callTime: '5 min ago',
  },
];
