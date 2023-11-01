import { Button } from '@mui/material';

export const ActionsFunction = [
  {
    title: 'Copy URL',
  },
  {
    title: 'Email this dashboard',
  },
];

export const DashboardFunction = [
  {
    title: (
      <div style={{ display: 'flex', gap: '3rem' }}>
        Services
        <div
          style={{
            color: '#47B263',
            border: '1px solid',
            padding: '0 10px',
            borderRadius: '16px',
            cursor: 'pointer',
            width: 'fit-content',
          }}
        >
          open
        </div>
      </div>
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
      <Button sx={{ border: '1px solid #4B5563', color: '#4B5563' }}>
        Manage Dashboards
      </Button>
    ),
  },
];
