import { Avatar, Box, Checkbox, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import React from 'react';
import { AvatarImage } from '@/assets/images';
import { useRouter } from 'next/router';
import { AIR_SALES } from '@/routesConstants/paths';
// import useDealTab from '../useDealTab';

export const AllDealColumns = ({
  selectedRows,
  handleSelectSingleCheckBox,
  handleSelectAllCheckbox,
  isAllSelected,
  activeColumns,
  // allDealsData,
}: {
  selectedRows: string[];
  handleSelectSingleCheckBox: (checked: boolean, id: string) => void;
  handleSelectAllCheckbox: (event: any) => void;
  isAllSelected: boolean;
  activeColumns: any;
}) => {
  // const { activeColumns } = useDealTab();

  const theme = useTheme();
  const activeColumnsData = (attribute: any, info: any) => {
    const navigate = useRouter();
    if (attribute === 'dealOwner.name') {
      return (
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Avatar alt="Remy Sharp" src={AvatarImage?.src} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component={'span'} variant="body3" fontWeight={500}>
              {info?.row?.original?.dealOwner?.name ?? 'N/A'}
            </Typography>
            <Typography component={'span'} variant="body3">
              {info?.row?.original?.dealOwner?.email ?? 'N/A'}
            </Typography>
          </Box>
        </Box>
      );
    } else if (attribute === 'name') {
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
    } else if (attribute === 'createdAt') {
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
        // checked={
        //   isAllSelected?.data?.companies?.length &&
        //   checkedRows?.length === companiesData?.data?.companies?.length
        // }
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

  // return [
  //   {
  //     accessorFn: (row: any) => row?._id,
  //     id: 'Id',
  //     cell: ({ row: { original } }: any) => (
  //       <Checkbox
  //         checked={selectedRows?.includes(original?._id)}
  //         onChange={({ target }) => {
  //           handleSelectSingleCheckBox(target?.checked, original?._id);
  //         }}
  //       />
  //     ),
  //     header: (
  //       <Checkbox onChange={handleSelectAllCheckbox} checked={isAllSelected} />
  //     ),
  //     isSortable: false,
  //   },

  //   {
  //     accessorFn: (row: any) => row?.dealOwner,
  //     id: 'name',
  //     isSortable: true,
  //     header: 'Deal Owner',
  //     cell: (info: any) => (
  //       <Box sx={{ display: 'flex', gap: '5px' }}>
  //         <Avatar
  //           alt="Remy Sharp"
  //           // src={}
  //         />
  //         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
  //           <Typography
  //             variant="body4"
  //             sx={{ color: theme?.palette?.blue?.dull_blue }}
  //           >
  //             {info?.row?.original?.dealOwner?.name}
  //           </Typography>
  //           <Typography
  //             variant="body3"
  //             sx={{ color: theme?.palette?.custom?.light, fontWeight: 400 }}
  //           >
  //             {info?.row?.original?.dealOwner?.email
  //               ? info?.row?.original?.dealOwner?.email
  //               : 'N/A'}
  //           </Typography>
  //         </Box>
  //       </Box>
  //     ),
  //   },
  //   {
  //     accessorFn: (row: any) => row?.name,
  //     id: 'name',
  //     isSortable: true,
  //     header: 'Deal Name',
  //     cell: (info: any) => info?.getValue() ?? 'N/A',
  //   },
  //   {
  //     accessorFn: (row: any) => row?.closeDate,
  //     id: 'closeDate',
  //     isSortable: true,
  //     header: 'Close Date',
  //     cell: ({ getValue }: any) =>
  //       dayjs(getValue())?.format(DATE_FORMAT?.UI) ?? 'N/A',
  //   },
  //   {
  //     accessorFn: (row: any) => row?.amount,
  //     id: 'amount',
  //     isSortable: true,
  //     header: 'Amount',
  //     cell: (info: any) => info?.getValue() ?? 'N/A',
  //   },
  //   {
  //     accessorFn: (row: any) => row?.dealStage,
  //     id: 'dealStage',
  //     isSortable: true,
  //     header: 'Deal Stage',
  //     cell: (info: any) => info?.getValue() ?? 'N/A',
  //   },
  //   {
  //     accessorFn: (row: any) => row?.dealPipeline,
  //     id: 'dealPipeline',
  //     isSortable: true,
  //     header: 'Deal Pipeline',
  //     cell: (info: any) => info?.getValue() ?? 'N/A',
  //   },
  // ];
};
