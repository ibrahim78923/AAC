import {
  Box,
  Checkbox,
  Stack,
  Typography,
  LinearProgress,
} from '@mui/material';
import Link from 'next/link';
import { AIR_MARKETER } from '@/routesConstants/paths';
import AppAvatarGroup from '@/components/AvatarGroup';
import { styles } from './Broadcast.style';

export const broadcastData: any = [
  {
    _id: 1,
    name: 'Test broad',
    createdOn: '10/04/2023',
    successful: '100',
    read: '84',
    replied: '55',
    recipients: [
      {
        id: '03',
        name: 'Waseeem',
        img: 'https://media.istockphoto.com/id/1439993254/photo/happy-little-african-american-girl-blowing-a-flower-in-outside-cheerful-child-having-fun.webp?b=1&s=170667a&w=0&k=20&c=T6mLJamQQg1Myb96cGs5XSbegGYGUjysSxBld9vsY00=',
      },
      {
        id: '04',
        name: 'Waseeem',
        img: 'https://image.cnbcfm.com/api/v1/image/107081378-1656361235570-GettyImages-1225403728_2.jpg?v=1656361293',
      },
      {
        id: '05',
        name: 'Waseeem',
        img: 'https://149405263.v2.pressablecdn.com/wp-content/uploads/2021/05/little-boy-all-alone-with-teddy-bear.jpeg',
      },
      {
        id: '06',
        name: 'Waseeem',
        img: 'https://media.istockphoto.com/id/1283599879/photo/happiness-and-wellbeing.jpg?s=612x612&w=0&k=20&c=3JSSHPtdhL0dtA1zcVu4mfNw6FVlskRC2kk_Rl9FKU8=',
      },
    ],
    failed: [
      {
        id: '01',
        name: 'Ahsan',
        img: 'https://images.pexels.com/photos/1549974/pexels-photo-1549974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: '02',
        name: 'Shehroz',
        img: 'https://adayinourshoes.com/wp-content/uploads/strong-child.jpg',
      },
      {
        id: '03',
        name: 'Waseeem',
        img: 'https://media.istockphoto.com/id/1439993254/photo/happy-little-african-american-girl-blowing-a-flower-in-outside-cheerful-child-having-fun.webp?b=1&s=170667a&w=0&k=20&c=T6mLJamQQg1Myb96cGs5XSbegGYGUjysSxBld9vsY00=',
      },
      {
        id: '04',
        name: 'Waseeem',
        img: 'https://image.cnbcfm.com/api/v1/image/107081378-1656361235570-GettyImages-1225403728_2.jpg?v=1656361293',
      },
    ],
    status: 'Completed',
  },
  {
    _id: 2,
    name: 'Demo broadcast',
    createdOn: '10/04/2023',
    successful: '100',
    read: '84',
    replied: '55',
    recipients: [
      {
        id: '02',
        name: 'Shehroz',
        img: 'https://adayinourshoes.com/wp-content/uploads/strong-child.jpg',
      },
      {
        id: '03',
        name: 'Waseeem',
        img: 'https://media.istockphoto.com/id/1439993254/photo/happy-little-african-american-girl-blowing-a-flower-in-outside-cheerful-child-having-fun.webp?b=1&s=170667a&w=0&k=20&c=T6mLJamQQg1Myb96cGs5XSbegGYGUjysSxBld9vsY00=',
      },
      {
        id: '04',
        name: 'Waseeem',
        img: 'https://image.cnbcfm.com/api/v1/image/107081378-1656361235570-GettyImages-1225403728_2.jpg?v=1656361293',
      },
      {
        id: '05',
        name: 'Waseeem',
        img: 'https://149405263.v2.pressablecdn.com/wp-content/uploads/2021/05/little-boy-all-alone-with-teddy-bear.jpeg',
      },
      {
        id: '06',
        name: 'Waseeem',
        img: 'https://media.istockphoto.com/id/1283599879/photo/happiness-and-wellbeing.jpg?s=612x612&w=0&k=20&c=3JSSHPtdhL0dtA1zcVu4mfNw6FVlskRC2kk_Rl9FKU8=',
      },
    ],
    failed: [
      {
        id: '01',
        name: 'Ahsan',
        img: 'https://images.pexels.com/photos/1549974/pexels-photo-1549974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: '02',
        name: 'Shehroz',
        img: 'https://adayinourshoes.com/wp-content/uploads/strong-child.jpg',
      },
      {
        id: '03',
        name: 'Waseeem',
        img: 'https://media.istockphoto.com/id/1439993254/photo/happy-little-african-american-girl-blowing-a-flower-in-outside-cheerful-child-having-fun.webp?b=1&s=170667a&w=0&k=20&c=T6mLJamQQg1Myb96cGs5XSbegGYGUjysSxBld9vsY00=',
      },
      {
        id: '04',
        name: 'Waseeem',
        img: 'https://image.cnbcfm.com/api/v1/image/107081378-1656361235570-GettyImages-1225403728_2.jpg?v=1656361293',
      },
    ],
    status: 'Scheduled',
  },
  {
    _id: 3,
    name: 'Test Campaign sankalp',
    createdOn: '10/04/2023',
    successful: '100',
    read: '84',
    replied: '55',
    recipients: [
      {
        id: '01',
        name: 'Ahsan',
        img: 'https://images.pexels.com/photos/1549974/pexels-photo-1549974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: '02',
        name: 'Shehroz',
        img: 'https://adayinourshoes.com/wp-content/uploads/strong-child.jpg',
      },
      {
        id: '05',
        name: 'Waseeem',
        img: 'https://149405263.v2.pressablecdn.com/wp-content/uploads/2021/05/little-boy-all-alone-with-teddy-bear.jpeg',
      },
      {
        id: '06',
        name: 'Waseeem',
        img: 'https://media.istockphoto.com/id/1283599879/photo/happiness-and-wellbeing.jpg?s=612x612&w=0&k=20&c=3JSSHPtdhL0dtA1zcVu4mfNw6FVlskRC2kk_Rl9FKU8=',
      },
    ],
    failed: [
      {
        id: '01',
        name: 'Ahsan',
        img: 'https://images.pexels.com/photos/1549974/pexels-photo-1549974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: '02',
        name: 'Shehroz',
        img: 'https://adayinourshoes.com/wp-content/uploads/strong-child.jpg',
      },
      {
        id: '03',
        name: 'Waseeem',
        img: 'https://media.istockphoto.com/id/1439993254/photo/happy-little-african-american-girl-blowing-a-flower-in-outside-cheerful-child-having-fun.webp?b=1&s=170667a&w=0&k=20&c=T6mLJamQQg1Myb96cGs5XSbegGYGUjysSxBld9vsY00=',
      },
      {
        id: '04',
        name: 'Waseeem',
        img: 'https://image.cnbcfm.com/api/v1/image/107081378-1656361235570-GettyImages-1225403728_2.jpg?v=1656361293',
      },
    ],
    status: 'Draft',
  },
  {
    _id: 4,
    name: 'Test Campaign sankalp',
    createdOn: '10/04/2023',
    successful: '100',
    read: '84',
    replied: '55',
    recipients: [
      {
        id: '01',
        name: 'Ahsan',
        img: 'https://images.pexels.com/photos/1549974/pexels-photo-1549974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: '02',
        name: 'Shehroz',
        img: 'https://adayinourshoes.com/wp-content/uploads/strong-child.jpg',
      },
      {
        id: '03',
        name: 'Waseeem',
        img: 'https://media.istockphoto.com/id/1439993254/photo/happy-little-african-american-girl-blowing-a-flower-in-outside-cheerful-child-having-fun.webp?b=1&s=170667a&w=0&k=20&c=T6mLJamQQg1Myb96cGs5XSbegGYGUjysSxBld9vsY00=',
      },
      {
        id: '04',
        name: 'Waseeem',
        img: 'https://image.cnbcfm.com/api/v1/image/107081378-1656361235570-GettyImages-1225403728_2.jpg?v=1656361293',
      },
    ],
    failed: [
      {
        id: '01',
        name: 'Ahsan',
        img: 'https://images.pexels.com/photos/1549974/pexels-photo-1549974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: '02',
        name: 'Shehroz',
        img: 'https://adayinourshoes.com/wp-content/uploads/strong-child.jpg',
      },
      {
        id: '03',
        name: 'Waseeem',
        img: 'https://media.istockphoto.com/id/1439993254/photo/happy-little-african-american-girl-blowing-a-flower-in-outside-cheerful-child-having-fun.webp?b=1&s=170667a&w=0&k=20&c=T6mLJamQQg1Myb96cGs5XSbegGYGUjysSxBld9vsY00=',
      },
      {
        id: '04',
        name: 'Waseeem',
        img: 'https://image.cnbcfm.com/api/v1/image/107081378-1656361235570-GettyImages-1225403728_2.jpg?v=1656361293',
      },
    ],
    status: 'Processing',
  },
];

export const broadcastColumns: any = (statusTag: any, theme: any) => {
  return [
    {
      accessorFn: (row: any) => row?._Id,
      id: '_id',
      cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: false,
      header: 'Broadcast Name',
      cell: (info: any) => (
        <Link
          href={`/${AIR_MARKETER?.WHATSAPP_MERKETING}/details`}
          style={{ color: theme?.palette?.custom?.bright, fontWeight: 600 }}
        >
          {info?.getValue()}
        </Link>
      ),
    },
    {
      accessorFn: (row: any) => row?.createdOn,
      id: 'createdOn',
      isSortable: false,
      header: 'Created On',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.successful,
      id: 'successful',
      isSortable: false,
      header: 'Successful',
      cell: (info: any) => (
        <Stack sx={{ minWidth: '80px' }} gap={1}>
          <Typography variant="body2" textAlign={'center'}>
            {info.getValue()}%
          </Typography>
          <LinearProgress variant="determinate" value={info.getValue()} />
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.read,
      id: 'read',
      isSortable: false,
      header: 'Read',
      cell: (info: any) => (
        <Stack sx={{ minWidth: '80px' }} gap={1}>
          <Typography variant="body2" textAlign={'center'}>
            {info.getValue()}%
          </Typography>
          <LinearProgress variant="determinate" value={info.getValue()} />
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.replied,
      id: 'replied',
      isSortable: false,
      header: 'Replied',
      cell: (info: any) => (
        <Stack sx={{ minWidth: '80px' }} gap={1}>
          <Typography variant="body2" textAlign={'center'}>
            {info.getValue()}%
          </Typography>
          <LinearProgress variant="determinate" value={info.getValue()} />
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.recipients,
      id: 'recipients',
      isSortable: false,
      header: 'Recipients',
      cell: (info: any) => <AppAvatarGroup max={5} data={info.getValue()} />,
    },
    {
      accessorFn: (row: any) => row?.failed,
      id: 'failed',
      isSortable: false,
      header: 'Failed',
      cell: (info: any) => <AppAvatarGroup max={5} data={info.getValue()} />,
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: false,
      header: 'Status',
      cell: (info: any) => (
        <Box sx={styles?.statusBadge}>
          <Box
            sx={{
              width: '10px',
              height: '10px',
              backgroundColor: `${statusTag(info?.getValue())}`,
              borderRadius: '50%',
            }}
          />
          {info?.getValue()}
        </Box>
      ),
    },
  ];
};
