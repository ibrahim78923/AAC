import { Avatar, Box, Grid, Typography } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ReportsTypesI } from './Reports.interface';
import { useReports } from './useReports';

export const Reports = () => {
  const { reportsTypes, router, checkApiStatus } = useReports();

  return (
    <>
      <Typography variant="h3" color="slateBlue.main">
        Reports and Analytics
      </Typography>
      <br />
      {checkApiStatus() ?? (
        <Grid container spacing={3}>
          {reportsTypes?.map((report: ReportsTypesI) => (
            <PermissionsGuard permissions={report?.permission} key={report?.id}>
              <Grid
                item
                md={5}
                lg={4}
                xs={12}
                onClick={() => {
                  if (!report?.findAccount?.hasAccount) return;
                  router?.push({
                    pathname: report?.link,
                    query: {
                      id: report?.findAccount?.productId,
                      baseModule: report?.baseModule,
                    },
                  });
                }}
                sx={{
                  cursor: !report?.findAccount?.hasAccount
                    ? 'not-allowed'
                    : 'pointer',
                }}
              >
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  flexWrap={'wrap'}
                  border={`1px solid`}
                  borderColor={'primary.light'}
                  borderRadius={2}
                  gap={2}
                  px={1.5}
                  py={2}
                  height={'100%'}
                  bgcolor={
                    !report?.findAccount?.hasAccount
                      ? 'grey.200'
                      : 'common.white'
                  }
                >
                  <Avatar
                    variant="rounded"
                    sx={{ backgroundColor: 'primary.light' }}
                  >
                    {report?.avatar}
                  </Avatar>
                  <Box flex={1}>
                    <Typography
                      variant="body1"
                      color="secondary.main"
                      fontWeight={'fontWeightMedium'}
                    >
                      {report?.type}
                    </Typography>
                    <Typography
                      variant="body3"
                      fontWeight={'fontWeightSmall'}
                      color={'custom.dark_grey'}
                    >
                      {report?.purpose}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </PermissionsGuard>
          ))}
        </Grid>
      )}
    </>
  );
};
