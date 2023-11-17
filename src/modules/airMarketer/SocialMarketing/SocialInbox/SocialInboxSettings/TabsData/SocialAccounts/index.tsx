import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { accountData } from './SocialAccounts.data';
import Image from 'next/image';
import AppAvatarGroup from '@/components/AvatarGroup';
import { avatarGroupMockData } from '@/modules/superAdmin/PlanManagement/PlanManagement.data';
import { v4 as uuidv4 } from 'uuid';

const SocialAccounts = () => {
  return (
    <Box>
      <Typography variant="h4">Social Accounts</Typography>

      <Grid
        container
        spacing={2}
        sx={{ maxWidth: '900px', paddingTop: '20px' }}
      >
        {accountData?.map((item) => (
          <Grid item xs={6} key={uuidv4()}>
            <Box
              sx={{
                borderRadius: '12px',
                border: '1px solid var(--stroke-color-200, #E5E7EB)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '238px',
                padding: '20px 0px',
                gap: '5px',
              }}
            >
              <Box>
                <Image src={item?.logo} alt="logo" />
                <Typography variant="body2" sx={{ paddingTop: '8px' }}>
                  {item.name}
                </Typography>
              </Box>
              <AppAvatarGroup data={avatarGroupMockData} />
              <Box style={{ gap: 10, display: 'flex', padding: '20px 0px' }}>
                <Box>
                  <Button variant="contained">Connect Now</Button>
                </Box>
                <Box>
                  <Button variant="outlined">View Accounts</Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SocialAccounts;
