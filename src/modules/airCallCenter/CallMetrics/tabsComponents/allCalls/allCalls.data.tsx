import {
  CallAbandonedRingingIcon,
  CallCompletedIcon,
  CallMissedIcon,
  CallSuccessfulCallbackIcon,
  CallUnSuccessfulCallbackIcon,
} from '@/assets/icons';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export const columns = () => {
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

          <Box sx={{ ml: 2 }}>
            {(() => {
              switch (info?.row?.original?.customerDetails?.callType) {
                case CallTypes?.MISSED:
                  return <CallMissedIcon />;
                case CallTypes?.COMPLETED:
                  return <CallCompletedIcon />;
                case CallTypes?.ABANDONED_RINGING:
                  return <CallAbandonedRingingIcon />;
                case CallTypes?.SUCCESSFUL_CALLBACK:
                  return <CallSuccessfulCallbackIcon />;
                case CallTypes?.UNSUCCESSFUL_CALLBACK:
                  return <CallUnSuccessfulCallbackIcon />;
                default:
                  return null;
              }
            })()}
          </Box>
        </Box>
      ),
      header: 'Customer Name',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.title,
      id: 'assignedTo',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image
            src={info?.row?.original?.assignedDetails?.profileAvatar}
            width={40}
            height={40}
            alt="user-image"
          />
          <Box sx={{ width: '110px' }}>
            <Typography variant="body3">
              {info?.row?.original?.assignedDetails?.name}
            </Typography>
            {info?.row?.original?.assignedDetails?.category && (
              <Typography sx={{ fontSize: '10px', fontWeight: '500' }}>
                {info?.row?.original?.assignedDetails?.category}
              </Typography>
            )}
          </Box>

          <Box sx={{ ml: 2 }}></Box>
        </Box>
      ),
      header: 'Assigned To',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.title,
      id: 'recording',
      cell: () => <>-</>,
      header: 'Recording',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.virtualNumber,
      id: 'virtualNumber',
      cell: (info: any) => info?.getValue(),
      header: ' Virtual Number',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.callTags,
      id: 'callTags',
      cell: (info: any) => info?.getValue(),
      header: 'Call Tags',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.callDuration,
      id: 'callDuration',
      cell: (info: any) => info?.getValue(),
      header: 'Call Duration',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.dateAndTime,
      id: 'dateAndTime',
      cell: (info: any) => info?.getValue(),
      header: 'Date and Time',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.title,
      id: 'id',
      cell: () => <>actions ++</>,
      header: 'Actions',
      isSortable: false,
    },
  ];
};

const CallTypes = {
  MISSED: 'missed',
  COMPLETED: 'completed',
  SUCCESSFUL_CALLBACK: 'successful_callback',
  UNSUCCESSFUL_CALLBACK: 'unsuccessful_callback',
  ABANDONED_RINGING: 'abandoned_ringing',
};
