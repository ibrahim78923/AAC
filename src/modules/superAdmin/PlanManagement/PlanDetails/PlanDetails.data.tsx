import { Box, Checkbox, Typography } from '@mui/material';

import { avatarGroupMockData } from '../PlanManagement.data';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

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
              tableRowValues?.cell?.row?.original?._id && !isDisabled
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
    {
      accessorFn: (row: any) => row?.planProducts,
      id: 'productsSuite',
      isSortable: true,
      header: 'Products/Suite',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {info?.row?.original?.planProducts?.length > 1 ? (
            <>
              <Typography variant="body3">
                {info?.row?.original?.name}
              </Typography>
              {info?.row?.original?.planProducts?.map((data: any) => (
                <Typography variant="body3" key={uuidv4()}>
                  {data?.name}
                </Typography>
              ))}
            </>
          ) : (
            info?.row?.original?.planProducts?.map((data: any) => (
              <Typography variant="body3" key={uuidv4()}>
                {data?.name}{' '}
              </Typography>
            ))
          )}
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.planType?.name,
      id: 'planType',
      isSortable: true,
      header: 'Plan Type',
      cell: (info: any) => info?.getValue(),
    },
    {
      //Todo: Getting description at index 0
      accessorFn: (row: any) => row?.description,
      id: 'description',
      isSortable: true,
      header: 'Description',
      cell: (info: any) => info?.getValue(),
    },
    {
      //Todo: Getting createdAt at index 0
      accessorFn: (row: any) => dayjs(row?.createdAt)?.format(DATE_FORMAT?.UI),
      id: 'createdAt',
      isSortable: true,
      header: 'Created on',
      cell: (info: any) => info?.getValue(),
    },
    {
      //Todo: Getting status at index 0
      accessorFn: (row: any) => row?.planProducts[0]?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.defaultUsers,
      id: 'defaultUsers',
      isSortable: true,
      header: 'Default Users',
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
      accessorFn: (row: any) => row?.defaultStorage,
      id: 'defaultStorage',
      isSortable: true,
      header: 'Default Storage',
      cell: (info: any) => info?.getValue(),
    },
  ];
};
