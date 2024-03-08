import { DATE_FORMAT } from '@/constants';
import { Checkbox, Switch } from '@mui/material';
import dayjs from 'dayjs';

export const columns = ({ handleCheckboxChange, selectedCheckboxes }: any) => {
  return [
    {
      accessorFn: (row: any) => row?.id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          name="name"
          onChange={(event) => handleCheckboxChange(event, info?.row?.original)}
          checked={selectedCheckboxes?.some(
            (selectedItem: any) =>
              selectedItem?._id === info?.row?.original?._id,
          )}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => info?.getValue(),
      header: 'Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.sku,
      id: 'SKU',
      isSortable: true,
      header: 'SKU',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.unitPrice,
      id: 'unitPrice',
      isSortable: true,
      header: 'Unit Price',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.purchasePrice,
      id: 'purchasePrice',
      isSortable: true,
      header: 'Purchase Price',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.createdBy,
      id: 'createdBy',
      isSortable: true,
      header: 'Created By',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: any) => row?.action,
      id: 'action',
      isSortable: true,
      header: 'Action',
      cell: (info: any) => <Switch defaultChecked name={info?.getValue()} />,
    },
  ];
};
