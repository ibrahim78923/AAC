import { Box, Theme, Typography } from '@mui/material';
import { FacebookOutlined } from '@mui/icons-material';

import { ActivityEditIcon, CheckIcon, SingleUserIcon } from '@/assets/icons';

export const postCardsData = [
  {
    category: 'posted',
    data: [
      {
        id: 'post1',
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
        id: 'post3',
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
    category: 'pendingApproval',
    data: [
      {
        id: 'post1',
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
        id: 'post3',
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
    category: 'rejected',
    data: [
      {
        id: 'post1',
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
    category: 'failed',
    data: [
      {
        id: 'post1',
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
        id: 'post3',
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
];
