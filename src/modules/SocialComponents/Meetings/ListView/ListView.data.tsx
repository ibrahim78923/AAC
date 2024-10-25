import { DeleteCrossIcon, EditPenIcon } from '@/assets/icons';
import { TruncateText } from '@/components/TruncateText';
import { SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS } from '@/constants/permission-keys';
import { SOCIAL_COMPONENTS } from '@/constants/routes';
import { MEETINGS_DETAILS_TYPE } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { TimeFormatDuration, uiDateFormat } from '@/lib/date-time';
import { splitCapitalizedWords } from '@/utils/api';
import { fullName } from '@/utils/avatarUtils';
import { Box, Theme, Typography } from '@mui/material';
import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

export const meetingCardsDetails = (
  theme: Theme,
  getMeetingListStatus: any,
) => {
  const cardData = getMeetingListStatus;
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
  setDeleteModal: Dispatch<SetStateAction<Record<string, any>>>,
  setOpenForm: Dispatch<SetStateAction<Record<string, any>>>,
  router: NextRouter,
  meetingActiveType: (activeMeeting: string) => string | undefined,
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
          variant="body3"
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
      const duration = TimeFormatDuration(startTime, endTime);
      if (duration === 'NaNh NaNm' || duration === 'n/a') {
        return '---';
      }
      return duration;
    },
  },
  {
    accessorFn: (row: any) => row?.meetingBooked,
    id: 'meetingBooked',
    isSortable: false,
    header: 'Meeting Booked',
    cell: (info: any) => uiDateFormat(info?.row?.original?.createdAt),
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
