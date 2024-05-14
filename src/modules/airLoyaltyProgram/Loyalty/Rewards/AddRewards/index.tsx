import { Box, Grid, Typography } from '@mui/material';
import { addRewardsData } from './AddRewards.data';
import { AddRewardsForm } from './AddRewardsForm';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { useAddRewards } from './useAddReward';
import { AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

export const AddRewards = () => {
  const {
    router,
    palette,
    openDrawer,
    setOpenDrawer,
    addRewardOpenForm,
    airSalesAccount,
  } = useAddRewards();

  return (
    <>
      <PageTitledHeader
        title={'Add Reward'}
        canMovedBack
        moveBack={() => {
          router?.push(AIR_LOYALTY_PROGRAM?.REWARDS);
        }}
      />
      <Typography variant="body2" color="slateBlue.main">
        What Kind of reward would you like to create?
      </Typography>
      <Box mt={3}>
        <Grid container spacing={2}>
          {addRewardsData?.map((item: any) => (
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
              <Box
                sx={{
                  gap: 2,
                  p: 1,
                  border: `1px solid`,
                  borderColor: 'grey.700',
                  height: '100%',
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: `${item?.color}`,
                  },
                }}
              >
                <Box
                  gap={1}
                  bgcolor={item?.color}
                  borderRadius={2}
                  py={5}
                  mb={1}
                  textAlign={'center'}
                >
                  <item.icon sx={{ color: 'common.white' }} />
                  <Typography color={palette?.common?.white} variant="h3">
                    {item?.heading}
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  fontWeight={400}
                  color="slateBlue.main"
                >
                  A {item?.heading?.toLowerCase()}
                </Typography>

                <Typography variant="body2" color="slateBlue.main">
                  {item?.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <PermissionsGuard
          permissions={[
            AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS?.ADD_REWARDS,
          ]}
        >
          {openDrawer?.isOpen && (
            <AddRewardsForm
              openDrawer={openDrawer}
              setOpenDrawer={setOpenDrawer}
              airSalesAccount={airSalesAccount}
            />
          )}
        </PermissionsGuard>
      </Box>
    </>
  );
};
