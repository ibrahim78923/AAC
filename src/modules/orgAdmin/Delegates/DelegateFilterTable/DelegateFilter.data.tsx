import Image from 'next/image';
import { Avatar, AvatarGroup, Box, Typography, useTheme } from '@mui/material';
import { CompanyLogoImage, ViewEyeImage } from '@/assets/images';
import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { capitalizeFirstLetter } from '@/utils/api';

export const columns: any = (
  setInProgress: any,
  setStatus: any,
  setIsComplete: any,
) => {
  const theme = useTheme();
  return [
    {
      accessorFn: (row: any) => row,
      id: 'delegatesMember',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar
            alt="missing"
            sx={{
              color: theme?.palette?.grey[500],
              fontSize: '14px',
              fontWeight: '400',
            }}
          >
            {capitalizeFirstLetter(info?.row?.original?.firstName?.charAt(0))}
            {capitalizeFirstLetter(info?.row?.original?.lastName?.charAt(0))}
          </Avatar>
          <Box sx={{ display: 'grid', justifyItems: 'start' }}>
            <Typography
              variant="body3"
              sx={{ fontWeight: 500, color: '#374151' }}
            >
              {capitalizeFirstLetter(info?.row?.original?.firstName)}{' '}
              {capitalizeFirstLetter(info?.row?.original?.lastName)}
            </Typography>
            <Typography
              variant="body3"
              sx={{ fontWeight: 400, color: '#667085' }}
            >
              {info?.row?.original?.email}
            </Typography>
          </Box>
        </Box>
      ),
      header: 'Delegates Member',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'phoneNumber',
      isSortable: true,
      header: 'Phone Number',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.products,
      id: 'products',
      isSortable: true,
      header: 'Products',
      cell: (
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <AvatarGroup max={4}>
            <Avatar
              alt="Remy Sharp"
              src={CompanyLogoImage.src}
              sx={{ width: '25px', height: '25px' }}
            />
            <Avatar
              alt="Travis Howard"
              src={CompanyLogoImage.src}
              sx={{ width: '25px', height: '25px' }}
            />
            <Avatar
              alt="Cindy Baker"
              src={CompanyLogoImage.src}
              sx={{ width: '25px', height: '25px' }}
            />
            <Avatar
              alt="Agnes Walker"
              src={CompanyLogoImage.src}
              sx={{ width: '25px', height: '25px' }}
            />
            <Avatar
              alt="Trevor Henderson"
              src={CompanyLogoImage.src}
              sx={{ width: '25px', height: '25px' }}
            />
          </AvatarGroup>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.delegateOrganization?.name,
      id: 'organizationName',
      isSortable: true,
      header: 'Organization Name',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'signUpDate',
      isSortable: true,
      header: 'Sign Up Date',
      cell: (info: any) => dayjs(info?.getValue()).format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: any) => row?.earnedAmount,
      id: 'earnedAmount',
      isSortable: true,
      header: 'Earned Amount',
      cell: (info: any) => (info?.getValue() ? `£ ${info?.getValue()}` : 'N/A'),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.action,
      id: 'action',
      isSortable: true,
      cell: (info: any) => (
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setInProgress(true);
            setIsComplete(true);
            setStatus(info?.row?.original?.status);
          }}
        >
          <Image src={ViewEyeImage} alt="no image" />
        </Box>
      ),
      header: 'Action',
    },
  ];
};

export const dataArray = [
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
    },
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'fromDate',
      label: 'From Date',
      fullWidth: true,
      select: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'fromDate',
      label: 'To Date',
      fullWidth: true,
      select: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
];
