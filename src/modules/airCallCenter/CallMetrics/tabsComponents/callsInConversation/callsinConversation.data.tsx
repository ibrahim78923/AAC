import {
  CallCompletedIcon,
  CallListenToDiscretelyIcon,
  CallOutGoingIcon,
} from '@/assets/icons';
import { UserDefault, UserProfileVectorImage } from '@/assets/images';

import { Box, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';

export const callInConversationColumns = ({}: any) => {
  return [
    {
      accessorFn: (row: any) => row?.title,
      id: 'customerName',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image
            src={info?.row?.original?.customerDetails?.profileAvatar}
            alt="user-image"
          />
          <Box sx={{ width: '90px' }}>
            <Typography variant="body3">
              {info?.row?.original?.customerDetails?.name}
            </Typography>
          </Box>
        </Box>
      ),
      header: 'Customer Name',
      isSortable: true,
    },

    {
      accessorFn: (row: any) => row?.types,
      id: 'types',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {info?.row?.original?.types === CallTypes?.COMPLETED ? (
            <Tooltip title="Incoming Calls" placement="top-start">
              <Box>
                <CallCompletedIcon />
              </Box>
            </Tooltip>
          ) : (
            <Tooltip title="Outgoing Calls" placement="top-start">
              <Box>
                <CallOutGoingIcon />
              </Box>
            </Tooltip>
          )}
          <Tooltip title="Listen To Calls Discretely" placement="top-start">
            <Box>
              <CallListenToDiscretelyIcon />
            </Box>
          </Tooltip>
        </Box>
      ),
      header: 'Call Types',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.callDuration,
      id: 'callDuration',
      cell: (info: any) => info?.getValue(),
      header: 'Call Duration',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.title,
      id: 'agentName',
      cell: (info: any) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Image
            src={info?.row?.original?.assignedDetails?.profileAvatar}
            width={40}
            height={40}
            alt="user-image"
          />
          <Box sx={{ width: '100px' }}>
            <Typography variant="body3">
              {info?.row?.original?.assignedDetails?.name}
            </Typography>
          </Box>
        </Box>
      ),
      header: 'Agent Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.averageTakingTime,
      id: 'averageTakingTime',
      cell: (info: any) => info?.getValue(),
      header: 'Average Taking Time',
      isSortable: true,
    },
  ];
};

export const callsInConversationData = [
  {
    id: '01',
    customerDetails: {
      profileAvatar: UserProfileVectorImage,
      name: 'Eleanor Pena',
    },

    callDuration: ':02:30',
    types: 'completed',
    assignedDetails: {
      profileAvatar: UserDefault,
      name: 'Elven Leonhart',
    },
    averageTakingTime: '00:42',
  },
  {
    id: '02',
    customerDetails: {
      profileAvatar: UserProfileVectorImage,
      name: 'Courtney ',
    },

    callDuration: '02:30',
    types: 'completed',
    assignedDetails: {
      profileAvatar: UserDefault,
      name: 'Devon Lane',
    },
    averageTakingTime: '00:42',
  },

  {
    id: '03',
    customerDetails: {
      profileAvatar: UserProfileVectorImage,
      name: 'Jerome Bell',
    },

    types: 'completed',
    callDuration: '02:30',
    assignedDetails: {
      profileAvatar: UserDefault,
      name: 'jenny willson',
    },
    averageTakingTime: '00:42',
  },
  {
    id: '04',
    customerDetails: {
      profileAvatar: UserProfileVectorImage,
      name: 'Annette Black',
    },

    types: 'missed',
    callDuration: '02:30',
    assignedDetails: {
      profileAvatar: UserDefault,
      name: 'Floyd Miles',
    },
    averageTakingTime: '00:42',
  },
  {
    id: '05',
    customerDetails: {
      profileAvatar: UserProfileVectorImage,
      name: 'Annette Black',
    },

    types: 'missed',
    callDuration: '02:30',
    assignedDetails: {
      profileAvatar: UserDefault,
      name: 'Floyd Miles',
    },
    averageTakingTime: '00:42',
  },
];
const CallTypes = {
  MISSED: 'missed',
  COMPLETED: 'completed',
  SUCCESSFUL_CALLBACK: 'successful_callback',
  UNSUCCESSFUL_CALLBACK: 'unsuccessful_callback',
  ABANDONED_RINGING: 'abandoned_ringing',
};
