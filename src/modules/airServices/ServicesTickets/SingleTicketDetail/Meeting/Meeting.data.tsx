import { DeleteCrossIcon, EditPenIcon } from '@/assets/icons';
import { TruncateText } from '@/components/TruncateText';
import { DATE_TIME_FORMAT } from '@/constants';
import { SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS } from '@/constants/permission-keys';
import { SOCIAL_COMPONENTS } from '@/constants/routes';
import { MEETINGS_DETAILS_TYPE } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { TimeFormatDuration } from '@/lib/date-time';
import { splitCapitalizedWords } from '@/utils/api';
import { fullName } from '@/utils/avatarUtils';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
export const meetingCardsDetails = (theme: any, filterMeetingData: any) => [
  {
    id: 1,
    meetingHeading: MEETINGS_DETAILS_TYPE?.ALL_MEETINGS,
    meetingType: MEETINGS_DETAILS_TYPE?.ALL,
    meetingCount: filterMeetingData?.allMeetings ?? 0,
    color: theme?.palette?.info?.main,
  },
  {
    id: 2,
    meetingHeading: MEETINGS_DETAILS_TYPE?.UPCOMING_MEETINGS,
    meetingType: MEETINGS_DETAILS_TYPE?.UPCOMING,
    meetingCount: filterMeetingData?.upCommings ?? 0,
    color: theme?.palette?.error?.main,
  },
  {
    id: 3,
    meetingHeading: MEETINGS_DETAILS_TYPE?.COMPLETED_MEETINGS,
    meetingType: MEETINGS_DETAILS_TYPE?.COMPLETED,
    meetingCount: filterMeetingData?.completed ?? 0,
    color: theme?.palette?.success?.dark,
  },
];

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
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.organizer,
    id: 'organizer',
    isSortable: false,
    header: 'Organizer',
    cell: (info: any) => {
      const { firstName, lastName } = info?.row?.original?.userDetails || {};
      return (
        <Typography
          variant="body2"
          textTransform={'capitalize'}
          component={'span'}
        >
          <TruncateText text={fullName(firstName, lastName)} />
        </Typography>
      );
    },
  },
  {
    accessorFn: (row: any) => row?.type,
    id: 'type',
    isSortable: false,
    header: 'Type',
    cell: (info: any) => splitCapitalizedWords(info?.getValue()),
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
        <PermissionsGuard
          permissions={[SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.EDIT_MEETING]}
        >
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              setOpenForm(() => {
                router?.push({
                  pathname: SOCIAL_COMPONENTS?.UPSERT_MEETING,
                  query: {
                    type: meetingActiveType(info?.row?.original?.category),
                    id: info?.row?.original?._id,
                    moduleType: 'TICKET',
                    ticketId: info?.row?.original?.moduleId,
                  },
                });
              })
            }
          >
            <EditPenIcon />
          </Box>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.DELETE_MEETING]}
        >
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              setDeleteModal({ isOpen: true, data: info?.row?.original })
            }
          >
            <DeleteCrossIcon />
          </Box>
        </PermissionsGuard>
      </Box>
    ),
  },
];
