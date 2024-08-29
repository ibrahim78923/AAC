import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { reportsTypes } from './Reports.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ServicesReportsTypesI } from './Reports.interface';

export const Reports = () => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <PageTitledHeader title="Reports and Analytics" />
      <br />
      <Grid container spacing={3}>
        {reportsTypes?.map((item: ServicesReportsTypesI) => (
          <PermissionsGuard permissions={item?.permissions} key={item?.id}>
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              onClick={() => {
                router?.push({
                  pathname: item?.link,
                });
              }}
              sx={{ cursor: 'pointer' }}
            >
              <Box
                display={'flex'}
                alignItems={'center'}
                border={`1px solid ${theme?.palette?.primary?.main}`}
                borderRadius={2}
                gap={1}
                padding={2}
                height="100%"
              >
                <Avatar
                  sx={{
                    backgroundColor: theme?.palette?.primary?.light,
                    width: 56,
                    height: 56,
                  }}
                  variant={'rounded'}
                >
                  <item.avatar />
                </Avatar>
                <Box>
                  <Typography
                    variant={'h6'}
                    color={'slateBlue.main'}
                    whiteSpace={'nowrap'}
                  >
                    {item?.type}
                  </Typography>
                  <Typography variant={'body2'} color={'slateBlue.main'}>
                    {item?.purpose}
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
