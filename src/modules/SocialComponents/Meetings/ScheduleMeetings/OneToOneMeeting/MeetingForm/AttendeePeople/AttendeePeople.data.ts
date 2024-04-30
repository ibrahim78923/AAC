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
    from: '08:00',
    to: '08:30',
    date: new Date(),
  },
  {
    id: 2,
    available: 'Everyone',
    from: '09:00',
    to: '09:30',
    date: new Date(),
  },
  {
    id: 3,
    available: 'Everyone',
    from: '10:30',
    to: '11:00',
    date: new Date(),
  },
  {
    id: 4,
    available: 'Everyone',
    from: '13:00',
    to: '13:30',
    date: new Date(),
  },
];
