import { Box, Card, Grid, Typography, useTheme } from '@mui/material';
import { addRewardsData } from './AddRewards.data';
import { useState } from 'react';
import AddRewardsdrawer from './AddRewardsDrawer';

export const AddRewards = () => {
  const { palette } = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [actionType, setActionType] = useState('');

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  return (
    <Box>
      <Typography variant="body1" color={'secondary'}>
        What Kind of reward would you like to create?
      </Typography>
      <Box mt={3}>
        <Grid container spacing={2}>
          {addRewardsData(palette)?.map((item) => (
            <Grid
              item
              key={item?.id}
              xs={12}
              md={6}
              lg={4}
              onClick={() => {
                handleOpenDrawer();
                setActionType(item?.name);
              }}
              sx={{ cursor: 'pointer' }}
            >
              <Card
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  p: 1,
                  border: `1px solid ${palette?.grey?.[700]}`,
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Box
                  display={'flex'}
                  flexWrap={'wrap'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  gap={1}
                  p={6}
                  bgcolor={item?.color}
                  borderRadius={2}
                >
                  <item.icon />
                  <Typography color={palette?.common?.white} variant="h3">
                    {item?.heading}
                  </Typography>
                </Box>
                <Box display={'block'} mt={1}>
                  <Typography variant="h5" fontWeight={400}>
                    {item?.heading}
                  </Typography>
                  <Typography variant="body2">{item?.text}</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <AddRewardsdrawer
          isDrawerOpen={openDrawer}
          actionType={actionType}
          onClose={handleOpenDrawer}
        />
      </Box>
    </Box>
  );
};
