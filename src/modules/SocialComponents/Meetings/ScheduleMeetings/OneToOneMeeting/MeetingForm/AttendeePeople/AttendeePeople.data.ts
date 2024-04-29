export const meetingPeople = (organizer: any, attendee: any) => [
  {
    id: 1,
    firstName: organizer?.firstName,
    lastName: organizer?.lastName,
    avatar: organizer?.avatar?.url,
    status: 'Organizer',
  },
  {
    id: 2,
    firstName: attendee?.firstName,
    lastName: attendee?.lastName,
    avatar: attendee?.profilePicture?.url,
    status: 'Free',
  },
];
export const suggestedData = [
  {
    id: 1,
    available: 'Everyone',
    from: '08: 00 AM',
    to: '08: 30 AM',
    date: 'Thu 11/9',
  },
  {
    id: 2,
    available: 'Everyone',
    from: '09: 00 AM',
    to: '09: 30 AM',
    date: 'Thu 11/9',
  },
  {
    id: 3,
    available: 'Everyone',
    from: '10: 30 AM',
    to: '11: 00 AM',
    date: 'Thu 11/9',
  },
  {
    id: 4,
    available: 'Everyone',
    from: '01: 00 PM',
    to: '03: 30 PM',
    date: 'Thu 11/9',
  },
];
