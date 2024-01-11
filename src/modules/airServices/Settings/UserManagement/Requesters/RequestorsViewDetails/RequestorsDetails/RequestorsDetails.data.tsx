export const profileInformation = (profileData: any) => [
  {
    id: profileData?._id,
    title: `${profileData?.firstName} ${profileData?.lastName}`,
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
export const profileRole = (profileData: any) => {
  if (profileData) {
    return [
      {
        id: profileData?._id,
        title: 'Title',
        detail: 'Mr.',
      },
    ];
  } else {
    return [];
  }
};
