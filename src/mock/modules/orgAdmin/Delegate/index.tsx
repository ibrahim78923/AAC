import Image from 'next/image';

import { Box, Typography } from '@mui/material';

import { EmpAvatarImage } from '@/assets/images';

export const delegateData = [
  {
    delegatesMember: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Image src={EmpAvatarImage} alt="missing" />
        <Box sx={{ display: 'grid', justifyItems: 'start' }}>
          <Typography
            variant="body3"
            sx={{ fontWeight: 500, color: '#374151' }}
          >
            Olivia Rhye
          </Typography>
          <Typography
            variant="body3"
            sx={{ fontWeight: 400, color: '#667085' }}
          >
            olivia@gmail.com
          </Typography>
        </Box>
      </Box>
    ),
    phoneNumber: `+44 1234 567 `,
    organizationName: 'Orcalo Limited',
    signUpDate: '10/04/2023',
    earnedAmount: '£20',
    status: 'Completed',
    action: '',
  },
  {
    delegatesMember: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Image src={EmpAvatarImage} alt="missing" />
        <Box sx={{ display: 'grid', justifyItems: 'start' }}>
          <Typography
            variant="body3"
            sx={{ fontWeight: 500, color: '#374151' }}
          >
            Olivia Rhye
          </Typography>
          <Typography
            variant="body3"
            sx={{ fontWeight: 400, color: '#667085' }}
          >
            olivia@gmail.com
          </Typography>
        </Box>
      </Box>
    ),
    phoneNumber: `+44 1234 567 `,
    organizationName: 'Extreme Commerce',
    signUpDate: '10/04/2023',
    earnedAmount: '£20',
    status: 'In-progress',
    action: '',
  },
  {
    delegatesMember: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Image src={EmpAvatarImage} alt="missing" />
        <Box sx={{ display: 'grid', justifyItems: 'start' }}>
          <Typography
            variant="body3"
            sx={{ fontWeight: 500, color: '#374151' }}
          >
            Olivia Rhye
          </Typography>
          <Typography
            variant="body3"
            sx={{ fontWeight: 400, color: '#667085' }}
          >
            olivia@gmail.com
          </Typography>
        </Box>
      </Box>
    ),
    phoneNumber: `+44 1234 567 `,
    organizationName: 'Orcalo Limited',
    signUpDate: '10/04/2023',
    earnedAmount: '£20',
    status: 'Completed',
    action: '',
  },
  {
    delegatesMember: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Image src={EmpAvatarImage} alt="missing" />
        <Box sx={{ display: 'grid', justifyItems: 'start' }}>
          <Typography
            variant="body3"
            sx={{ fontWeight: 500, color: '#374151' }}
          >
            Olivia Rhye
          </Typography>
          <Typography
            variant="body3"
            sx={{ fontWeight: 400, color: '#667085' }}
          >
            olivia@gmail.com
          </Typography>
        </Box>
      </Box>
    ),
    phoneNumber: `+44 1234 567 `,
    organizationName: 'Extreme Commerce',
    signUpDate: '10/04/2023',
    earnedAmount: '£20',
    status: 'In-progress',
    action: '',
  },
];
