import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { serviceManagement } from './ServiceManagement.data';
import { useGetClosureRulesQuery } from '@/services/airServices/settings/service-management/closureRole';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const ServiceManagement = () => {
  const theme = useTheme();
  const router = useRouter();
  const { isLoading, isFetching } = useGetClosureRulesQuery(null);
  if (isFetching || isLoading) return <SkeletonTable />;
  return (
    <>
      <Typography variant="h3">Service Management</Typography>
      <br />
      <Grid container spacing={3}>
        {serviceManagement?.map((item: any) => (
          <Grid
            key={item?.id}
            item
            md={6}
            lg={4}
            xs={12}
            onClick={() => {
              router?.push({
                pathname: item?.link,
              });
            }}
            sx={{ cursor: 'pointer' }}
          >
            <Box
              border={`1px solid ${theme?.palette?.primary?.main}`}
              borderRadius={2}
              padding={2}
            >
              <Avatar
                variant="rounded"
                sx={{ backgroundColor: theme?.palette?.primary?.light }}
              >
                <item.avatar sx={{ color: theme?.palette?.primary?.main }} />
              </Avatar>
              <Typography
                variant="h6"
                color="slateBlue.main"
                whiteSpace={'nowrap'}
                marginY={1.25}
              >
                {item?.type}
              </Typography>
              <Typography variant="body2" color="slateBlue.main">
                {item?.purpose}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
