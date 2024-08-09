import { DeleteCrossIcon, EditPenIcon } from '@/assets/icons';
import { DATE_TIME_FORMAT, SOCIAL_COMPONENTS } from '@/constants';
import { MEETINGS_DETAILS_TYPE } from '@/constants/strings';
import { TimeFormatDuration } from '@/utils/api';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
export const meetingCardsDetails = (theme: any, getMeetingListStatus: any) => {
  const cardData = getMeetingListStatus?.data?.data;
  return [
    {
      id: 1,
      meetingHeading: MEETINGS_DETAILS_TYPE?.ALL_MEETINGS,
      meetingType: MEETINGS_DETAILS_TYPE?.ALL,
      meetingCount: cardData?.allMeetings ?? 0,
      color: theme?.palette?.info?.main,
    },
    {
      id: 2,
      meetingHeading: MEETINGS_DETAILS_TYPE?.UPCOMING_MEETINGS,
      meetingType: MEETINGS_DETAILS_TYPE?.UPCOMING,
      meetingCount: cardData?.upCommings ?? 0,
      color: theme?.palette?.error?.main,
    },
    {
      id: 3,
      meetingHeading: MEETINGS_DETAILS_TYPE?.COMPLETED_MEETINGS,
      meetingType: MEETINGS_DETAILS_TYPE?.COMPLETED,
      meetingCount: cardData?.completed ?? 0,
      color: theme?.palette?.success?.dark,
    },
  ];
};

export const listViewDetails = (
  setDeleteModal: any,
  setOpenForm: any,
  router: any,
  meetingActiveType: any,
) => [
  {
    accessorFn: (row: any) => row?.title,
    id: 'title',
    isSortable: false,
    header: 'Meeting Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.organizer,
    id: 'organizer',
    isSortable: false,
    header: 'Organizer',
    cell: (info: any) => {
      const { firstName, lastName } = info?.row?.original?.userDetails || {};
      return <Typography>{`${firstName} ${lastName}`}</Typography>;
    },
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
    cell: (info: any) => {
      const startTime = info?.row?.original?.startTime;
      const endTime = info?.row?.original?.endTime;
      return TimeFormatDuration(startTime, endTime);
    },
  },
  {
    accessorFn: (row: any) => row?.meetingBooked,
    id: 'meetingBooked',
    isSortable: false,
    header: 'Meeting Booked',
    cell: (info: any) => dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.UI),
  },
  {
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Action',
    cell: (info: any) => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            setOpenForm(() => {
              router?.push({
                pathname: SOCIAL_COMPONENTS?.UPSERT_MEETING,
                query: {
                  type: meetingActiveType(info?.row?.original?.category),
                  id: info?.row?.original?._id,
                },
              });
            })
          }
        >
          <EditPenIcon />
        </Box>
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            setDeleteModal({ isOpen: true, data: info?.row?.original })
          }
        >
          <DeleteCrossIcon />
        </Box>
      </Box>
    ),
  },
];
