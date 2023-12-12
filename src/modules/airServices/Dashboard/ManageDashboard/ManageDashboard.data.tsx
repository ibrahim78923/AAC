import { EditYellowBGPenIcon } from '@/assets/icons';
import { UserAvatarImage } from '@/assets/images';
import { Avatar, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { DeleteDashboardModal } from './DeleteDashboardModal';
import { PreviewDashboardModal } from '../PreviewDashboardItems/PreviewDashboardModal';
import Link from 'next/link';
import { AIR_SERVICES } from '@/constants';
import { AntSwitch } from './ManageDashboard.styles';
import { DASHBOARD } from '@/constants/strings';

export const manageDashboardsDataColumns = [
  {
    accessorFn: (row: any) => row?.dashboardName,
    id: 'dashboardName',
    cell: (info: any) => info?.getValue(),
    header: 'Dashboard Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.default,
    id: 'default',
    isSortable: true,
    header: 'Default',
    cell: (info: any) => <AntSwitch checked={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.owner,
    id: 'owner',
    header: 'Owner',
    isSortable: true,
    cell: (info: any) => (
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <Avatar alt={info?.getValue()?.name}>
          <Image
            src={info?.getValue()?.src || info?.getValue()?.name}
            alt={info?.getValue()?.name}
            layout="fill"
          />
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body4" color="blue.dull_blue">
            {info?.getValue()?.name}
          </Typography>
          <Typography variant="body3" color="custom.light">
            {info?.getValue()?.email}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.accessRights,
    id: 'accessRights',
    isSortable: true,
    header: 'Access Rights',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.lastViewed,
    id: 'lastViewed',
    isSortable: true,
    header: 'Last Viewed',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.lastUpdated,
    id: 'lastUpdated',
    isSortable: true,
    header: 'Last Updated',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Actions',
    cell: () => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <PreviewDashboardModal
          dashboardItems={['Graphical Representation of Tickets by Statuses']}
        />
        <Link
          href={`${AIR_SERVICES?.CREATE_DASHBOARD}?action=${DASHBOARD?.EDIT}`}
        >
          <EditYellowBGPenIcon />
        </Link>
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
];
