import React, { useState } from 'react';

import Image from 'next/image';

import { Box, Button, Typography, useTheme } from '@mui/material';

import { groupMembers } from '@/mock/modules/SocialComponents/Chat';

import { v4 as uuidv4 } from 'uuid';

import { styles } from './Members.style';
import AddMembers from './AddMembers';

const Members = () => {
  const theme = useTheme();
  const [isAddMembers, setIsAddMembers] = useState(false);
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ mt: 1, mb: 2 }}>
          <Typography
            variant="h6"
            sx={{ color: theme?.palette?.custom?.grayish_blue }}
          >
            {groupMembers?.length} Members
          </Typography>
        </Box>
        {isAddMembers && (
          <Box sx={styles?.addMembersWrapper}>
            <AddMembers setIsAddMembers={setIsAddMembers} />
          </Box>
        )}
        <Box sx={{ height: '262px', overflow: 'scroll' }}>
          {groupMembers.slice(0, 5).map((item: any) => (
            <Box sx={styles.boxMemberCard} key={uuidv4()}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Image src={item.image} alt="user" />
                <Typography variant="body3" sx={{ fontWeight: '500' }}>
                  {item.name}
                </Typography>
              </Box>
              <Box>
                {item.role === 'admin' ? (
                  <Typography
                    variant="body3"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    Admin
                  </Typography>
                ) : (
                  <Typography
                    variant="body3"
                    sx={{ color: theme.palette.error.main }}
                  >
                    Remove
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button sx={{ width: '100%' }}>View Less</Button>
          <Button
            variant="contained"
            sx={{ width: '100%' }}
            onClick={() => setIsAddMembers(true)}
          >
            Add Participation
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Members;
