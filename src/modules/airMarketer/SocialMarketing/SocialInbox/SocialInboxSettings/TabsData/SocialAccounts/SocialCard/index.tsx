import React from 'react';
import Image from 'next/image';
import { Box, Button, Grid, Typography } from '@mui/material';
import AppAvatarGroup from '@/components/AvatarGroup';
import { avatarGroupMockData } from '@/modules/superAdmin/PlanManagement/PlanManagement.data';
import { accountData } from './SocialCard.data';
import { styles } from './SocialCard.style';
import { v4 as uuidv4 } from 'uuid';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';

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
          <Grid item xs={12} lg={6} key={uuidv4()}>
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
                  padding: '20px',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <PermissionsGuard
                  permissions={[
                    AIR_MARKETER_SETTINGS_PERMISSIONS?.CONNECT_SOCIAL,
                  ]}
                >
                  <Button variant="contained">Connect Now</Button>
                </PermissionsGuard>
                <PermissionsGuard
                  permissions={[
                    AIR_MARKETER_SETTINGS_PERMISSIONS?.VIEW_ACCOUNT,
                  ]}
                >
                  <Button variant="outlined" onClick={handleShowCard}>
                    View Accounts
                  </Button>
                </PermissionsGuard>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SocialCard;
