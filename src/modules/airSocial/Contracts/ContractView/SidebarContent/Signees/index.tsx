import React from 'react';
import { Box } from '@mui/material';
import { styles } from './Signees.style';
import UserProfileIcon from '@/assets/icons/modules/SocialComponents/Contacts/user-profile-icon';

interface SigneesProps {
  data: any;
}

export default function Signees({ data }: SigneesProps) {
  return (
    <Box sx={styles?.signeePanel}>
      <Box sx={styles?.signeesList}>
        {data?.map((signee: any, index: number) => (
          <Box
            sx={styles?.signeeDetails}
            key={signee?._id || `signee-${index}`}
          >
            <UserProfileIcon />
            <Box sx={styles?.signeeInfo}>
              <Box sx={styles?.signeeName}>{signee?.name}</Box>
              <Box sx={styles?.signeeMeta}>{signee?.email}</Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
