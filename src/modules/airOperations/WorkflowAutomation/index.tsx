import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material';
import { workflowAutomationTypes } from './WorkflowAutomation.data';
import { useRouter } from 'next/router';

export const WorkflowAutomation = () => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <>
      <Typography variant="h3">Workflow Automation</Typography>
      <br />
      <Grid container spacing={3}>
        {workflowAutomationTypes?.map((workflow: any) => (
          <Grid
            key={workflow?.id}
            item
            md={5}
            lg={4}
            xs={12}
            onClick={() => {
              router?.push({
                pathname: workflow?.link,
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
            >
              <Avatar
                variant="rounded"
                sx={{ backgroundColor: theme?.palette?.primary?.light }}
              />
              <Box flex={1}>
                <Typography variant="h5" whiteSpace={'nowrap'}>
                  {workflow?.type}
                </Typography>
                <Typography variant="body3" color={theme?.palette?.grey?.[900]}>
                  {workflow?.purpose}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
