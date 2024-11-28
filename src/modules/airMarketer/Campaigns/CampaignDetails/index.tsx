import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { campaignDetailsData } from './CampaignDetails.data';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { useGetCampaignsByIdQuery } from '@/services/airMarketer/campaigns';
import { indexNumbers } from '@/constants';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';

const CampaignDetails = ({ open, onClose, selectedRows }: any) => {
  const router = useRouter();
  const theme: any = useTheme();
  const { data: compaignsDataById, isLoading: campaignsLoadingById } =
    useGetCampaignsByIdQuery(selectedRows, {
      skip:
        !Array?.isArray(selectedRows) ||
        selectedRows?.length === indexNumbers?.ZERO,
    });

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={() => onClose(false)}
      title={'Campaign Details'}
      okText={'See performance'}
      submitHandler={() => router?.push(AIR_MARKETER?.VIEW_PERFORMANCE)}
      isOk
      footer
    >
      {campaignsLoadingById ? (
        <SkeletonTable />
      ) : (
        <Box mt={1}>
          <Grid container>
            {campaignDetailsData(compaignsDataById)?.map((campaign) => {
              return (
                <Grid
                  key={uuidv4()}
                  container
                  style={{
                    padding: '24px',
                    paddingBottom: campaign?.paddingBottom,
                    background: theme?.palette?.primary?.lighter,
                  }}
                >
                  <Grid item md={5}>
                    <Typography variant="body1">
                      {campaign?.deatilsName}
                    </Typography>
                  </Grid>
                  <Grid item md={2}>
                    -
                  </Grid>
                  <Grid item md={5}>
                    <Typography variant="body1">
                      {campaign?.detailsDes}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
    </CommonDrawer>
  );
};
export default CampaignDetails;
