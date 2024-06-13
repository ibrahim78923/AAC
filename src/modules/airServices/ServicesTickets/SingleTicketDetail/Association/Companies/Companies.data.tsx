import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import {
  fullName,
  fullNameInitial,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';
import { Avatar, Box, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import * as Yup from 'yup';

export const optionsIndustry = [
  'Aerospace & Defense',
  'Agriculture & Farming',
  'Apparel & Fashion',
  'Architecture & Planning',
  'Automotive',
  'Banking',
  'Biotechnology',
  'Broadcast Media',
  'Building Materials',
  'Chemicals',
  'Commercial Real Estate',
  'Computer Hardware',
  'Computer Software',
  'Construction',
  'Consumer Electronics',
  'Consumer Goods',
  'Cosmetics',
  'Dairy',
  'Education Management',
  'E-Learning',
  'Electrical & Electronic Manufacturing',
  'Entertainment',
  'Environmental Services',
  'Events Services',
  'Facilities Services',
  'Financial Services',
  'Food & Beverages',
  'Furniture',
  'Gambling & Casinos',
  'Government Administration',
  'Health, Wellness & Fitness',
  'Higher Education',
  'Hospital & Health Care',
  'Hospitality',
  'Human Resources',
  'Information Technology & Services',
  'Insurance',
  'Investment Management',
  'Legal Services',
  'Logistics & Supply Chain',
  'Luxury Goods & Jewelry',
  'Machinery',
  'Management Consulting',
  'Market Research',
  'Marketing & Advertising',
  'Media Production',
  'Medical Devices',
  'Mining & Metals',
  'Nonprofit Organization Management',
  'Oil & Energy',
];

export const optionsType = ['Partner', 'Vendor'];

export const TYPE_VALUES = {
  NEW_COMPANY: 'newCompany',
  EXISTING_COMPANY: 'existingCompany',
};

export const validationSchema: any = Yup?.object()?.shape({
  domain: Yup?.string()?.trim()?.required('Domain is required'),
  name: Yup?.string()?.trim(),
  profilePicture: Yup?.mixed()?.nullable(),
  ownerId: Yup?.mixed()?.nullable()?.required('Owner is required'),
  description: Yup?.string()?.trim(),
  industry: Yup?.string(),
  type: Yup?.string(),
  city: Yup?.string()?.trim(),
  postalCode: Yup?.string()?.trim(),
  address: Yup?.string()?.trim(),
  noOfEmloyee: Yup?.number()?.nullable()?.typeError('Must be a number'),
  totalRevenue: Yup?.number()?.nullable()?.typeError('Must be a number'),
  linkedInUrl: Yup?.string()?.trim(),
});

export const defaultValues = {
  domain: '',
  name: '',
  profilePicture: null,
  ownerId: null,
  description: '',
  industry: '',
  type: '',
  city: '',
  postalCode: '',
  address: '',
  noOfEmloyee: null,
  totalRevenue: null,
  linkedInUrl: '',
};

export const getAssociateCompanyColumns: any = ({ theme, setModalId }: any) => {
  return [
    {
      accessorFn: (row: any) => row,
      id: 'name',
      header: 'Companies Name',
      isSortable: true,
      cell: (info: any) => (
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <Avatar
            sx={{ bgcolor: theme?.palette?.blue?.main, width: 28, height: 28 }}
            src={generateImage(info?.getValue()?.profilePicture?.url)}
          >
            <Typography variant="body2" textTransform={'uppercase'}>
              {fullNameInitial(info?.getValue()?.name)}
            </Typography>
          </Avatar>
          <Box display={'flex'} flexDirection={'column'}>
            <Typography variant="body2">
              {fullName(info?.getValue()?.name)}
            </Typography>
            {truncateText(info?.getValue()?.domain)}
          </Box>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.owner?.phoneNumber,
      id: 'owner.phoneNumber',
      isSortable: true,
      header: 'Phone Number',
      cell: (info: any) => info?.getValue() ?? '---',
    },
    {
      accessorFn: (row: any) => row?.owner,
      id: 'owner.name',
      isSortable: true,
      header: 'Company Owner',
      cell: (info: any) => (
        <Typography variant="body2">
          {fullName(info?.getValue()?.firstName, info?.getValue()?.lastName)}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?._id,
      id: 'Action',
      cell: (info: any) => {
        return (
          <Box display={'flex'} gap={1}>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_TICKETS_TICKETS_DETAILS?.VIEW_COMPANIES_DETAILS,
              ]}
            >
              <VisibilityRoundedIcon
                color={'secondary'}
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  setModalId({
                    view: true,
                    delete: false,
                    id: info?.getValue(),
                  })
                }
              />
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_TICKETS_TICKETS_DETAILS?.DELETE_COMPANIES,
              ]}
            >
              <CancelIcon
                color={'error'}
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  setModalId({
                    view: false,
                    delete: true,
                    id: info?.getValue(),
                  })
                }
              />
            </PermissionsGuard>
          </Box>
        );
      },
    },
  ];
};
