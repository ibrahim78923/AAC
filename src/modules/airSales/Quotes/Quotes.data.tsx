import { DATE_TIME_FORMAT, indexNumbers } from '@/constants';
import { quoteStatus } from '@/routesConstants/paths';
import { capitalizeFirstLetters } from '@/utils';
import { Box, Checkbox, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

export const quotesColumns = (
  selectedRow: string[],
  setSelectedRow: (value: string[]) => void,
  setIsActionsDisabled: (value: boolean) => void,
  setRowId: (value: string) => void,
  activeColumns: string[],
) => {
  const router = useRouter();
  const theme = useTheme();

  const handleRowClick = (id: string, status: string) => {
    const selectedIndex = selectedRow?.indexOf(id);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected?.concat(selectedRow, id);
    } else if (selectedIndex === indexNumbers?.ZERO) {
      newSelected = newSelected?.concat(selectedRow?.slice(indexNumbers?.ONE));
    } else if (selectedIndex === selectedRow?.length - indexNumbers?.ONE) {
      newSelected = newSelected?.concat(
        selectedRow?.slice(indexNumbers?.ZERO, -1),
      );
    } else if (selectedIndex > indexNumbers?.ZERO) {
      newSelected = newSelected?.concat(
        selectedRow?.slice(indexNumbers?.ZERO, selectedIndex),
        selectedRow?.slice(selectedIndex + indexNumbers?.ONE),
      );
    }
    setSelectedRow(newSelected);
    setIsActionsDisabled(newSelected?.length === indexNumbers?.ZERO);
    if (newSelected?.length === indexNumbers?.ONE) {
      setRowId(newSelected[indexNumbers?.ZERO]);
    } else {
      setRowId('');
    }
    router.push({
      ...(newSelected?.length > indexNumbers?.ZERO && {
        query: { status: status },
      }),
    });
  };

  // Select All Row
  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    rows: any,
  ) => {
    if (event?.target?.checked) {
      const newSelected = rows?.map((n: any) => n?._id);
      setSelectedRow(newSelected);
      setIsActionsDisabled(false);
      return;
    }
    setSelectedRow([]);
    setIsActionsDisabled(true);
  };

  const isSelected = (id: any) => selectedRow?.indexOf(id) !== -1;

  const DEAL_ATTRIBUTES = {
    DEAL_NAME: 'name',
    DEAL_AMOUNT: 'deal.amount',
    DEAL_STATUS: 'status',
    DEAL_DEAL_NAME: 'deal.name',
    DEAL_CREATED_BY: 'createdBy',
    DEAL_CREATED_AT: 'createdAt',
    DEAL_EXPIRY: 'expiryDate',
  };

  const activeColumnsData = (attribute: string, info: any) => {
    if (attribute === DEAL_ATTRIBUTES?.DEAL_NAME) {
      return (
        <Box
          sx={{
            cursor: 'pointer',
            '&:hover': {
              color: theme?.palette?.primary?.main,
            },
          }}
        >
          {capitalizeFirstLetters(info?.row?.original?.name) ?? 'N/A'}
        </Box>
      );
    } else if (attribute === DEAL_ATTRIBUTES?.DEAL_AMOUNT) {
      return info?.row?.original?.deal?.amount
        ? `£${info?.row?.original?.deal?.amount}`
        : 'N/A';
    } else if (attribute === DEAL_ATTRIBUTES?.DEAL_STATUS) {
      return (
        <Typography
          variant="body4"
          sx={{ textTransform: 'capitalize' }}
          color={
            info?.row?.original?.status === quoteStatus?.draft
              ? theme?.palette?.custom?.main
              : theme?.palette?.success?.main
          }
        >
          {info?.row?.original?.status?.toLowerCase()}
        </Typography>
      );
    } else if (attribute === DEAL_ATTRIBUTES?.DEAL_DEAL_NAME) {
      return capitalizeFirstLetters(info?.row?.original?.deal?.name) ?? 'N/A';
    } else if (attribute?.includes(DEAL_ATTRIBUTES?.DEAL_CREATED_BY)) {
      const name =
        info?.row?.original?.createdBy?.firstName +
        ' ' +
        info?.row?.original?.createdBy?.lastName;
      return capitalizeFirstLetters(name) ?? 'N/A';
    } else if (attribute === DEAL_ATTRIBUTES?.DEAL_CREATED_AT) {
      return (
        dayjs(info?.row?.original?.createdAt)?.format(
          DATE_TIME_FORMAT?.DDMMYYY,
        ) ?? 'N/A'
      );
    } else if (attribute === DEAL_ATTRIBUTES?.DEAL_EXPIRY) {
      return (
        dayjs(info?.row?.original?.expiryDate)?.format(
          DATE_TIME_FORMAT?.DDMMYYY,
        ) ?? 'N/A'
      );
    } else {
      return info?.row?.original[attribute] ?? 'N/A';
    }
  };

  const checkboxColumn = {
    accessorFn: (row: any) => row?._id,
    id: 'Id',
    cell: (info: any) => {
      const checked = info?.cell?.row?.original;
      return (
        <Checkbox
          color="primary"
          checked={isSelected(checked?._id)}
          name={checked?._id}
          onClick={() => {
            handleRowClick(checked?._id, checked?.status);
          }}
        />
      );
    },
    header: (info: any) => {
      const rows = info?.table?.options?.data;
      return (
        <Checkbox
          color="primary"
          indeterminate={
            selectedRow?.length > indexNumbers?.ZERO &&
            selectedRow?.length < rows?.length
          }
          checked={
            rows?.length > indexNumbers?.ZERO &&
            selectedRow?.length === info?.table?.options?.data?.length
          }
          onChange={(event) => handleSelectAllClick(event, rows)}
        />
      );
    },
    isSortable: false,
  };

  const tableActiveColumns =
    activeColumns?.map((col: any) => ({
      accessorFn: (row: any) => row?.attributes,
      id: col?.attributes,
      isSortable: true,
      header: col?.slug,
      cell: (info: any) => activeColumnsData(col?.attributes, info),
    })) || [];

  const columns = [checkboxColumn, ...tableActiveColumns];

  return columns;
};
