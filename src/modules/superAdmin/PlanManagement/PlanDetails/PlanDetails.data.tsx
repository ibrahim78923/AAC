import { Box, Checkbox, Theme, Tooltip, Typography } from '@mui/material';

import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { PlanProduct, TableColumn, TableRow } from './planDetails.interface';
import { capitalizeFirstLetter } from '@/utils/api';
import { isNullOrEmpty } from '@/utils';

export const TABLE_CONSTANTS = {
  CUSTOMIZE_COLUMN: 'customize-column',
  FILTER_DATA: 'filter-data',
  BULK_UPDATE_DATA: 'bulk-update-data',
  CREATE_NEW_TICKET: 'create-new-ticket',
};

export const PlanDetailsDataColumnFunction = (
  isDisabled: boolean,
  setIsDisabled: (value: boolean) => void,
  tableRowValues: TableRow,
  setTableRowValues: (row: any) => void,
  theme: Theme,
): TableColumn[] => {
  return [
    {
      accessorFn: (row: TableRow) => row?.id,
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
      header: '',
      isSortable: false,
    },
    {
      accessorFn: (row: TableRow) => row?.planProducts,
      id: 'productsSuite',
      isSortable: true,
      header: 'Products/Suite',
      cell: (info: any) => {
        const planProducts = info?.row?.original?.planProducts;
        const tooltipTitle = (
          <Box>
            {planProducts?.map((data: PlanProduct) => (
              <Typography key={uuidv4()} variant="h6">
                {data?.name}
              </Typography>
            ))}
          </Box>
        );
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {info?.row?.original?.planProducts?.length > 1 ? (
              <>
                <Tooltip title={tooltipTitle}>
                  <Typography variant="body2" sx={{ cursor: 'pointer' }}>
                    {' '}
                    {isNullOrEmpty(info?.row?.original?.name)
                      ? 'N/A'
                      : capitalizeFirstLetter(info?.row?.original?.name)}
                  </Typography>
                </Tooltip>
              </>
            ) : isNullOrEmpty(info?.row?.original?.planProducts) ? (
              <Typography variant="body3">N/A</Typography>
            ) : (
              info?.row?.original?.planProducts?.map((data: PlanProduct) => (
                <Typography variant="body3" key={uuidv4()}>
                  {capitalizeFirstLetter(data?.name)}{' '}
                </Typography>
              ))
            )}
          </Box>
        );
      },
    },
    {
      accessorFn: (row: TableRow) => row?.planType?.name,
      id: 'planType',
      isSortable: true,
      header: 'Plan Type',
      cell: (info: any) => info?.getValue(),
    },
    {
      //Todo: Getting description at index 0
      accessorFn: (row: TableRow) => row?.description,
      id: 'description',
      isSortable: true,
      header: 'Description',
      cell: (info: any) => capitalizeFirstLetter(info?.getValue()),
    },
    {
      //Todo: Getting createdAt at index 0
      accessorFn: (row: TableRow) =>
        dayjs(row?.createdAt)?.format(DATE_FORMAT?.UI),
      id: 'createdAt',
      isSortable: true,
      header: 'Created on',
      cell: (info: any) => info?.getValue(),
    },
    {
      //Todo: Getting status at index 0
      accessorFn: (row: TableRow) => row?.isActive,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => {
        const planProducts = info?.row?.original?.isActive;
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{
                borderRadius: '25px',
                padding: '2px 7px',
                textAlign: 'center',
                background: `${
                  planProducts
                    ? theme?.palette?.custom?.active_bg
                    : theme?.palette?.custom?.inactive_bg
                }`,
              }}
              variant="body3"
              key={uuidv4()}
            >
              {planProducts ? 'Active' : 'InActive'}
            </Typography>
          </Box>
        );
      },
    },
    {
      accessorFn: (row: TableRow) => row?.defaultUsers,
      id: 'defaultUsers',
      isSortable: true,
      header: 'Default Users',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: TableRow) => row?.planPrice,
      id: 'planPrice',
      isSortable: true,
      header: 'Plan Price (£)',
      cell: (info: any) => {
        return `£ ${info?.getValue()}`;
      },
    },
    {
      accessorFn: (row: TableRow) => row?.defaultStorage,
      id: 'defaultStorage',
      isSortable: true,
      header: 'Default Storage',
      cell: (info: any) => {
        return `${info?.getValue()} GB`;
      },
    },
  ];
};
