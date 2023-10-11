import { AvatarImage } from '@/assets/images';
import { Box, Checkbox } from '@mui/material';
import Image from 'next/image';

export const TABLE_CONSTANTS = {
  CUSTOMIZE_COLUMN: 'customize-column',
  FILTER_DATA: 'filter-data',
  BULK_UPDATE_DATA: 'bulk-update-data',
  CREATE_NEW_TICKET: 'create-new-ticket',
};

export const PlanDetailsData: any = [
  {
    id: 1,
    planId: ` #123`,
    ticketName: 'Drafts',
    planType: 'Growth',
    description: 'Sales files',
    createdOn: '12/10/2023',
    defaultUsers: '08',
    planPrice: 'Sharemydine',
    status: 'Active',
    defaultStorage: '1 GB',
  },
  {
    id: 2,
    planId: ` #456`,
    ticketName: 'rafts',
    planType: 'Enterprise',
    description: 'Marketing files',
    createdOn: '12/10/2023',
    defaultUsers: '06',
    planPrice: 'Sharemydine',
    status: 'Inactive',
    defaultStorage: '4 GB',
  },
  {
    id: 3,
    planId: ` #7899`,
    ticketName: 'fts',
    planType: 'Premium',
    description: 'Services files',
    createdOn: '12/10/2023',
    defaultUsers: '09',
    planPrice: 'Sharemydine',
    status: 'Active',
    defaultStorage: '2 GB',
  },
];

export const PlanDetailsDataColumnFunction: any = (theme: any, router: any) => {
  return [
    {
      accessorFn: (row: any) => row.id,
      id: 'id',
      cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
      header: <Checkbox color="primary" name="id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.planId,
      id: 'planId',
      cell: (info: any) => (
        <Box display={'flex'} gap={1} flexWrap={'wrap'} alignItems={'center'}>
          <Image src={AvatarImage} alt="Avatar" />
          <div
            style={{
              color: theme.palette.primary.main,
              cursor: 'pointer',
            }}
            onClick={() => {
              router.push({
                // pathname: `${router.pathname}/detail`,
                pathname: `#`,
                query: {
                  id: info.getValue(),
                },
              });
            }}
          >
            {info.getValue()}
          </div>
        </Box>
      ),
      header: 'Plan ID',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.ticketName,
      id: 'ticketName',
      isSortable: true,
      header: 'Product/Suite',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.planType,
      id: 'planType',
      isSortable: true,
      header: 'Plan Type',
      cell: (info: any) => (
        <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={1}>
          <Image src={AvatarImage} alt="Avatar" />
          <div style={{ color: theme.palette.primary.main }}>
            {info.getValue()}
          </div>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row.description,
      id: 'description',
      isSortable: true,
      header: 'Created On',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.createdOn,
      id: 'createdOn',
      isSortable: true,
      header: 'Default Users',
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
      accessorFn: (row: any) => row.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.defaultStorage,
      id: 'defaultStorage',
      isSortable: true,
      header: 'Default Storage',
      cell: (info: any) => info.getValue(),
    },
  ];
};
