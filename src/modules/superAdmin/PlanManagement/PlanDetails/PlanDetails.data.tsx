import { Checkbox } from '@mui/material';

import { avatarGroupMockData } from '../PlanManagement.data';

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
    product: avatarGroupMockData,
    planType: 'Growth',
    description: 'Sales files',
    createdOn: '12/10/2023',
    defaultUsers: '08',
    planPrice: '£48',
    status: 'Active',
    defaultStorage: '1 GB',
  },
  {
    id: 2,
    planId: ` #456`,
    product: avatarGroupMockData,
    planType: 'Enterprise',
    description: 'Marketing files',
    createdOn: '12/10/2023',
    defaultUsers: '06',
    planPrice: '£91',
    status: 'Inactive',
    defaultStorage: '4 GB',
  },
  {
    id: 3,
    planId: ` #7899`,
    product: avatarGroupMockData,
    planType: 'Premium',
    description: 'Services files',
    createdOn: '12/10/2023',
    defaultUsers: '09',
    planPrice: '£95',
    status: 'Active',
    defaultStorage: '2 GB',
  },
];

export const PlanDetailsDataColumnFunction: any = (
  isDisabled: boolean,
  setIsDisabled: (value: boolean) => void,
  tableRowValues: any,
  setTableRowValues: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.id,
      id: 'id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          checked={
            info?.cell?.row?.original?._id ===
              tableRowValues?.cell?.row?.original?._id && isDisabled
          }
          name={info.getValue()}
          onClick={() => {
            setTableRowValues(info), setIsDisabled(!isDisabled);
          }}
        />
      ),
      header: <Checkbox color="primary" name="id" />,
      isSortable: false,
    },
    // {
    //   accessorFn: (row: any) => row.planId,
    //   id: 'planId',
    //   cell: (info: any) => (
    //     <Box display={'flex'} gap={1} flexWrap={'wrap'} alignItems={'center'}>
    //       <Image src={AvatarImage} alt="Avatar" />
    //       <div
    //         style={{
    //           color: theme?.palette?.primary?.main,
    //           cursor: 'pointer',
    //         }}
    //         onClick={() => {
    //           router.push({
    //             pathname: `#`,
    //             query: {
    //               id: info?.getValue(),
    //             },
    //           });
    //         }}
    //       >
    //         {info?.getValue()}
    //       </div>
    //     </Box>
    //   ),
    //   header: 'Plan ID',
    //   isSortable: false,
    // },
    // {
    //   accessorFn: (row: any) => row?.product,
    //   id: 'product',
    //   isSortable: true,
    //   header: 'Product/Suite',
    //   cell: (info: any) => (
    //     <Box margin={'auto'}>
    //       <AppAvatarGroup data={info?.getValue()} />
    //     </Box>
    //   ),
    // },
    // {
    //   accessorFn: (row: any) => row?.planType,
    //   id: 'planType',
    //   isSortable: true,
    //   header: 'Plan Type',
    //   cell: (info: any) => (
    //     <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={1}>
    //       <Image src={AvatarImage} alt="Avatar" />
    //       <div style={{ color: theme?.palette?.primary?.main }}>
    //         {info?.getValue()}
    //       </div>
    //     </Box>
    //   ),
    // },
    {
      accessorFn: (row: any) => row?.description,
      id: 'description',
      isSortable: true,
      header: 'Created On',
      cell: (info: any) => info?.getValue(),
    },
    // {
    //   accessorFn: (row: any) => row?.createdOn,
    //   id: 'createdOn',
    //   isSortable: true,
    //   header: 'Default Users',
    //   cell: (info: any) => info?.getValue(),
    // },
    // {
    //   accessorFn: (row: any) => row?.planPrice,
    //   id: 'planPrice',
    //   isSortable: true,
    //   header: 'Plan Price',
    //   cell: (info: any) => info?.getValue(),
    // },
    // {
    //   accessorFn: (row: any) => row?.status,
    //   id: 'status',
    //   isSortable: true,
    //   header: 'Status',
    //   cell: (info: any) => info?.getValue(),
    // },
    {
      accessorFn: (row: any) => row?.defaultStorage,
      id: 'defaultStorage',
      isSortable: true,
      header: 'Default Storage',
      cell: (info: any) => info?.getValue(),
    },
  ];
};
