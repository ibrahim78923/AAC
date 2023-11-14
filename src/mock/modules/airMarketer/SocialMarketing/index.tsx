import { Box, Theme, Typography } from '@mui/material';

import { ActivityEditIcon, CheckIcon, SingleUserIcon } from '@/assets/icons';

export const postBoxSteps = [
  {
    icon: <ActivityEditIcon />,
    label: '3 November 2022',
    time: '2:48 PM',
    description: (theme: Theme) => (
      <Box sx={{ display: 'flex', color: '#4E4B66', gap: 0.5 }}>
        <Typography sx={{ color: theme?.palette?.primary?.main }}>
          Natalia
        </Typography>{' '}
        created and{' '}
        <Typography sx={{ color: theme?.palette?.primary?.main }}>
          scheduled
        </Typography>{' '}
        the post to kristy.
      </Box>
    ),
  },
  {
    icon: <SingleUserIcon />,
    label: '3 November 2022',
    description: (theme: Theme) => (
      <Box sx={{ display: 'flex', color: '#4E4B66', gap: 0.5 }}>
        <Typography sx={{ color: theme?.palette?.primary?.main }}>
          Natalia
        </Typography>{' '}
        created and{' '}
        <Typography sx={{ color: theme?.palette?.primary?.main }}>
          scheduled
        </Typography>{' '}
        the post to kristy.
      </Box>
    ),
  },
  {
    icon: <ActivityEditIcon />,
    label: '3 November 2022',
    description: (theme: Theme) => (
      <Box sx={{ display: 'flex', color: '#4E4B66', gap: 0.5 }}>
        <Typography sx={{ color: theme?.palette?.primary?.main }}>
          Natalia
        </Typography>{' '}
        created and{' '}
        <Typography sx={{ color: theme?.palette?.primary?.main }}>
          scheduled
        </Typography>{' '}
        the post to kristy.
      </Box>
    ),
  },
  {
    label: '3 November 2022',
    description: (theme: Theme) => (
      <Box sx={{ display: 'flex', color: '#4E4B66', gap: 0.5 }}>
        <Typography sx={{ color: theme?.palette?.primary?.main }}>
          Natalia
        </Typography>{' '}
        created and{' '}
        <Typography sx={{ color: theme?.palette?.primary?.main }}>
          scheduled
        </Typography>{' '}
        the post to kristy.
      </Box>
    ),
  },
  {
    icon: <CheckIcon />,
    label: '3 November 2022',
    description: (theme: Theme) => (
      <Box sx={{ display: 'flex', color: '#4E4B66', gap: 0.5 }}>
        <Typography sx={{ color: theme?.palette?.primary?.main }}>
          Natalia
        </Typography>{' '}
        created and{' '}
        <Typography sx={{ color: theme?.palette?.primary?.main }}>
          scheduled
        </Typography>{' '}
        the post to kristy.
      </Box>
    ),
  },
  {
    icon: <SingleUserIcon />,
    label: '3 November 2022',
    description: (theme: Theme) => (
      <Box sx={{ display: 'flex', color: '#4E4B66', gap: 0.5 }}>
        <Typography sx={{ color: theme?.palette?.primary?.main }}>
          Natalia
        </Typography>{' '}
        created and{' '}
        <Typography sx={{ color: theme?.palette?.primary?.main }}>
          scheduled
        </Typography>{' '}
        the post to kristy.
      </Box>
    ),
  },
  {
    icon: <SingleUserIcon />,
    label: '3 November 2022',
    description: (theme: Theme) => (
      <Box sx={{ display: 'flex', color: '#4E4B66', gap: 0.5 }}>
        <Typography sx={{ color: theme?.palette?.primary?.main }}>
          Natalia
        </Typography>{' '}
        created and{' '}
        <Typography sx={{ color: theme?.palette?.primary?.main }}>
          scheduled
        </Typography>{' '}
        the post to kristy.
      </Box>
    ),
  },
];
