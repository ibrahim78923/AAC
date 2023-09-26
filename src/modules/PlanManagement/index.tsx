import React from 'react';

import { Button, Typography, Box } from '@mui/material';

// ============== Components ==============
import AppAvatarGroup from './AvatarGroup/AvatarGroup';

// ====================================
import { IAVATARGROUPDATA } from '@/types/shared/AvatarGroup';
import Link from 'next/link';

// ====================================

const avatarGroupMockData: IAVATARGROUPDATA[] = [
  {
    id: '01',
    name: 'Ahsan',
    img: '/avatar1.jpg',
  },
  {
    id: '02',
    name: 'Shehroz',
    img: '/avatar2.jpg',
  },
  {
    id: '03',
    name: 'Waseeem',
    img: '/avatar3.jpg',
  },
  {
    id: '04',
    name: 'Waseeem',
    img: '/avatar3.jpg',
  },
  {
    id: '05',
    name: 'Waseeem',
    img: '/avatar3.jpg',
  },
  {
    id: '06',
    name: 'Waseeem',
    img: '/avatar3.jpg',
  },
];

// =======================================================================================================================

const PlanManagementModule = () => {
  return (
    <div>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography variant="h4" sx={styles.planManagementHeading}>
          Plan Management
        </Typography>

        <Link href={'/super-admin-plan-management/add-plan'}>
          <Button variant="contained">Add Plan</Button>
        </Link>
      </Box>

      <br />
      <br />
      <AppAvatarGroup data={avatarGroupMockData} />

      <Typography variant="h5">Table Here</Typography>
    </div>
  );
};

export default PlanManagementModule;

const styles = {
  planManagementHeading: {
    fontWeight: 600,
    lineHeight: '30px',
    letterSpacing: '-2%',
  },
};
