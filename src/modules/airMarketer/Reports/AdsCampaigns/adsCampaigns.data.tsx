import { Avatar, AvatarGroup, Box, Typography } from '@mui/material';
import { FacebookRounded, LinkedIn } from '@mui/icons-material';

import { AvatarImage } from '@/assets/images';
import { GoogleDriveIcon } from '@/assets/icons';

export const CampaignsCradsData = [
  {
    reportView: 'Impressions',
    Values: '4k',
  },
  {
    reportView: 'Amount Spend',
    Values: '£ 20',
  },
  {
    reportView: 'Clicks',
    Values: '93',
  },
  {
    reportView: 'ROI',
    Values: '50%',
  },
];

export const usersData: any = [
  {
    Id: 1,
    campaignsName: (
      <Box display="flex" alignItems="center">
        <FacebookRounded style={{ color: '#1877F2' }} />
        <Typography
          sx={{ fontSize: '12px', fontWeight: 500, color: '#111827', ml: 1 }}
        >
          Facebook ad
        </Typography>
      </Box>
    ),
    accountName: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage?.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
    ROI: '34%',
    revenue: '£ 34',
    Products: (
      <AvatarGroup max={4} sx={{ display: 'flex', justifyContent: 'start' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Avatar alt="Travis Howard" src={AvatarImage.src} />
        <Avatar alt="Cindy Baker" src={AvatarImage.src} />
      </AvatarGroup>
    ),
    Impressions: '200',
    Clicks: '30',
    costPerContact: '£ 34.43',
    amountSpend: '£44.4',
  },
  {
    Id: 2,
    campaignsName: (
      <Box display="flex" alignItems="center">
        <LinkedIn style={{ color: '#1877F2' }} />
        <Typography
          sx={{ fontSize: '12px', fontWeight: 500, color: '#111827', ml: 1 }}
        >
          Linkedin
        </Typography>
      </Box>
    ),
    accountName: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
    ROI: '34%',
    revenue: '£ 34',
    Products: (
      <AvatarGroup max={4} sx={{ display: 'flex', justifyContent: 'start' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Avatar alt="Travis Howard" src={AvatarImage.src} />
        <Avatar alt="Cindy Baker" src={AvatarImage.src} />
      </AvatarGroup>
    ),
    Impressions: '200',
    Clicks: '30',
    costPerContact: '£ 34.43',
    amountSpend: '£44.4',
  },
  {
    Id: 3,
    campaignsName: (
      <Box display="flex" alignItems="center">
        <GoogleDriveIcon />
        <Typography
          sx={{ fontSize: '12px', fontWeight: 500, color: '#111827', ml: 1 }}
        >
          Facebook ad
        </Typography>
      </Box>
    ),
    accountName: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>Olivia Rhyeh</Typography>
          <Typography component={'span'}>@Olivia</Typography>
        </Box>
      </Box>
    ),
    ROI: '34%',
    revenue: '£ 34',
    Products: (
      <AvatarGroup max={4} sx={{ display: 'flex', justifyContent: 'start' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
        <Avatar alt="Travis Howard" src={AvatarImage.src} />
        <Avatar alt="Cindy Baker" src={AvatarImage.src} />
      </AvatarGroup>
    ),
    Impressions: '200',
    Clicks: '30',
    costPerContact: '£ 34.43',
    amountSpend: '£44.4',
  },
];

export const usersColumns: any = [
  {
    accessorFn: (row: any) => row?.campaignsName,
    id: 'campaignsName',
    cell: (info: any) => info?.getValue(),
    header: 'Campaigns Name',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.accountName,
    id: 'accountName',
    isSortable: true,
    header: 'Account Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.ROI,
    id: 'ROI',
    isSortable: true,
    header: 'ROI',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.Revenue,
    id: 'Revenue',
    isSortable: true,
    header: 'Revenue',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.Impressions,
    id: 'Impressions',
    isSortable: true,
    header: 'Impressions',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.Clicks,
    id: 'Clicks',
    isSortable: true,
    header: 'Clicks',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.costPerContact,
    id: 'costPerContact',
    isSortable: true,
    header: 'Cost per contact',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.amountSpend,
    id: 'amountSpend',
    isSortable: true,
    header: 'Amount Spend',
    cell: (info: any) => info?.getValue(),
  },
];
