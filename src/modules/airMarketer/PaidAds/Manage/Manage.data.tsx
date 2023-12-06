import { SwitchBtn } from '@/components/SwitchButton';
import { LinkedIn, Pause } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { style } from './Manage.style';

export const manageStatusData = [
  { title: 'Impressions', count: 1, divider: true },
  { title: 'Clicks', count: 5, divider: true },
  { title: 'Contacts', count: 2, divider: true },
  { title: 'Deals', count: 3, divider: false },
];

export const manageAccountData = [
  { title: 'Amount Spent', count: '£0', divider: true },
  { title: 'ROI', count: 0, divider: false },
];

//table data
export const manageTableColumns: any = (statusBtnValue: any, theme: any) => {
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      header: 'Name',
      isSortable: true,
      cell: (info: any) => (
        <Stack direction="row" gap={2} alignItems="center">
          <LinkedIn sx={{ height: '32px', width: '32px', fill: '#0a66c2' }} />
          <Box>
            <Typography>Azeem Aslam</Typography>
            <Box
              sx={style?.statusBtn(theme)}
              bgcolor={statusBtnValue(info?.getValue())}
              display="flex"
              gap={0.5}
              alignItems="center"
            >
              {info.getValue() === 'active' ? (
                <Box className="dot" />
              ) : (
                <Pause className="pauseIcon" />
              )}
              <Typography fontSize="10px">{info?.getValue()}</Typography>
            </Box>
          </Box>
          <SwitchBtn />
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.accountName,
      id: 'accountName',
      header: 'Account Name',
      isSortable: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.type,
      id: 'type',
      header: 'Type',
      isSortable: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.impressions,
      id: 'impressions',
      header: 'Impressions',
      isSortable: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.clicks,
      id: 'clicks',
      header: 'Clicks',
      isSortable: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.contacts,
      id: 'contacts',
      header: 'Total Contacts',
      isSortable: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.customers,
      id: 'customers',
      header: 'Customers',
      isSortable: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.costPerContact,
      id: 'costPerContact',
      header: 'Cost Per Contact',
      isSortable: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.ammount,
      id: 'ammount',
      header: 'Ammount',
      isSortable: true,
      cell: (info: any) => info.getValue(),
    },
  ];
};

export const manageTableData = [
  {
    name: 'active',
    accountName: "Mat's Ad Account",
    type: 'Engagement Ad',
    impressions: '0',
    clicks: '0',
    contacts: '0',
    customers: '0',
    costPerContact: ' £ 0',
    ammount: ' £ 0',
  },
  {
    name: 'active',
    accountName: "Mat's Ad Account",
    type: 'Engagement Ad',
    impressions: '0',
    clicks: '0',
    contacts: '0',
    customers: '0',
    costPerContact: ' £ 0',
    ammount: ' £ 0',
  },
  {
    name: 'pending',
    accountName: "Mat's Ad Account",
    type: 'Engagement Ad',
    impressions: '0',
    clicks: '0',
    contacts: '0',
    customers: '0',
    costPerContact: ' £ 0',
    ammount: ' £ 0',
  },
  {
    name: 'active',
    accountName: "Mat's Ad Account",
    type: 'Engagement Ad',
    impressions: '0',
    clicks: '0',
    contacts: '0',
    customers: '0',
    costPerContact: ' £ 0',
    ammount: ' £ 0',
  },
  {
    name: 'pending',
    accountName: "Mat's Ad Account",
    type: 'Engagement Ad',
    impressions: '0',
    clicks: '0',
    contacts: '0',
    customers: '0',
    costPerContact: ' £ 0',
    ammount: ' £ 0',
  },
];
