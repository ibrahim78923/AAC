import React from 'react';
import { Avatar, Box, Checkbox, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { useRouter } from 'next/router';
import { AIR_SALES } from '@/routesConstants/paths';
import { generateImage } from '@/utils/avatarUtils';
import { capitalizeFirstLetter } from '@/utils/api';

export const AllDealColumns = ({
  selectedRows,
  handleSelectSingleCheckBox,
  handleSelectAllCheckbox,
  isAllSelected,
  activeColumns,
}: {
  selectedRows: string[];
  handleSelectSingleCheckBox: (checked: boolean, id: string) => void;
  handleSelectAllCheckbox: (event: any) => void;
  isAllSelected: boolean;
  activeColumns: any;
}) => {
  const theme = useTheme();
  const router = useRouter();
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <>
            <Avatar
              alt="user"
              src={generateImage(info?.row?.original?.dealOwner?.avatar?.url)}
              sx={{
                width: 35,
                height: 35,
                background: theme?.palette?.grey[400],
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: theme?.palette?.custom?.dim_grey,
                }}
              >
                {capitalizeFirstLetter(
                  info?.row?.original?.dealOwner?.name?.charAt(0),
                ) ?? ''}
              </Typography>
            </Avatar>
          </>
          <Box>
            <Typography component="p" variant="body3" fontWeight={500}>
              {capitalizeFirstLetter(info?.row?.original?.dealOwner?.name) ??
                'N/A'}
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
            {capitalizeFirstLetter(info?.row?.original?.name) ?? 'N/A'}
          </Typography>
        </Box>
      );
    } else if (attribute === DEAL_ATTRIBUTES?.DEAL_CLOSEDATE) {
      const closeDate = info?.row?.original?.closeDate;
      const formattedDate =
        closeDate !== null && closeDate !== undefined
          ? dayjs(closeDate).format(DATE_FORMAT?.UI)
          : 'N/A';
      return formattedDate;
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
          router.push(`?dealOwnerId=${original?.dealOwner?._id}`);
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
    activeColumns?.map((item: any, index: number) => ({
      accessorFn: (row: any) => row?.attributes,
      id: item?.attributes,
      isSortable: true,
      header: item?.slug,
      cell: (info: any) => activeColumnsData(item?.attributes, info),
      key: `column-${index}`,
    })) || [];
  const columns = [checkboxColumn, ...tableActiveColumns];
  return columns;
};
