import { Box, Checkbox } from '@mui/material';

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

  const activeColumnsData = (attribute: any, info: any) => {
    if (attribute === 'name') {
      return (
        <Box sx={{ cursor: 'pointer' }}>
          {info?.row?.original?.name ?? 'N/A'}
        </Box>
      );
    } else if (attribute === 'deal.amount') {
      return info?.row?.original?.deal.amount ?? 'N/A';
    } else if (attribute === 'status') {
      return info?.row?.original?.status ?? 'N/A';
    } else if (attribute === 'assignTo') {
      return info?.row?.original?.assignTo ?? 'N/A';
    }
    // else if (attribute === 'createdBy') {
    //   return  info?.row?.original?.createdBy ?? 'N/A';

    // }
    //  else if (attribute === 'createdBy.firstName createdBy.lastName') {
    //   const url = info?.row?.original?.createdBy;
    //   return <></>;
    // } else {
    //   return info?.row?.original[attribute] ?? 'N/A';
    // }
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
      />;
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
  // return [
  //   {
  //     accessorFn: (row: any) => row?._id,
  //     id: 'cellCheckbox',
  //     cell: (info: any) => {
  //       return (
  //         <Checkbox
  //           color="primary"
  //           checked={isSelected(info?.cell?.row?.original?._id)}
  //           name={info?.cell?.row?.original?._id}
  //           onClick={() => {
  //             handleRowClick(info?.cell?.row?.original?._id);
  //           }}
  //         />
  //       );
  //     },
  //     header: (info: any) => {
  //       const rows = info?.table?.options?.data;
  //       return (
  //         <Checkbox
  //           color="primary"
  //           indeterminate={
  //             selectedRow?.length > 0 && selectedRow?.length < rows?.length
  //           }
  //           checked={
  //             rows?.length > 0 &&
  //             selectedRow?.length === info?.table?.options?.data?.length
  //           }
  //           onChange={(event) => handleSelectAllClick(event, rows)}
  //         />
  //       );
  //     },
  //     isSortable: false,
  //   },
  //   {
  //     accessorFn: (row: any) => row?.name,
  //     id: 'name',
  //     cell: (info: any) => info?.getValue(),
  //     header: 'Quote Name',
  //     isSortable: true,
  //   },
  //   {
  //     accessorFn: (row: any) => row?.deal,
  //     id: 'deal',
  //     isSortable: true,
  //     header: 'Quote Amount',
  //     cell: (info: any) => {
  //       return <>£{info?.getValue()?.amount}</>;
  //     },
  //   },
  //   {
  //     accessorFn: (row: any) => row?.isSubmitted,
  //     id: 'isSubmitted',
  //     isSortable: true,
  //     header: 'Status',
  //     cell: (info: any) => {
  //       if (info?.getValue()) {
  //         return <Box sx={{ color: 'success.main' }}>Published</Box>;
  //       } else {
  //         return <>Draft</>;
  //       }
  //     },
  //   },
  //   {
  //     accessorFn: (row: any) => row?.deal,
  //     id: 'deal',
  //     isSortable: true,
  //     header: 'Deal Name',
  //     cell: (info: any) => info?.getValue()?.name,
  //   },
  //   {
  //     accessorFn: (row: any) => row?.createdBy,
  //     id: 'createdBy',
  //     isSortable: true,
  //     header: 'Created By',
  //     cell: (info: any) =>
  //       `${info?.getValue()?.firstName} ${info?.getValue()?.lastName}`,
  //   },
  //   {
  //     accessorFn: (row: any) => row?.createdAt,
  //     id: 'createdAt',
  //     isSortable: true,
  //     header: 'Created Date',
  //     cell: (info: any) => dayjs(info?.getValue()).format(DATE_FORMAT?.UI),
  //   },
  //   {
  //     accessorFn: (row: any) => row?.expiryDate,
  //     id: 'expiryDate',
  //     isSortable: true,
  //     header: 'Expiration Date',
  //     cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
  //   },
  // ];
};
