import { Avatar, Box, Checkbox, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import React from 'react';
import { AvatarImage } from '@/assets/images';
import { useRouter } from 'next/router';
import { AIR_SALES } from '@/routesConstants/paths';
import { IMG_URL } from '@/config';
// import useDealTab from '../useDealTab';

export const AllDealColumns = ({
  selectedRows,
  handleSelectSingleCheckBox,
  handleSelectAllCheckbox,
  isAllSelected,
  activeColumns, // allDealsData,
}: {
  selectedRows: string[];
  handleSelectSingleCheckBox: (checked: boolean, id: string) => void;
  handleSelectAllCheckbox: (event: any) => void;
  isAllSelected: boolean;
  activeColumns: any;
}) => {
  const theme = useTheme();
  const DEAL_ATTRIBUTES = {
    DEAL_OWNER: 'dealOwner',
    DEAL_NAME: 'name',
    DEAL_CLOSEDATE: 'closeDate',
    DEAL_CREATEDAT: 'createdAt',
  };
  const activeColumnsData = (attribute: any, info: any) => {
    const navigate = useRouter();
    if (attribute?.includes(DEAL_ATTRIBUTES?.DEAL_OWNER)) {
      return (
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Avatar
            alt="user"
            sx={{ background: theme?.palette?.custom?.dim_grey }}
            src={
              info?.row?.original?.dealOwner?.avatar?.url
                ? IMG_URL + info?.row?.original?.dealOwner?.avatar?.url
                : AvatarImage?.src
            }
          >
            {info?.row?.original?.dealOwner?.name?.charAt(0) ?? '-'}
          </Avatar>
          <Box>
            <Typography component="p" variant="body3" fontWeight={500}>
              {info?.row?.original?.dealOwner?.name ?? 'N/A'}
            </Typography>
            <Typography component="p" variant="body3">
              {info?.row?.original?.dealOwner?.email ?? 'N/A'}
            </Typography>
          </Box>
        </Box>
      );
    } else if (attribute === DEAL_ATTRIBUTES?.DEAL_NAME) {
      return (
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            navigate?.push({
              pathname: AIR_SALES?.VIEW_DETAILS,
              query: { id: info?.row?.original?._id },
            });
          }}
        >
          <Typography
            variant="body3"
            sx={{
              color: theme?.palette?.primary?.main,
              fontWeight: 500,
            }}
          >
            {info?.row?.original?.name ?? 'N/A'}
          </Typography>
        </Box>
      );
    } else if (attribute === DEAL_ATTRIBUTES?.DEAL_CLOSEDATE) {
      return (
        dayjs(info?.row?.original?.closeDate)?.format(DATE_FORMAT?.UI) ?? 'N/A'
      );
    } else if (attribute === DEAL_ATTRIBUTES?.DEAL_CREATEDAT) {
      return (
        dayjs(info?.row?.original?.createdAt)?.format(DATE_FORMAT?.UI) ?? 'N/A'
      );
    } else {
      return info?.row?.original[attribute] ?? 'N/A';
    }
  };

  const checkboxColumn = {
    accessorFn: (row: any) => row?._id,
    id: 'Id',
    cell: ({ row: { original } }: any) => (
      <Checkbox
        checked={selectedRows?.includes(original?._id)}
        onChange={({ target }) => {
          handleSelectSingleCheckBox(target?.checked, original?._id);
        }}
      />
    ),
    header: (
      <Checkbox
        onChange={({ target }) => {
          handleSelectAllCheckbox(target?.checked);
        }}
        checked={isAllSelected}
      />
    ),
    isSortable: false,
  };

  const tableActiveColumns: any =
    activeColumns?.map((item: any) => ({
      accessorFn: (row: any) => row?.attributes,
      id: item?.attributes,
      isSortable: true,
      header: item?.slug,
      cell: (info: any) => activeColumnsData(item?.attributes, info),
    })) || [];
  const columns = [checkboxColumn, ...tableActiveColumns];
  return columns;
};
