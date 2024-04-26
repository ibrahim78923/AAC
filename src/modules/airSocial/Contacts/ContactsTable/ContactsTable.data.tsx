import { useRouter } from 'next/router';
import { Avatar, Box, Checkbox } from '@mui/material';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { AIR_SOCIAL } from '@/routesConstants/paths';
import { IMG_URL } from '@/config';

export const ContactsColumns = (
  selectedRow: any,
  setSelectedRow: any,
  setIsActionsDisabled: (value: boolean) => void,
  setRowId: any,
) => {
  const router = useRouter();
  const handleRowClick = (id: any) => {
    const selectedIndex = selectedRow?.indexOf(id);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected?.concat(selectedRow, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected?.concat(selectedRow.slice(1));
    } else if (selectedIndex === selectedRow?.length - 1) {
      newSelected = newSelected?.concat(selectedRow.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected?.concat(
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
            disabled={rows?.length === 0}
          />
        );
      },
      isSortable: false,
    },
    {
      accessorFn: (row: any) => `${row?.firstName} ${row?.lastName}`,
      id: 'firstName',
      header: 'Contacts',
      isSortable: true,
      cell: (info: any) => {
        const firstName = info?.cell?.row?.original?.firstName
          ? info?.cell?.row?.original?.firstName
          : '';
        const lastName = info?.cell?.row?.original?.lastName
          ? info?.cell?.row?.original?.lastName
          : '';
        const fullName = `${firstName} ${lastName}`;
        const contactId = info?.row?.original?._id;
        const imgAlt = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;
        const imgUrl = info?.cell?.row?.original?.profilePicture?.url;
        const email = info?.cell?.row?.original?.email;
        return (
          <Box
            onClick={() => router.push(`${AIR_SOCIAL?.CONTACTS}/${contactId}`)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                textTransform: 'uppercase',
                fontSize: '14px',
                mr: '6px',
              }}
              alt={info?.getValue()}
              src={`${IMG_URL}${imgUrl}`}
            >
              {imgAlt}
            </Avatar>
            <Box>
              {firstName === '' && lastName === '' ? (
                <></>
              ) : (
                <Box sx={{ color: 'blue.dull_blue' }}>{fullName}</Box>
              )}

              <Box sx={{ fontSize: '12px' }}>{email}</Box>
            </Box>
          </Box>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.email,
      id: 'email',
      isSortable: true,
      header: 'Email',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.address,
      id: 'address',
      isSortable: true,
      header: 'Address',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) =>
        dayjs(row?.dateOfBirth)?.format(DATE_FORMAT?.UI),
      id: 'dateOfBirth',
      isSortable: true,
      header: 'Date of Birth',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'phoneNumber',
      isSortable: true,
      header: 'Phone Number',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.whatsAppNumber,
      id: 'whatsAppNumber',
      isSortable: true,
      header: 'WhatsApp Number',
      cell: (info: any) => info?.getValue(),
    },
  ];
};
