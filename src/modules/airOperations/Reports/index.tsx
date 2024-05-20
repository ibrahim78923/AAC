import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { reportsTypes } from './Reports.data';

export const Reports = () => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <>
      <Typography variant="h3">Reports and Analytics</Typography>
      <br />
      <Grid container spacing={3}>
        {reportsTypes?.map((report: any) => (
          <Grid
            key={report?.id}
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
              border={`1px solid ${theme?.palette?.grey?.[700]}`}
              borderRadius={2}
              gap={2}
              padding={1}
              height={'100%'}
            >
              <Avatar
                variant="rounded"
                sx={{ backgroundColor: theme?.palette?.primary?.light }}
              >
                {report?.avatar}
              </Avatar>
              <Box flex={1}>
                <Typography variant="h5" whiteSpace={'nowrap'}>
                  {report?.type}
                </Typography>
                <Typography variant="body3" color={theme?.palette?.grey?.[900]}>
                  {report?.purpose}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
