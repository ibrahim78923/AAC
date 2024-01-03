import Link from 'next/link';

import { Checkbox } from '@mui/material';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { AIR_SOCIAL } from '@/routesConstants/paths';

export const ContactsColumns = (
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
      accessorFn: (row: any) => `${row?.firstName} ${row?.lastName}`,
      id: 'firstName',
      header: 'Contacts',
      isSortable: true,
      cell: (info: any) => {
        const contactInfo: any = {
          address: info?.row?.original?.address,
          firsName: info?.row?.original?.firstName,
        };
        return (
          <Link
            href={{
              pathname: `${AIR_SOCIAL?.CONTACTS}`,
              query: { data: contactInfo },
            }}
            as={`${AIR_SOCIAL?.CONTACTS}`}
          >
            {info?.getValue()}
          </Link>
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
