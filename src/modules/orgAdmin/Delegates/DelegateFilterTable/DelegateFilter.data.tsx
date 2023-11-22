import Image from 'next/image';

import { Avatar, AvatarGroup, Box } from '@mui/material';

import { CompanyLogoImage, ViewEyeImage } from '@/assets/images';

import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';

export const columns = (
  setInProgress: any,
  setStatus: any,
  setIsComplete: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.delegatesMember,
      id: 'delegatesMember',
      cell: (info: any) => info?.getValue(),
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
      accessorFn: (row: any) => row?.organizationName,
      id: 'organizationName',
      isSortable: true,
      header: 'Organization Name',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.signUpDate,
      id: 'signUpDate',
      isSortable: true,
      header: 'Sign Up Date',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.earnedAmount,
      id: 'earnedAmount',
      isSortable: true,
      header: 'Earned Amount',
      cell: (info: any) => info?.getValue(),
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
