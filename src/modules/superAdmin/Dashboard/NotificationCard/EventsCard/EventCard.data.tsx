import { Box, Typography } from '@mui/material';

import { DocumentBlueIcon, MessadeIcon, RedAlertIcon } from '@/assets/icons';

export const steps = [
  {
    label: (
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" sx={{ color: '#303E67', fontWeight: 600 }}>
          Access Revoke
        </Typography>
        <Typography variant="body2" sx={{ color: '#A4ABC5', fontWeight: 400 }}>
          10 Min ago
        </Typography>
      </Box>
    ),
    description: ' Access revoked from xyz123',
    icon: <DocumentBlueIcon />,
    borderColor: '#1ECA7B',
  },
  {
    label: (
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" sx={{ color: '#303E67', fontWeight: 600 }}>
          Alert Message
        </Typography>
        <Typography variant="body2" sx={{ color: '#A4ABC5', fontWeight: 400 }}>
          10 Min ago
        </Typography>
      </Box>
    ),
    description: 'A new ticket accessed in system',
    icon: <RedAlertIcon />,
    borderColor: '#FF4A4A',
  },
  {
    label: (
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" sx={{ color: '#303E67', fontWeight: 600 }}>
          Fee Update
        </Typography>
        <Typography variant="body2" sx={{ color: '#A4ABC5', fontWeight: 400 }}>
          10 Min ago
        </Typography>
      </Box>
    ),
    description: `Add new fees for services id 1239572`,
    icon: <MessadeIcon />,
    borderColor: '#0AADC7',
  },
];
