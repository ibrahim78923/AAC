import { AvatarImage } from '@/assets/images';
import { Avatar, Box, Typography } from '@mui/material';
import { RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const responsesvalidationSchema = Yup?.object()?.shape({
  Name: Yup?.string(),
  Email: Yup?.string(),
  Contact: Yup?.string(),
  Address: Yup?.string(),
  Comment: Yup?.string(),
});

export const responsesdefaultValues = {
  Name: 'Olivia Rhye ',
  Email: 'Saqib.Shah@Ceative.Co.Uk ',
  Contact: '+44 345455445',
  Address: 'Address',
  Comment: 'Comment',
};

export const responsesData = () => {
  return [
    {
      componentProps: {
        name: 'Name',
        label: 'Name',
        fullWidth: true,
        disabled: true,
      },

      component: RHFTextField,

      md: 12,
    },
    {
      componentProps: {
        name: 'Email',
        label: 'Email',
        fullWidth: true,
        disabled: true,
      },

      component: RHFTextField,

      md: 12,
    },

    {
      componentProps: {
        name: 'Contact',
        label: 'Contact',
        fullWidth: true,
        disabled: true,
      },

      component: RHFTextField,

      md: 12,
    },
    {
      componentProps: {
        name: 'Address',
        label: 'Address',
        fullWidth: true,
        disabled: true,
      },

      component: RHFTextField,

      md: 12,
    },
    {
      componentProps: {
        name: 'Comment',
        label: 'Comment',
        fullWidth: true,
        disabled: true,
      },

      component: RHFTextField,

      md: 12,
    },
  ];
};

export const columns: any = (setIsOpenDrawer: any) => {
  return [
    {
      accessorFn: (row: any) => row?.Name,
      id: 'Name',
      header: 'Name',
      isSortable: true,
      cell: (info: any) => (
        <Box
          sx={{
            display: 'flex',
            gap: '5px',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setIsOpenDrawer(true)}
        >
          <Avatar alt="Remy Sharp" src={AvatarImage?.src} />
          <Typography variant="body4" sx={{ color: '#111827' }}>
            {info?.getValue()}{' '}
          </Typography>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.Email,
      id: 'Email',
      isSortable: true,
      header: 'Email',
      cell: (info: any) => (
        <Typography variant="body4" sx={{ color: '#6B7280' }}>
          {info?.getValue()}{' '}
        </Typography>
      ),
    },
  ];
};
