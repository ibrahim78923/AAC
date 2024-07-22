import { Avatar, Box, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { reportsTypes } from './Reports.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

export const Reports = () => {
  const router = useRouter();
  return (
    <>
      <Typography variant="h3" color="slateBlue.main">
        Reports and Analytics
      </Typography>
      <br />
      <Grid container spacing={3}>
        {reportsTypes?.map((report: any) => (
          <PermissionsGuard permissions={report?.permission} key={report?.id}>
            <Grid
              item
              md={5}
              lg={4}
              xs={12}
              onClick={() => {
                router?.push({
                  pathname: report?.link,
                });
              }}
              sx={{ cursor: 'pointer' }}
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
                    fontWeight={600}
                  >
                    {report?.type}
                  </Typography>
                  <Typography
                    variant="body3"
                    fontWeight={500}
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
    </>
  );
};
