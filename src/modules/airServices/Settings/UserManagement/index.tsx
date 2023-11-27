import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { userManagement } from './UserManagement.data';
export const UserManagement = () => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <>
      <Typography variant="h3">User Management</Typography>
      <br />
      <Grid container spacing={3}>
        {userManagement?.map((item: any) => (
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
              display={'flex'}
              alignItems={'center'}
              flexWrap={'wrap'}
              border={`1px solid ${theme?.palette?.primary?.main}`}
              borderRadius={2}
              gap={1}
              padding={2}
            >
              <Avatar
                variant="rounded"
                sx={{ backgroundColor: theme?.palette?.primary?.light }}
              >
                <item.avatar sx={{ color: theme?.palette?.primary?.main }} />
              </Avatar>
              <Typography
                variant="body2"
                color="slateBlue.main"
                whiteSpace={'nowrap'}
              >
                {item?.type}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
