import React from 'react';

import { AvatarGroup, Avatar } from '@mui/material';

import { IAVATARGROUPDATA } from '@/types/shared/AvatarGroup';

// ======================================================================================================

const AppAvatarGroup = ({ data }: { data: IAVATARGROUPDATA[] }) => {
  return (
    <AvatarGroup
      max={4}
      sx={{
        color: '#4C597D',
        '&  .MuiAvatar-root': {
          color: '#4C597D',
          background: '#EBFAF8',
        },
        '& .MuiAvatar-root:not(:last-child)': {
          marginLeft: '-20px',
        },
        '& .MuiAvatar-root:first-child': {
          border: '1px solid #FFFFFF',
          marginLeft: '-10px',
        },
      }}
    >
      {Boolean(data?.length) &&
        data?.map((singleItem: IAVATARGROUPDATA) => (
          <Avatar
            key={singleItem?.id}
            alt={singleItem?.name}
            src={singleItem?.img}
            sx={{
              background: '#EBFAF8',
              color: '#4C597D',
              borderRadius: '15px',
              border: '1px solid #FFFFFF',
            }}
          />
        ))}
    </AvatarGroup>
  );
};

export default AppAvatarGroup;
