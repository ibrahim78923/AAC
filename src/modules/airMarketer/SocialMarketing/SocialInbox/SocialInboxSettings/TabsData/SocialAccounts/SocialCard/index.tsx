import React from 'react';

import Image from 'next/image';

import { Box, Button, Grid, Typography } from '@mui/material';

import AppAvatarGroup from '@/components/AvatarGroup';

import { avatarGroupMockData } from '@/modules/superAdmin/PlanManagement/PlanManagement.data';
import { accountData } from './SocialCard.data';

import { styles } from './SocialCard.style';

import { v4 as uuidv4 } from 'uuid';

const SocialCard = ({ handleShowCard }: { handleShowCard: () => void }) => {
  return (
    <>
      <Typography variant="h3">Social Accounts</Typography>
      <Grid
        container
        spacing={2}
        sx={{ maxWidth: '900px', paddingTop: '20px' }}
      >
        {accountData?.map((item) => (
          <Grid item xs={6} key={uuidv4()}>
            <Box sx={styles?.socialCards}>
              <Box>
                <Image src={item?.logo} alt="logo" />
                <Typography variant="body2" sx={{ paddingTop: '8px' }}>
                  {item?.name}
                </Typography>
              </Box>
              <AppAvatarGroup data={avatarGroupMockData} />
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  padding: '20px 0px',
                }}
              >
                <Box>
                  <Button variant="contained">Connect Now</Button>
                </Box>
                <Box>
                  <Button variant="outlined" onClick={handleShowCard}>
                    View Accounts
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SocialCard;
