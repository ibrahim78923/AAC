import { SOCIAL_COMPONENTS } from '@/constants';
import { Box, Checkbox } from '@mui/material';
import { useRouter } from 'next/router';

export const companyTabs: any = ['All Companies', 'My Companies'];

export const columns: any = () => {
  const navigate = useRouter();
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
      cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
    },
    {
      accessorFn: (row: any) => row?.owner,
      id: 'owner',
      header: 'Company Owner',
      isSortable: true,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      header: 'Company Name',
      isSortable: true,
      cell: (info: any) => (
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            navigate?.push(SOCIAL_COMPONENTS?.VIEW_COMPANY_DETAILS);
          }}
        >
          {info?.getValue()}
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.createdDate,
      id: 'createdDate',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.domainName,
      id: 'domainName',
      isSortable: true,
      header: 'Domain Name',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.crn,
      id: 'crn',
      isSortable: true,
      header: 'CRN',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'phoneNumber',
      isSortable: true,
      header: 'Phone Number',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.industry,
      id: 'industry',
      isSortable: true,
      header: 'Industry',
      cell: (info: any) => info?.getValue(),
    },
  ];
};
