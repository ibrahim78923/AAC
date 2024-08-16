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
export const peopleTypes = {
  group: 'group',
};
