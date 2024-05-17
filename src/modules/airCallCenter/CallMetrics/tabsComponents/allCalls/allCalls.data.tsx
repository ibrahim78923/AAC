import {
  CallAbandonedRingingIcon,
  CallCompletedIcon,
  CallMissedIcon,
  CallSquareIcon,
  CallSuccessfulCallbackIcon,
  CallUnSuccessfulCallbackIcon,
  DeleteCrossIcon,
  EyeIcon,
  NotesIcon,
  RecordingIcon,
} from '@/assets/icons';
import { UserDefault, UserProfileVectorImage } from '@/assets/images';
import { Box, Tooltip, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import AudioVisualizer from './audioVisualizer/audioVisualizer';

export const columns = ({ setIsCallDetailsDrawerOpen }: any) => {
  const theme = useTheme();
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
      isSortable: true,
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
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.title,
      id: 'recording',
      cell: (info: any) => (
        <Box>
          {info?.row?.original?.recording !== '-' ? (
            <AudioVisualizer audioSrc={info?.row?.original?.recording} />
          ) : (
            '-'
          )}
        </Box>
      ),
      header: 'Recording',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.virtualNumber,
      id: 'virtualNumber',
      cell: (info: any) => info?.getValue(),
      header: ' Virtual Number',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.callTags,
      id: 'callTags',
      cell: (info: any) => info?.getValue(),
      header: 'Call Tags',
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
      accessorFn: (row: any) => row?.dateAndTime,
      id: 'dateAndTime',
      cell: (info: any) => info?.getValue(),
      header: 'Date and Time',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.title,
      id: 'id',
      cell: () => (
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Tooltip title="View" placement="top-start">
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => setIsCallDetailsDrawerOpen(true)}
            >
              <EyeIcon color={theme?.palette?.blue?.main} size="16px" />
            </Box>
          </Tooltip>
          <Tooltip title="Call Notes" placement="top-start">
            <Box sx={{ cursor: 'pointer' }}>
              <NotesIcon />
            </Box>
          </Tooltip>
          <Tooltip title="Voicemail" placement="top-start">
            <Box sx={{ cursor: 'pointer' }}>
              <RecordingIcon />
            </Box>
          </Tooltip>
          <Tooltip title="Call Transcription " placement="top">
            <Box sx={{ cursor: 'pointer' }}>
              <CallSquareIcon />
            </Box>
          </Tooltip>
          <Tooltip title="Delete" placement="top-start">
            <Box sx={{ cursor: 'pointer' }}>
              <DeleteCrossIcon />
            </Box>
          </Tooltip>
        </Box>
      ),
      header: 'Actions',
      isSortable: true,
    },
  ];
};

export const allCallsData = [
  {
    id: '01',
    customerDetails: {
      profileAvatar: UserProfileVectorImage,
      name: 'Eleanor Pena',
      callType: 'missed',
    },
    assignedDetails: {
      profileAvatar: UserDefault,
      name: 'Global Queue',
    },
    recording: 'https://webaudioapi.com/samples/audio-tag/chrono.mp3',
    virtualNumber: '+12314 1414 1312 4',
    callTags: '-',
    callDuration: '00:42',
    dateAndTime: '11 Dec, 2023,  7:48 PM',
  },
  {
    id: '02',
    customerDetails: {
      profileAvatar: UserProfileVectorImage,
      name: 'Courtney ',
      callType: 'completed',
    },
    assignedDetails: {
      profileAvatar: UserDefault,
      name: 'Global Queue',
    },
    recording: '-',
    virtualNumber: '+12314 1414 1312 4',
    callTags: '-',
    callDuration: '00:42',
    dateAndTime: '11 Dec, 2023,  7:48 PM',
  },
  {
    id: '03',
    customerDetails: {
      profileAvatar: UserProfileVectorImage,
      name: 'Jerome Bell',
      callType: 'successful_callback',
    },
    assignedDetails: {
      profileAvatar: UserDefault,
      name: 'Global Queue',
      category: 'Medical Helpline',
    },
    recording: 'https://webaudioapi.com/samples/audio-tag/chrono.mp3',
    virtualNumber: '+12314 1414 1312 4',
    callTags: '-',
    callDuration: '00:42',
    dateAndTime: '11 Dec, 2023,  7:48 PM',
  },
  {
    id: '04',
    customerDetails: {
      profileAvatar: UserProfileVectorImage,
      name: 'Annette Black',
      callType: 'unsuccessful_callback',
    },
    assignedDetails: {
      profileAvatar: UserDefault,
      name: 'Global Queue',
      category: 'Medical Helpline',
    },
    recording: '-',
    virtualNumber: '+12314 1414 1312 4',
    callTags: '-',
    callDuration: '00:42',
    dateAndTime: '11 Dec, 2023,  7:48 PM',
  },
  {
    id: '05',
    customerDetails: {
      profileAvatar: UserProfileVectorImage,
      name: 'Eleanor Pena',
      callType: 'abandoned_ringing',
    },
    assignedDetails: {
      profileAvatar: UserDefault,
      name: 'Global Queue',
      category: 'Medical Helpline',
    },
    recording: '-',
    virtualNumber: '+12314 1414 1312 4',
    callTags: '-',
    callDuration: '00:42',
    dateAndTime: '11 Dec, 2023,  7:48 PM',
  },
];

const CallTypes = {
  MISSED: 'missed',
  COMPLETED: 'completed',
  SUCCESSFUL_CALLBACK: 'successful_callback',
  UNSUCCESSFUL_CALLBACK: 'unsuccessful_callback',
  ABANDONED_RINGING: 'abandoned_ringing',
};
