export const meetingCardsDetails = (theme: any) => [
  {
    id: 1,
    meetingHeading: 'All',
    meetingCount: 0,
    color: theme?.palette?.info?.main,
  },
  {
    id: 2,
    meetingHeading: 'Upcoming',
    meetingCount: 0,
    color: theme?.palette?.error?.main,
  },
  {
    id: 3,
    meetingHeading: 'Completed',
    meetingCount: 0,
    color: theme?.palette?.success?.main,
  },
];
