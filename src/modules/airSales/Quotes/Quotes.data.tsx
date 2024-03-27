import { DATE_FORMAT } from '@/constants';
import { Box, Checkbox } from '@mui/material';
import dayjs from 'dayjs';

export const quotesColumns = (
  selectedRow: any,
  setSelectedRow: any,
  setIsActionsDisabled: (value: boolean) => void,
  setRowId: any,
  activeColumns: any,
) => {
  const handleRowClick = (id: any) => {
    const selectedIndex = selectedRow?.indexOf(id);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected?.concat(selectedRow, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected?.concat(selectedRow?.slice(1));
    } else if (selectedIndex === selectedRow?.length - 1) {
      newSelected = newSelected?.concat(selectedRow?.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected?.concat(
        selectedRow?.slice(0, selectedIndex),
        selectedRow?.slice(selectedIndex + 1),
      );
    }
    setSelectedRow(newSelected);
    setIsActionsDisabled(newSelected?.length === 0);
    if (newSelected?.length === 1) {
      setRowId(newSelected[0]);
    } else {
      setRowId(null);
    }
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

  const DEAL_AMOUNT_ATTRIBUTE = 'deal.amount';
  const DEAL_NAME_ATTRIBUTE = 'name';
  const DEAL_STATUS_ATTRIBUTE = 'status';
  const DEAL_DEAL_NAME_ATTRIBUTE = 'deal.name';
  const DEAL_CREATEDBY_ATTRIBUTE = 'createdBy';
  const DEAL_CREATEDAT_ATTRIBUTE = 'createdAt';
  const DEAL_EXPIRY_ATTRIBUTE = 'expiryDate';

  const activeColumnsData = (attribute: any, info: any) => {
    if (attribute === DEAL_NAME_ATTRIBUTE) {
      return (
        <Box sx={{ cursor: 'pointer' }}>
          {info?.row?.original?.name ?? 'N/A'}
        </Box>
      );
    } else if (attribute === DEAL_AMOUNT_ATTRIBUTE) {
      return info?.row?.original?.deal.amount ?? 'N/A';
    } else if (attribute === DEAL_STATUS_ATTRIBUTE) {
      return info?.row?.original?.status ?? 'N/A';
    } else if (attribute === DEAL_DEAL_NAME_ATTRIBUTE) {
      return info?.row?.original?.deal?.name ?? 'N/A';
    } else if (attribute?.includes(DEAL_CREATEDBY_ATTRIBUTE)) {
      const name =
        info?.row?.original?.createdBy?.firstName +
        ' ' +
        info?.row?.original?.createdBy?.lastName;
      return name ?? 'N/A';
    } else if (attribute === DEAL_CREATEDAT_ATTRIBUTE) {
      return (
        dayjs(info?.row?.original?.createdAt)?.format(DATE_FORMAT?.API) ?? 'N/A'
      );
    } else if (attribute === DEAL_EXPIRY_ATTRIBUTE) {
      return (
        dayjs(info?.row?.original?.expiryDate)?.format(DATE_FORMAT?.API) ??
        'N/A'
      );
    } else {
      return info?.row?.original[attribute] ?? 'N/A';
    }
  };

  const checkboxColumn = {
    accessorFn: (row: any) => row?._id,
    id: 'Id',
    cell: (info: any) => (
      <Checkbox
        color="primary"
        checked={isSelected(info?.cell?.row?.original?._id)}
        name={info?.cell?.row?.original?._id}
        onClick={() => {
          handleRowClick(info?.cell?.row?.original?._id);
        }}
      />
    ),
    header: (info: any) => {
      const rows = info?.table?.options?.data;
      return (
        <Checkbox
          color="primary"
          indeterminate={
            selectedRow?.length > 0 && selectedRow?.length < rows?.length
          }
          checked={
            rows?.length > 0 &&
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
