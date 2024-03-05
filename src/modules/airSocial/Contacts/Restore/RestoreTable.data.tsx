import { IMG_URL } from '@/config';
import { DATE_FORMAT } from '@/constants';
import { Avatar, Box, Checkbox } from '@mui/material';
import dayjs from 'dayjs';

export const restoreTableColumns: any = (
  selectedRow: any,
  setSelectedRow: any,
  setIsActionsDisabled: (value: boolean) => void,
  setRowId: any,
) => {
  const handleRowClick = (id: any) => {
    const selectedIndex = selectedRow?.indexOf(id);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRow, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRow.slice(1));
    } else if (selectedIndex === selectedRow.length - 1) {
      newSelected = newSelected.concat(selectedRow.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRow.slice(0, selectedIndex),
        selectedRow.slice(selectedIndex + 1),
      );
    }
    setSelectedRow(newSelected);
    setIsActionsDisabled(newSelected.length === 0);
    if (newSelected.length === 1) {
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
  return [
    {
      accessorFn: (row: any) => row._id,
      id: '_id',
      cell: (info: any) => {
        return (
          <Checkbox
            color="primary"
            checked={isSelected(info?.cell?.row?.original?._id)}
            name={info?.cell?.row?.original?._id}
            onClick={() => {
              handleRowClick(info?.cell?.row?.original?._id);
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
    },
    {
      accessorFn: (row: any) => ({
        firstName: row?.firstName,
        lastName: row?.lastName,
        profilePicture: row?.profilePicture,
        email: row?.email,
      }),
      id: 'contact',
      isSortable: true,
      header: 'Contact',
      cell: (info: any) => {
        const firstName = info.getValue()?.firstName;
        const lastName = info.getValue()?.lastName;
        const imgUrl = info.getValue()?.profilePicture?.url;
        const email = info.getValue()?.email;
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                textTransform: 'uppercase',
                mr: '6px',
                fontSize: '14px',
              }}
              alt={info?.getValue()}
              src={`${IMG_URL}${imgUrl}`}
            >
              {firstName?.charAt(0)}
              {lastName?.charAt(0)}
            </Avatar>
            <Box>
              <Box sx={{ color: 'blue.dull_blue' }}>
                {firstName} {lastName}
              </Box>
              <Box sx={{ fontSize: '12px' }}>{email}</Box>
            </Box>
          </Box>
        );
      },
    },

    {
      accessorFn: (row: any) => row?.deletedBy,
      id: 'deletedby',
      isSortable: true,
      header: 'Deleted By',
      cell: (info: any) => {
        const firstName = info.getValue()?.firstName;
        const lastName = info.getValue()?.lastName;
        const imgUrl = info.getValue()?.profilePicture?.url;

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                textTransform: 'uppercase',
                mr: '6px',
                fontSize: '14px',
              }}
              alt={info?.getValue()}
              src={`${IMG_URL}${imgUrl}`}
            >
              {`${firstName?.charAt(0)}${lastName?.charAt(0)}`}
            </Avatar>
            <Box>
              <Box sx={{ color: 'blue.dull_blue' }}>
                {firstName} {lastName}
              </Box>
            </Box>
          </Box>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.deletedAt,
      id: 'deletedAt',
      isSortable: true,
      header: 'Time Deleted',
      cell: (info: any) => dayjs(info?.getValue()).format(DATE_FORMAT?.UI),
    },
  ];
};
