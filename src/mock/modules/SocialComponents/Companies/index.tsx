import Image from 'next/image';

import Link from 'next/link';

import { Box, Typography } from '@mui/material';

import { AvatarImage, EmpAvatarImage, TicketImage } from '@/assets/images';

export const accordionData = [
  {
    empNo: '01',
    mainHeading: 'Contacts',
    img: EmpAvatarImage,
    name: 'Olivya Rhye',
    email: 'oivyerye@gmail.com',
    phoneNumber: '+44 779 672 6637',
  },
  {
    empNo: '01',
    mainHeading: 'Deals',
    img: TicketImage,
    name: 'Sample',
    email: '£ 200.00',
    stage: 'Appointment Schedule',
  },
  {
    empNo: '0',
    mainHeading: 'Tickets',
    description: 'No Tickets associated with this record',
  },
  {
    empNo: '0',
    mainHeading: 'Attachments',
    description: 'No Attachments associated with this record',
  },
];

export const importColumnsData = [
  {
    Id: 1,
    fileColumns: (
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: '#111827' }}
        >
          Company name
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: '#667085' }}
        >
          sample
        </Typography>
      </Box>
    ),
  },
  {
    Id: 2,
    fileColumns: (
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: '#111827' }}
        >
          Domain
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: '#667085' }}
        >
          sample.com
        </Typography>
      </Box>
    ),
  },
  {
    Id: 3,
    fileColumns: (
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: '#111827' }}
        >
          Phone Number
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: '#667085' }}
        >
          +44 779 672 6637
        </Typography>
      </Box>
    ),
  },
  {
    Id: 4,
    fileColumns: (
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: '#111827' }}
        >
          Industry
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: '#667085' }}
        >
          Consumers Services
        </Typography>
      </Box>
    ),
  },
  {
    Id: 5,
    fileColumns: (
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: '#111827' }}
        >
          Email address
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: '#667085' }}
        >
          Janesampleton@gmail.com
        </Typography>
      </Box>
    ),
  },
  {
    Id: 6,
    fileColumns: (
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: '#111827' }}
        >
          Company Type
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: '#667085' }}
        >
          New Business
        </Typography>
      </Box>
    ),
  },
  {
    Id: 7,
    fileColumns: (
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: '#111827' }}
        >
          Total Revenue
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: '#667085' }}
        >
          £ 1000.000.0
        </Typography>
      </Box>
    ),
  },
  {
    Id: 8,
    fileColumns: (
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: '#111827' }}
        >
          Created Date
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: '#667085' }}
        >
          1/12/2022
        </Typography>
      </Box>
    ),
  },
  {
    Id: 9,
    fileColumns: (
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: '#111827' }}
        >
          No of Employees
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: '#667085' }}
        >
          1000
        </Typography>
      </Box>
    ),
  },
  {
    Id: 10,
    fileColumns: (
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: '#111827' }}
        >
          Post Code
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: '#667085' }}
        >
          ECHIVQ0
        </Typography>
      </Box>
    ),
  },
  {
    Id: 11,
    fileColumns: (
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: '#111827' }}
        >
          Company Owner
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: '#667085' }}
        >
          XYLi(sample)
        </Typography>
      </Box>
    ),
  },
  {
    Id: 12,
    fileColumns: (
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: '#111827' }}
        >
          Related contact email address
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: '#667085' }}
        >
          XYLi(sample)
        </Typography>
      </Box>
    ),
  },
  {
    Id: 13,
    fileColumns: (
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: '#111827' }}
        >
          Source
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: '#667085' }}
        >
          Blogs
        </Typography>
      </Box>
    ),
  },
];

export const companiesTableData = [
  {
    Id: 1,
    owner: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Image src={AvatarImage} alt="logo" width={40} height={40} />
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 500, color: '#111827' }}
          >
            Olivia Rhye
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 400, color: '#667085' }}
          >
            olivia@gmail.com
          </Typography>
        </Box>
      </Box>
    ),
    name: (
      <Typography variant="body2" sx={{ color: '#38CAB5', fontWeight: 500 }}>
        Sharemydine
      </Typography>
    ),
    createdDate: '10/04/2023',
    domainName: (
      <Link href="/" style={{ color: '#0072C6', textDecoration: 'underline' }}>
        smd.com
      </Link>
    ),
    crn: 'AB123456',
    phoneNumber: '+44 779 672 6637',
    industry: 'Computer Software',
  },
  {
    Id: 1,
    owner: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Image src={AvatarImage} alt="logo" width={40} height={40} />
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 500, color: '#111827' }}
          >
            Olivia Rhye
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 400, color: '#667085' }}
          >
            olivia@gmail.com
          </Typography>
        </Box>
      </Box>
    ),
    name: (
      <Typography variant="body2" sx={{ color: '#38CAB5', fontWeight: 500 }}>
        Sharemydine
      </Typography>
    ),
    createdDate: '10/04/2023',
    domainName: (
      <Link href="/" style={{ color: '#0072C6', textDecoration: 'underline' }}>
        smd.com
      </Link>
    ),
    crn: 'AB123456',
    phoneNumber: '+44 779 672 6637',
    industry: 'Computer Software',
  },
  {
    Id: 1,
    owner: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Image src={AvatarImage} alt="logo" width={40} height={40} />
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 500, color: '#111827' }}
          >
            Olivia Rhye
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 400, color: '#667085' }}
          >
            olivia@gmail.com
          </Typography>
        </Box>
      </Box>
    ),
    name: (
      <Typography variant="body2" sx={{ color: '#38CAB5', fontWeight: 500 }}>
        Sharemydine
      </Typography>
    ),
    createdDate: '10/04/2023',
    domainName: (
      <Link href="/" style={{ color: '#0072C6', textDecoration: 'underline' }}>
        smd.com
      </Link>
    ),
    crn: 'AB123456',
    phoneNumber: '+44 779 672 6637',
    industry: 'Computer Software',
  },
  {
    Id: 1,
    owner: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Image src={AvatarImage} alt="logo" width={40} height={40} />
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 500, color: '#111827' }}
          >
            Olivia Rhye
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 400, color: '#667085' }}
          >
            olivia@gmail.com
          </Typography>
        </Box>
      </Box>
    ),
    name: (
      <Typography variant="body2" sx={{ color: '#38CAB5', fontWeight: 500 }}>
        Sharemydine
      </Typography>
    ),
    createdDate: '10/04/2023',
    domainName: (
      <Link href="/" style={{ color: '#0072C6', textDecoration: 'underline' }}>
        smd.com
      </Link>
    ),
    crn: 'AB123456',
    phoneNumber: '+44 779 672 6637',
    industry: 'Computer Software',
  },
  {
    Id: 1,
    owner: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Image src={AvatarImage} alt="logo" width={40} height={40} />
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 500, color: '#111827' }}
          >
            Olivia Rhye
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 400, color: '#667085' }}
          >
            olivia@gmail.com
          </Typography>
        </Box>
      </Box>
    ),
    name: (
      <Typography variant="body2" sx={{ color: '#38CAB5', fontWeight: 500 }}>
        Sharemydine
      </Typography>
    ),
    createdDate: '10/04/2023',
    domainName: (
      <Link href="/" style={{ color: '#0072C6', textDecoration: 'underline' }}>
        smd.com
      </Link>
    ),
    crn: 'AB123456',
    phoneNumber: '+44 779 672 6637',
    industry: 'Computer Software',
  },
  {
    Id: 1,
    owner: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Image src={AvatarImage} alt="logo" width={40} height={40} />
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 500, color: '#111827' }}
          >
            Olivia Rhye
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 400, color: '#667085' }}
          >
            olivia@gmail.com
          </Typography>
        </Box>
      </Box>
    ),
    name: (
      <Typography variant="body2" sx={{ color: '#38CAB5', fontWeight: 500 }}>
        Sharemydine
      </Typography>
    ),
    createdDate: '10/04/2023',
    domainName: (
      <Link href="/" style={{ color: '#0072C6', textDecoration: 'underline' }}>
        smd.com
      </Link>
    ),
    crn: 'AB123456',
    phoneNumber: '+44 779 672 6637',
    industry: 'Computer Software',
  },
  {
    Id: 1,
    owner: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Image src={AvatarImage} alt="logo" width={40} height={40} />
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 500, color: '#111827' }}
          >
            Olivia Rhye
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 400, color: '#667085' }}
          >
            olivia@gmail.com
          </Typography>
        </Box>
      </Box>
    ),
    name: (
      <Typography variant="body2" sx={{ color: '#38CAB5', fontWeight: 500 }}>
        Sharemydine
      </Typography>
    ),
    createdDate: '10/04/2023',
    domainName: (
      <Link href="/" style={{ color: '#0072C6', textDecoration: 'underline' }}>
        smd.com
      </Link>
    ),
    crn: 'AB123456',
    phoneNumber: '+44 779 672 6637',
    industry: 'Computer Software',
  },
];
