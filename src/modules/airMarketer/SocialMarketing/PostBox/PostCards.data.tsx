import { Box, Theme, Typography } from '@mui/material';

import { ActivityEditIcon, CheckIcon, SingleUserIcon } from '@/assets/icons';
import { FacebookOutlined } from '@mui/icons-material';

export const postCardsData = [
  {
    category: 'posted',
    data: [
      {
        id: 'post1',
        title: 'Posted',
        titleNo: '08',
        image:
          'https://media.istockphoto.com/id/699612158/photo/bandra-worli-sea-link.jpg?s=1024x1024&w=is&k=20&c=S_7OBBz5C0iRzsnXwVDiPzLMdXYzzJ1zHGMz1KRjmtQ=',
        category: 'facebook',
        categoryIcon: (
          <FacebookOutlined sx={{ width: '16px', height: '16px' }} />
        ),
        heading: 'Brooklyn',
        avatar:
          'https://media.istockphoto.com/id/1318459282/photo/portrait-smile-beautiful-business-asian-woman-in-pink-suit-working-in-office-desk-virtual.jpg?s=612x612&w=0&k=20&c=1eBdU6IMx0KYKwzMrW12FO3QrRdO3uBHjOlCzYBeHEA=',
        date: '16/03/2023',
        description: 'Hey guys! I really love the city pop',
        stepperData: [
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
        ],
      },
      {
        id: 'post2',
        title: 'Posted',
        titleNo: '08',
        image:
          'https://media.istockphoto.com/id/699612158/photo/bandra-worli-sea-link.jpg?s=1024x1024&w=is&k=20&c=S_7OBBz5C0iRzsnXwVDiPzLMdXYzzJ1zHGMz1KRjmtQ=',
        category: 'facebook',
        categoryIcon: (
          <FacebookOutlined sx={{ width: '16px', height: '16px' }} />
        ),
        heading: 'Brooklyn',
        avatar:
          'https://media.istockphoto.com/id/1318459282/photo/portrait-smile-beautiful-business-asian-woman-in-pink-suit-working-in-office-desk-virtual.jpg?s=612x612&w=0&k=20&c=1eBdU6IMx0KYKwzMrW12FO3QrRdO3uBHjOlCzYBeHEA=',
        date: '16/03/2023',
        description: 'Hey guys! I really love the city pop',
      },
    ],
  },
  {
    category: 'scheduled',
    data: [
      {
        id: 'post1',
        title: 'Posted',
        titleNo: '08',
        image:
          'https://media.istockphoto.com/id/699612158/photo/bandra-worli-sea-link.jpg?s=1024x1024&w=is&k=20&c=S_7OBBz5C0iRzsnXwVDiPzLMdXYzzJ1zHGMz1KRjmtQ=',
        category: 'facebook',
        categoryIcon: (
          <FacebookOutlined sx={{ width: '16px', height: '16px' }} />
        ),
        heading: 'Brooklyn',
        avatar:
          'https://media.istockphoto.com/id/1318459282/photo/portrait-smile-beautiful-business-asian-woman-in-pink-suit-working-in-office-desk-virtual.jpg?s=612x612&w=0&k=20&c=1eBdU6IMx0KYKwzMrW12FO3QrRdO3uBHjOlCzYBeHEA=',
        date: '16/03/2023',
        description: 'Hey guys! I really love the city pop',
      },
      {
        id: 'post2',
        title: 'Posted',
        titleNo: '08',
        image:
          'https://media.istockphoto.com/id/699612158/photo/bandra-worli-sea-link.jpg?s=1024x1024&w=is&k=20&c=S_7OBBz5C0iRzsnXwVDiPzLMdXYzzJ1zHGMz1KRjmtQ=',
        category: 'facebook',
        categoryIcon: (
          <FacebookOutlined sx={{ width: '16px', height: '16px' }} />
        ),
        heading: 'Brooklyn',
        avatar:
          'https://media.istockphoto.com/id/1318459282/photo/portrait-smile-beautiful-business-asian-woman-in-pink-suit-working-in-office-desk-virtual.jpg?s=612x612&w=0&k=20&c=1eBdU6IMx0KYKwzMrW12FO3QrRdO3uBHjOlCzYBeHEA=',
        date: '16/03/2023',
        description: 'Hey guys! I really love the city pop',
      },
    ],
  },
  {
    category: 'drafts',
    data: [
      {
        id: 'post1',
        title: 'Posted',
        titleNo: '08',
        image:
          'https://media.istockphoto.com/id/699612158/photo/bandra-worli-sea-link.jpg?s=1024x1024&w=is&k=20&c=S_7OBBz5C0iRzsnXwVDiPzLMdXYzzJ1zHGMz1KRjmtQ=',
        category: 'facebook',
        categoryIcon: (
          <FacebookOutlined sx={{ width: '16px', height: '16px' }} />
        ),
        heading: 'Brooklyn',
        avatar:
          'https://media.istockphoto.com/id/1318459282/photo/portrait-smile-beautiful-business-asian-woman-in-pink-suit-working-in-office-desk-virtual.jpg?s=612x612&w=0&k=20&c=1eBdU6IMx0KYKwzMrW12FO3QrRdO3uBHjOlCzYBeHEA=',
        date: '16/03/2023',
        description: 'Hey guys! I really love the city pop',
      },
      {
        id: 'post2',
        title: 'Posted',
        titleNo: '08',
        image:
          'https://media.istockphoto.com/id/699612158/photo/bandra-worli-sea-link.jpg?s=1024x1024&w=is&k=20&c=S_7OBBz5C0iRzsnXwVDiPzLMdXYzzJ1zHGMz1KRjmtQ=',
        category: 'facebook',
        categoryIcon: (
          <FacebookOutlined sx={{ width: '16px', height: '16px' }} />
        ),
        heading: 'Brooklyn',
        avatar:
          'https://media.istockphoto.com/id/1318459282/photo/portrait-smile-beautiful-business-asian-woman-in-pink-suit-working-in-office-desk-virtual.jpg?s=612x612&w=0&k=20&c=1eBdU6IMx0KYKwzMrW12FO3QrRdO3uBHjOlCzYBeHEA=',
        date: '16/03/2023',
        description: 'Hey guys! I really love the city pop',
      },
    ],
  },
  // {
  //   id: 'post2',
  //   title: 'Scheduled',
  //   titleNo: '02',
  //   image:
  //     'https://media.istockphoto.com/id/803849852/photo/bandra-worli-sea-link.jpg?s=612x612&w=0&k=20&c=dBeZlyhuUbrLopmj09fsoJsi_3ysmSHIS7WXrz4V_0A=',
  //   category: 'instagram',
  //   categoryIcon: <FacebookOutlined sx={{ width: '16px', height: '16px' }} />,
  //   heading: 'Bessie',
  //   avatar:
  //     'https://media.istockphoto.com/id/1365310330/photo/excited-young-indian-man-winner-using-smartphone-isolated-on-yellow-background.jpg?s=612x612&w=0&k=20&c=mbCnh1Bd715P9JSdqrllYYmshIyfDkgafYPK53_S-m0=',
  //   date: '16/03/2023',
  //   description: 'However rare side effects observed..',
  // },
  // {
  //   id: 'post3',
  //   title: 'Drafts',
  //   titleNo: '03',
  //   image:
  //     'https://media.istockphoto.com/id/915681526/photo/bandra-worli-sea-link-mumbai.jpg?s=1024x1024&w=is&k=20&c=L5ZbPXc0iBCgz7zL6nP-Det8lXCLXeUxxBW8TBNPLVQ=',
  //   category: 'facebook',
  //   categoryIcon: <Instagram sx={{ width: '16px', height: '16px' }} />,
  //   heading: 'James',
  //   avatar:
  //     'https://media.istockphoto.com/id/1388644810/photo/happy-caucasian-young-man-using-smart-phone-cellphone-for-calls-social-media-mobile.jpg?s=612x612&w=0&k=20&c=yDQ9bsnRb-diOKvUQDJ6pklSmiHE3-QmSP-L8FuL2vc=',
  //   date: '16/03/2023',
  //   description: 'The journey of a thousand miles ...',
  // },
  // {
  //   id: 'post1',
  //   title: 'Pending Approval',
  //   titleNo: '08',
  //   image:
  //     'https://media.istockphoto.com/id/699612158/photo/bandra-worli-sea-link.jpg?s=1024x1024&w=is&k=20&c=S_7OBBz5C0iRzsnXwVDiPzLMdXYzzJ1zHGMz1KRjmtQ=',
  //   category: 'facebook',
  //   categoryIcon: <FacebookOutlined sx={{ width: '16px', height: '16px' }} />,
  //   heading: 'Brooklyn',
  //   avatar:
  //     'https://media.istockphoto.com/id/1318459282/photo/portrait-smile-beautiful-business-asian-woman-in-pink-suit-working-in-office-desk-virtual.jpg?s=612x612&w=0&k=20&c=1eBdU6IMx0KYKwzMrW12FO3QrRdO3uBHjOlCzYBeHEA=',
  //   date: '16/03/2023',
  //   description: 'Hey guys! I really love the city pop',
  // },
  // {
  //   id: 'post2',
  //   title: 'Rejected',
  //   titleNo: '08',
  //   image:
  //     'https://media.istockphoto.com/id/803849852/photo/bandra-worli-sea-link.jpg?s=612x612&w=0&k=20&c=dBeZlyhuUbrLopmj09fsoJsi_3ysmSHIS7WXrz4V_0A=',
  //   category: 'instagram',
  //   categoryIcon: <FacebookOutlined sx={{ width: '16px', height: '16px' }} />,
  //   heading: 'Bessie',
  //   avatar:
  //     'https://media.istockphoto.com/id/1365310330/photo/excited-young-indian-man-winner-using-smartphone-isolated-on-yellow-background.jpg?s=612x612&w=0&k=20&c=mbCnh1Bd715P9JSdqrllYYmshIyfDkgafYPK53_S-m0=',
  //   date: '16/03/2023',
  //   description: 'However rare side effects observed..',
  // },
  // {
  //   id: 'post3',
  //   title: 'Failed',
  //   titleNo: '03',
  //   image:
  //     'https://media.istockphoto.com/id/915681526/photo/bandra-worli-sea-link-mumbai.jpg?s=1024x1024&w=is&k=20&c=L5ZbPXc0iBCgz7zL6nP-Det8lXCLXeUxxBW8TBNPLVQ=',
  //   category: 'facebook',
  //   categoryIcon: <FacebookOutlined sx={{ width: '16px', height: '16px' }} />,
  //   heading: 'James',
  //   avatar:
  //     'https://media.istockphoto.com/id/1388644810/photo/happy-caucasian-young-man-using-smart-phone-cellphone-for-calls-social-media-mobile.jpg?s=612x612&w=0&k=20&c=yDQ9bsnRb-diOKvUQDJ6pklSmiHE3-QmSP-L8FuL2vc=',
  //   date: '16/03/2023',
  //   description: 'The journey of a thousand miles ...',
  // },
];
