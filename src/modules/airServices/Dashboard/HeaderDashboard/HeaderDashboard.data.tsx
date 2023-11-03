import { Box, Button } from '@mui/material';

export const actionsFunction = [
  {
    title: 'Copy URL',
  },
  {
    title: 'Email this dashboard',
  },
];

export const dashboardFunction = (theme: any) => [
  {
    title: (
      <Box display={'flex'} gap={'3rem'}>
        Services
        <Box
          sx={{
            color: theme?.palette?.success?.main,
            border: '1px solid',
            padding: '0 10px',
            borderRadius: '16px',
            cursor: 'pointer',
            width: 'fit-content',
          }}
        >
          open
        </Box>
      </Box>
    ),
  },
  {
    title: 'Services_1',
  },
  {
    title: 'Services_2',
  },
  {
    title: 'Services_3',
  },
  {
    title: 'Services_4',
  },
  {
    title: (
      <Button
        sx={{
          border: `0.063rem solid ${theme?.palette?.grey?.[600]}`,
          color: theme?.palette?.grey?.[600],
        }}
      >
        Manage Dashboards
      </Button>
    ),
  },
];
