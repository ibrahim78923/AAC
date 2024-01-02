import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { agentPerformanceManagement } from './AgentPerformanceManagement';
export const AgentPerformanceManagement = () => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <>
      <Typography variant="h3">
        Agent Productivity & Workload Management
      </Typography>
      <br />
      <Grid container spacing={3}>
        {agentPerformanceManagement?.map((item: any) => (
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
              textAlign={'center'}
              height={'100%'}
            >
              <Avatar
                sx={{
                  backgroundColor: theme?.palette?.primary?.light,
                  width: 56,
                  height: 56,
                  margin: 'auto',
                }}
              >
                <item.avatar />
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
