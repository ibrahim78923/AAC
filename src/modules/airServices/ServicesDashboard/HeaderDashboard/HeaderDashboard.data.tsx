import { Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

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
    title: 'Services',
    key: uuidv4(),
    rightSide: (
      <div
        style={{
          color: 'red',
          border: '1px solid',
          padding: '3px 10px',
          borderRadius: '16px',
          cursor: 'pointer',
          width: 'fit-content',
        }}
      >
        open
      </div>
    ),
  },
  {
    title: 'Services_1',
    key: uuidv4(),
  },
  {
    title: 'Services_2',
    key: uuidv4(),
  },
  {
    title: 'Services_3',
    key: uuidv4(),
  },
  {
    title: 'Services_4',
    key: uuidv4(),
  },
  {
    title: (
      <Button sx={{ border: '1px solid #4B5563', color: '#4B5563' }}>
        Manage Dashboards
      </Button>
    ),
    key: uuidv4(),
  },
];
