export const meetingPeople = (organizer: any, peopleData: any) => [
  {
    _id: 1,
    firstName: organizer?.firstName,
    lastName: organizer?.lastName,
    avatar: organizer?.avatar?.url,
    status: 'Organizer',
  },
  ...peopleData?.map((item: any) => ({
    avatar: item?.profilePicture?.url,
    status: item?.recordStatus,
    ...item,
  })),
];
export const suggestedData = [
  {
    id: 1,
    available: 'Everyone',
    from: '08:00AM',
    to: '08:30AM',
    date: new Date(),
  },
  {
    id: 2,
    available: 'Everyone',
    from: '09:00AM',
    to: '09:30AM',
    date: new Date(),
  },
  {
    id: 3,
    available: 'Everyone',
    from: '10:30AM',
    to: '11:00AM',
    date: new Date(),
  },
  {
    id: 4,
    available: 'Everyone',
    from: '01:00PM',
    to: '01:30PM',
    date: new Date(),
  },
];
export const peopleTypes = {
  group: 'group',
};
