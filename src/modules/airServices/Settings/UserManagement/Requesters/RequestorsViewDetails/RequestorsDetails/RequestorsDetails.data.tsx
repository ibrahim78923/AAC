export const profileInformation = (profileData: any) => [
  {
    id: profileData?._id,
    title: profileData?.firstName,
    description: profileData?.createdAt,
  },
  {
    id: profileData?._id,
    title: 'Email',
    detail: profileData?.email,
  },
  {
    id: profileData?._id,
    title: 'Phone Number',
    detail: profileData?.phoneNumber,
  },
];

export const profileRole = (profileData: any) => [
  {
    id: profileData?._id,
    title: 'Department',
    detail: 'IT',
  },
  {
    id: profileData?._id,
    title: 'Role',
    detail: profileData?.role,
  },
  {
    id: profileData?._id,
    title: 'Title',
    detail: 'Mr.',
  },
  {
    id: profileData?._id,
    title: 'Mobile Phone',
    detail: profileData?.phoneNumber,
  },
];
