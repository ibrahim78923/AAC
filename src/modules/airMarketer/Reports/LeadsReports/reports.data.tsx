import { Avatar, Box, Typography, useTheme } from '@mui/material';

import { AvatarImage } from '@/assets/images';

import { styles } from './InVoiceReports.style';

export const usersData = () => {
  const theme = useTheme();
  return [
    {
      Id: 1,
      clientName: (
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Avatar alt="Remy Sharp" src={AvatarImage?.src} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component={'span'}>Olivia Rhyeh</Typography>
            <Typography component={'span'}>@Olivia</Typography>
          </Box>
        </Box>
      ),
      products: 'Air sales',
      planType: 'Basic',
      planPrice: '$ 45',
      details: 'Invoices # 4236346',
      dueDate: 'Mar 04, 2023',
      invoiceAmount: '£ 4521,11',
      status: <Box sx={styles?.statusButton(theme)}>Paid</Box>,
    },
    {
      Id: 2,
      clientName: (
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Avatar alt="Remy Sharp" src={AvatarImage?.src} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component={'span'}>Olivia Rhyeh</Typography>
            <Typography component={'span'}>@Olivia</Typography>
          </Box>
        </Box>
      ),
      products: 'Air sales',
      planType: 'Growth',
      planPrice: '$ 45',
      details: 'Invoices # 4236346',
      dueDate: 'Mar 04, 2023',
      invoiceAmount: '£ 4521,11',
      status: <Box sx={styles?.statusButton(theme)}>Follow up soon</Box>,
    },
    {
      Id: 3,
      clientName: (
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Avatar alt="Remy Sharp" src={AvatarImage?.src} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component={'span'}>Olivia Rhyeh</Typography>
            <Typography component={'span'}>@Olivia</Typography>
          </Box>
        </Box>
      ),
      products: 'Air sales',
      planType: 'Basic',
      planPrice: '$ 45',
      details: 'Invoices # 4236346',
      dueDate: 'Mar 04, 2023',
      invoiceAmount: '£ 4521,11',
      status: <Box sx={styles?.statusButton(theme)}>Follow up soon</Box>,
    },
    {
      Id: 4,
      clientName: (
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Avatar alt="Remy Sharp" src={AvatarImage?.src} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component={'span'}>Olivia Rhyeh</Typography>
            <Typography component={'span'}>@Olivia</Typography>
          </Box>
        </Box>
      ),
      products: 'Air sales',
      planType: 'Growth',
      planPrice: '$ 45',
      details: 'Invoices # 4236346',
      dueDate: 'Mar 04, 2023',
      invoiceAmount: '£ 4521,11',
      status: <Box sx={styles?.statusButton(theme)}>Paid</Box>,
    },
  ];
};

export const usersColumns: any = [
  {
    accessorFn: (row: any) => row?.clientName,
    id: 'clientName',
    isSortable: true,
    header: 'Client Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.products,
    id: 'products',
    isSortable: true,
    header: 'Products',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.planType,
    id: 'planType',
    isSortable: true,
    header: 'Plan Type',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.planPrice,
    id: 'planPrice',
    isSortable: true,
    header: 'Plan Price',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.details,
    id: 'details',
    isSortable: true,
    header: 'Details',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.dueDate,
    id: 'dueDate',
    isSortable: true,
    header: 'Due Date',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.invoiceAmount,
    id: 'invoiceAmount',
    isSortable: true,
    header: 'Invoice Amount',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => info?.getValue(),
  },
];

export const CTAReport = [
  {
    reportView: 'Form Views',
    Values: '68',
  },
  {
    reportView: 'CTA Rate',
    Values: '62%',
  },
  {
    reportView: 'Entrances',
    Values: '68',
  },
  {
    reportView: 'Average Time Per Page View',
    Values: '08%',
  },
  {
    reportView: 'Total Submission',
    Values: '156',
  },
  {
    reportView: 'CTA Clicks',
    Values: '06',
  },
  {
    reportView: 'CTA Views',
    Values: '42',
  },
  {
    reportView: 'Bounce Rate',
    Values: '40%',
  },
];
