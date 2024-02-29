import { Box, Grid, Typography } from '@mui/material';
import { AddRoleIcon } from '@/assets/icons';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';

const RolesCards = () => {
  const router: any = useRouter();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} xl={4}>
        <Box
          width={'100%'}
          border={1}
          borderColor={'grey.0'}
          borderRadius={2}
          p={3}
          height={'100%'}
          sx={{ cursor: 'pointer' }}
          onClick={() => router?.push(AIR_SERVICES?.USER_UPSERT_ROLES_SETTINGS)}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            height={'100%'}
          >
            <Typography variant="h5">Add New</Typography>

            <Box height={'100%'} display={'flex'} alignItems={'end'}>
              <AddRoleIcon />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RolesCards;
