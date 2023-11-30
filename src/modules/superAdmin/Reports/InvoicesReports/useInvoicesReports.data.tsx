import { Avatar, Box, Typography } from '@mui/material';

import { AvatarImage } from '@/assets/images';
import { styles } from './InVoiceReports.style';

export const usersData: any = [
  {
    Id: 1,
    clientName: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
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
    status: <Box sx={styles.statusButton}>Paid</Box>,
  },
  {
    Id: 2,
    clientName: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
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
    status: <Box sx={styles.statusButton}>Follow up soon</Box>,
  },
  {
    Id: 3,
    clientName: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
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
    status: <Box sx={styles.statusButton}>Follow up soon</Box>,
  },
  {
    Id: 4,
    clientName: (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar alt="Remy Sharp" src={AvatarImage.src} />
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
    status: <Box sx={styles.statusButton}>Paid</Box>,
  },
];

export const usersColumns: any = [
  {
    accessorFn: (row: any) => row.clientName,
    id: 'clientName',
    isSortable: true,
    header: 'Client Name',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.products,
    id: 'products',
    isSortable: true,
    header: 'Products',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.planType,
    id: 'planType',
    isSortable: true,
    header: 'Plan Type',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.planPrice,
    id: 'planPrice',
    isSortable: true,
    header: 'Plan Price',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.details,
    id: 'details',
    isSortable: true,
    header: 'Details',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.dueDate,
    id: 'dueDate',
    isSortable: true,
    header: 'Due Date',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.invoiceAmount,
    id: 'invoiceAmount',
    isSortable: true,
    header: 'Invoice Amount',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => info.getValue(),
  },
];
