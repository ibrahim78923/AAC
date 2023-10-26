import { EyeIcon } from '@/assets/icons';
import { UserAvatarImage } from '@/assets/images';
import { AntSwitch } from '@/components/ReactHookForm/RHFSwitch';
import { Avatar, Box, Typography } from '@mui/material';
import Image from 'next/image';
import EditBluePen from '@/assets/images/modules/orgAdmin/organization/edit-blue-pen';
import { DeleteDashboardModal } from './DeleteDashboardModal';

export const manageDashboardsDataColumns = (): any => [
  {
    accessorFn: (row: any) => row.dashboardName,
    id: 'dashboardName',
    cell: (info: any) => <span>{info?.getValue()}</span>,
    header: <span>Dashboard Name</span>,
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.default,
    id: 'default',
    isSortable: true,
    header: <span>Default</span>,
    cell: (info: any) => <AntSwitch checked={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row.owner,
    id: 'owner',
    header: <span>Owner</span>,
    isSortable: true,
    cell: (info: any) => (
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <Avatar alt={info.getValue().name} src={'/static/images/avatar/1.jpg'}>
          <Image
            src={info.getValue().src || info.getValue().name}
            alt={info.getValue().name}
            layout="fill"
          />
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body4" color="blue.dull_blue">
            {info.getValue().name}
          </Typography>
          <Typography variant="body3" color="custom.light">
            {info.getValue().email}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row.accessRights,
    id: 'accessRights',
    isSortable: true,
    header: <span>Access Rights</span>,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.lastViewed,
    id: 'lastViewed',
    isSortable: true,
    header: <span>Last Viewed</span>,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.lastUpdated,
    id: 'lastUpdated',
    isSortable: true,
    header: <span>Last Updated</span>,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.actions,
    id: 'actions',
    isSortable: true,
    header: <span>Actions</span>,
    cell: (info: any) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Box sx={{ cursor: 'pointer' }} onClick={() => info.getValue()}>
          <EyeIcon color="#1F305D" />
        </Box>
        <Box sx={{ cursor: 'pointer' }}>
          <EditBluePen color="#FFC20E" />
        </Box>
        <DeleteDashboardModal />
      </Box>
    ),
  },
];

export const dashboardsData: any = [
  {
    actions: 1,
    dashboardName: 'Service_1',
    default: true,
    owner: {
      name: 'Olivia Rhye',
      email: 'olivia@gmail.com',
      src: UserAvatarImage,
    },
    accessRights: 'Everyone',
    lastViewed: '10/04/2023',
    lastUpdated: '10/04/2023',
  },
  {
    actions: 2,
    dashboardName: 'Service_1',
    default: false,
    owner: {
      name: 'Olivia Rhye',
      email: 'olivia@gmail.com',
      src: UserAvatarImage,
    },
    accessRights: 'Everyone',
    lastViewed: '10/04/2023',
    lastUpdated: '10/04/2023',
  },
  {
    actions: 1,
    dashboardName: 'Service_1',
    default: false,
    owner: {
      name: 'Olivia Rhye',
      email: 'olivia@gmail.com',
      src: UserAvatarImage,
    },
    accessRights: 'Everyone',
    lastViewed: '10/04/2023',
    lastUpdated: '10/04/2023',
  },
  {
    actions: 2,
    dashboardName: 'Service_1',
    default: false,
    owner: {
      name: 'Olivia Rhye',
      email: 'olivia@gmail.com',
      src: UserAvatarImage,
    },
    accessRights: 'Everyone',
    lastViewed: '10/04/2023',
    lastUpdated: '10/04/2023',
  },
  {
    actions: 1,
    dashboardName: 'Service_1',
    default: false,
    owner: {
      name: 'Olivia Rhye',
      email: 'olivia@gmail.com',
      src: UserAvatarImage,
    },
    accessRights: 'Everyone',
    lastViewed: '10/04/2023',
    lastUpdated: '10/04/2023',
  },
  {
    actions: 2,
    dashboardName: 'Service_1',
    default: false,
    owner: {
      name: 'Olivia Rhye',
      email: 'olivia@gmail.com',
      src: UserAvatarImage,
    },
    accessRights: 'Everyone',
    lastViewed: '10/04/2023',
    lastUpdated: '10/04/2023',
  },
  {
    actions: 1,
    dashboardName: 'Service_1',
    default: false,
    owner: {
      name: 'Olivia Rhye',
      email: 'olivia@gmail.com',
      src: UserAvatarImage,
    },
    accessRights: 'Everyone',
    lastViewed: '10/04/2023',
    lastUpdated: '10/04/2023',
  },
  {
    actions: 2,
    dashboardName: 'Service_1',
    default: false,
    owner: {
      name: 'Olivia Rhye',
      email: 'olivia@gmail.com',
      src: UserAvatarImage,
    },
    accessRights: 'Everyone',
    lastViewed: '10/04/2023',
    lastUpdated: '10/04/2023',
  },
];
