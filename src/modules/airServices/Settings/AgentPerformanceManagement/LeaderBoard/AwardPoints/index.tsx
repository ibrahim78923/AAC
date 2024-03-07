import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { agentResolveTicketData, receivingAwardData } from './AwardPoints.data';
import { useAwardPoints } from './useAwardPoints';
import AwardCard from './AwardCard';
import { LoadingButton } from '@mui/lab';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

const AwardPoints = () => {
  const {
    awardPointsMethod,
    awardCardBorderColors,
    handleSubmit,
    isLoading,
    isFetching,
    addAwardPointsStatus,
  } = useAwardPoints();

  if (isLoading || isFetching) return <SkeletonForm />;

  return (
    <PermissionsGuard
      permissions={[
        AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.VIEW_AND_SET_AWARD_POINTS,
      ]}
    >
      <br />
      <FormProvider
        methods={awardPointsMethod}
        onSubmit={awardPointsMethod?.handleSubmit?.(handleSubmit)}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: 'column',
          }}
        >
          <Box>
            <Typography fontWeight={600} pb={1.2}>
              Award points
            </Typography>
            <Typography
              variant="subtitle2"
              fontWeight={500}
              color="custom.main"
            >
              Set award points based on different factors for agents
            </Typography>
          </Box>
          <Grid container spacing={2.3}>
            {agentResolveTicketData?.map((item: any) => (
              <Grid
                item
                xs={12}
                display={'flex'}
                alignItems={'flex-end'}
                gap={1}
                lg={item?.md}
                key={item?.id}
              >
                <Box>
                  <item.component
                    {...item?.componentProps}
                    size={'small'}
                    sx={{ maxWidth: 204 }}
                  />
                </Box>
                {item?.component?.name === 'RHFTextField' && (
                  <Typography component="span" pb={1}>
                    Points
                  </Typography>
                )}
              </Grid>
            ))}
          </Grid>
          <Box>
            <Typography fontWeight={600} pb={1.2}>
              Criteria For Receiving Award
            </Typography>
            <Typography
              variant="subtitle2"
              fontWeight={500}
              color="custom.main"
            >
              The agent will receive 4 Awards based on different criteria.
            </Typography>
          </Box>
          <Grid item container xs={12} xl={9} gap={2}>
            {receivingAwardData?.map?.((card, index) => (
              <Grid key={card?.title} xs={12} lg={5} item>
                <AwardCard
                  {...card}
                  borderColor={awardCardBorderColors?.[index]}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <br />
        <Grid
          item
          container
          xs={12}
          xl={9}
          sx={{ justifyContent: { sm: 'flex-end' }, mt: 2 }}
        >
          <Box display={'flex'} gap={2} alignItems={'center'} flexWrap={'wrap'}>
            <LoadingButton
              type="button"
              variant="outlined"
              color="inherit"
              disabled={addAwardPointsStatus?.isLoading}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              disableElevation
              type="submit"
              variant="contained"
              loading={addAwardPointsStatus?.isLoading}
            >
              Save
            </LoadingButton>
          </Box>
        </Grid>
      </FormProvider>
    </PermissionsGuard>
  );
};

export default AwardPoints;
