import CommonDrawer from '@/components/CommonDrawer';
import { useSingleTierDetail } from './useSingleTierDetail';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import { EditInputIcon } from '@/assets/icons';

export const SingleTierDetail = (props: any) => {
  const { isDrawerOpen } = props;
  const { closeUpsertTier } = useSingleTierDetail(props);
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen?.isOpen}
      onClose={() => closeUpsertTier?.()}
      cancelText={'Cancel'}
      title={isDrawerOpen?.isDetail?.name}
      footer
      headerIcon={
        <IconButton>
          <EditInputIcon />
        </IconButton>
      }
    >
      <Box>
        <Box>
          <Typography variant="h6" color="common.black">
            Base tier
          </Typography>
          <Typography
            variant="body3"
            color="grey.900"
            display="flex"
            gap={1.5}
            alignItems="center"
          >
            ({isDrawerOpen?.isDetail?.amount} dollar equivalent to
            <Slider sx={{ width: 100 }} value={[0, 100]} disabled />
            {isDrawerOpen?.isDetail?.points} pts)
          </Typography>
        </Box>
        <br />
        <Box>
          <Typography variant="h5" color="common.black">
            Points calculation
          </Typography>
          <br />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Percentage off:</Typography>
            <Typography variant="body1" color="grey.900">
              10% off on entire purchase
            </Typography>
          </Box>
          <br />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Account creation: </Typography>
            <Typography variant="body1" color="grey.900">
              0.2 pts
            </Typography>
          </Box>
          <br />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">First purchase: </Typography>
            <Typography variant="body1" color="grey.900">
              0.5 pts
            </Typography>
          </Box>
        </Box>
      </Box>
    </CommonDrawer>
  );
};
