import { ViewDetailBackArrowIcon } from '@/assets/icons';
import Actions from './Actions';
import { SingleInventoryDetailsTabs } from './components/SingleInventoryDetailTabs';
import { Box, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export const SingleInventoryDetail = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/air-services/assets/inventory');
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={'space-between'}
        mb={'0.625rem'}
      >
        <Grid
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{ cursor: 'pointer', mt: '0.3125rem' }}
            onClick={handleClick}
          >
            <ViewDetailBackArrowIcon />
          </Box>
          <Typography variant="h5" component="span" sx={{ ml: '0.3125rem' }}>
            Logitech Mouse
          </Typography>
        </Grid>
        <Grid item>
          <Actions />
        </Grid>
      </Grid>
      <SingleInventoryDetailsTabs />
    </>
  );
};
