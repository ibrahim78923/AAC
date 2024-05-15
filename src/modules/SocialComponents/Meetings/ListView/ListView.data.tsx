import { DeleteCrossIcon, EditPenIcon } from '@/assets/icons';
import { MEETINGS_DETAILS_TYPE } from '@/constants/strings';
import { Box } from '@mui/material';
export const meetingCardsDetails = (theme: any) => [
  {
    id: 1,
    meetingHeading: MEETINGS_DETAILS_TYPE?.ALL,
    meetingCount: '5',
    color: theme?.palette?.info?.main,
  },
  {
    id: 2,
    meetingHeading: MEETINGS_DETAILS_TYPE?.UPCOMING,
    meetingCount: '2',
    color: theme?.palette?.error?.main,
  },
  {
    id: 3,
    meetingHeading: MEETINGS_DETAILS_TYPE?.COMPLETED,
    meetingCount: '3',
    color: theme?.palette?.success?.dark,
  },
];

export const listViewDetailsData = [
  {
    id: 7654,
    meetingName: '60 min, 30min, and 15 min meeting',
    meetingEmail: '@adil-khan',
    organizer: 'Sharemydine',
    type: 'one-on-one',
    duration: 'Multiple',
    meetingBooked: 0,
    status: 'Upcoming',
  },
  {
    id: 6484,
    meetingName: '60 min, 30min, and 15 min meeting',
    meetingEmail: '@adil-khan',
    organizer: 'Sharemydine',
    type: 'one-on-one',
    duration: 'Multiple',
    meetingBooked: 0,
    status: 'Upcoming',
  },
  {
    id: 3468,
    meetingName: '60 min, 30min, and 15 min meeting',
    meetingEmail: '@adil-khan',
    organizer: 'Sharemydine',
    type: 'one-on-one',
    duration: 'Multiple',
    meetingBooked: 0,
    status: 'Completed',
  },
  {
    id: 3703,
    meetingName: '60 min, 30min, and 15 min meeting',
    meetingEmail: '@adil-khan',
    organizer: 'Sharemydine',
    type: 'one-on-one',
    duration: 'Multiple',
    meetingBooked: 0,
    status: 'Completed',
  },
  {
    id: 8843,
    meetingName: '60 min, 30min, and 15 min meeting',
    meetingEmail: '@adil-khan',
    organizer: 'Sharemydine',
    type: 'one-on-one',
    duration: 'Multiple',
    meetingBooked: 0,
    status: 'Completed',
  },
];

export const listViewDetails = (theme: any, setDeleteModal: any) => [
  {
    accessorFn: (row: any) => {
      return `${row?.meetingName}\n${row?.meetingEmail}`;
    },
    id: 'meetingName',
    isSortable: false,
    header: 'Meeting Name',
    cell: (info: any) => {
      const row = info?.row?.original;
      const meetingEmailColor = row?.meetingEmail
        ? theme?.palette?.primary?.main
        : theme?.palette?.blue?.dull_blue;
      const meetingNameColor = theme?.palette?.blue?.dull_blue;
      return (
        <Box>
          <span style={{ color: meetingNameColor }}>{row?.meetingName}</span>
          <br />
          <span style={{ color: meetingEmailColor }}>{row?.meetingEmail}</span>
        </Box>
      );
    },
  },
  {
    accessorFn: (row: any) => row?.organizer,
    id: 'organizer',
    isSortable: false,
    header: 'Organizer',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.type,
    id: 'type',
    isSortable: false,
    header: 'Type',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.duration,
    id: 'duration',
    isSortable: false,
    header: 'Duration',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.meetingBooked,
    id: 'meetingBooked',
    isSortable: false,
    header: 'Meeting Booked',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Action',
    cell: () => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box sx={{ cursor: 'pointer' }}>
          <EditPenIcon />
        </Box>
        <Box sx={{ cursor: 'pointer' }} onClick={() => setDeleteModal(true)}>
          <DeleteCrossIcon />
        </Box>
      </Box>
    ),
  },
];
