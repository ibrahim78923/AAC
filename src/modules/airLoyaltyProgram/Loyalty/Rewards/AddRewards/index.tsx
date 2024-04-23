import { Box, Card, Grid, Typography } from '@mui/material';
import { addRewardsData } from './AddRewards.data';
import { AddRewardsForm } from './AddRewardsForm';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { useAddRewards } from './useAddReward';

export const AddRewards = () => {
  const { router, palette, openDrawer, setOpenDrawer, addRewardOpenForm } =
    useAddRewards();

  return (
    <>
      <PageTitledHeader
        title={'What Kind of reward would you like to create?'}
        canMovedBack
        moveBack={() => {
          router?.push(AIR_LOYALTY_PROGRAM?.REWARDS);
        }}
      />
      <Box mt={3}>
        <Grid container spacing={2}>
          {addRewardsData?.map((item) => (
            <Grid
              item
              key={item?.id}
              xs={12}
              md={6}
              lg={4}
              onClick={() => {
                addRewardOpenForm(item);
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
        {openDrawer?.isOpen && (
          <AddRewardsForm
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
          />
        )}
      </Box>
    </>
  );
};
