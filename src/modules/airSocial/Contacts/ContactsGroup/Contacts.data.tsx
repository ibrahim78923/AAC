import { Box } from '@mui/material';
import Image from 'next/image';

export const columns: any = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    header: 'name',
    cell: (info: any) => (
      <>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{}}>
            <Image
              src={info?.row?.original?.image}
              width={20}
              height={20}
              style={{ borderRadius: '50%' }}
              alt="user-image"
            />
          </Box>
          {info?.getValue()}
        </Box>
      </>
    ),
  },
  {
    accessorFn: (row: any) => row?.phoneNo,
    id: 'phoneNo',
    header: 'Phone Number',
    cell: (info: any) => info?.getValue(),
  },
];

export const contactGroups = [
  {
    groupTitle: 'New Data',
    contacts: '37',
    users: [
      {
        id: '1',
        srcImage:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        id: '1',
        srcImage:
          'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg',
      },
      {
        id: '1',
        srcImage:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
      },
      {
        id: '1',
        srcImage:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        id: '1',
        srcImage:
          'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg',
      },
      {
        id: '1',
        srcImage:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      },
    ],
  },
  {
    groupTitle: 'Lead',
    contacts: '55',
    users: [
      {
        id: '1',
        srcImage:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
      },
      {
        id: '1',
        srcImage:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        id: '1',
        srcImage:
          'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg',
      },
      {
        id: '1',
        srcImage:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      },
    ],
  },
  {
    groupTitle: 'Onboard',
    contacts: '14',
    users: [
      {
        id: '1',
        srcImage:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
      },
      {
        id: '1',
        srcImage:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        id: '1',
        srcImage:
          'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg',
      },
      {
        id: '1',
        srcImage:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      },
    ],
  },
  {
    groupTitle: 'AAC',
    contacts: '23',
    users: [
      {
        id: '1',
        srcImage:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
      },
      {
        id: '1',
        srcImage:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        id: '1',
        srcImage:
          'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg',
      },
      {
        id: '1',
        srcImage:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      },
    ],
  },
];
