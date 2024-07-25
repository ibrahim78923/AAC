import { SwitchBtn } from '@/components/SwitchButton';
import { DATE_FORMAT } from '@/constants';
import { capitalizeFirstLetters } from '@/utils';
import { Checkbox } from '@mui/material';
import dayjs from 'dayjs';

export const columns = ({
  selectedCheckboxes,
  setSelectedCheckboxes,
  handleUserSwitchChange,
  data,
}: any) => {
  const handleSelectProductById = (checked: boolean, id: string): void => {
    if (checked) {
      setSelectedCheckboxes([...selectedCheckboxes, id]);
    } else {
      setSelectedCheckboxes(
        selectedCheckboxes?.filter((_id: any) => _id !== id),
      );
    }
  };

  const handleSelectAllproducts = (checked: boolean): void => {
    setSelectedCheckboxes(
      checked ? data?.data?.salesproducts?.map(({ _id }: any) => _id) : [],
    );
  };

  return [
    {
      accessorFn: (row: any) => row?._id,
      id: 'Id',
      cell: ({ row: { original } }: any) => (
        <Checkbox
          checked={selectedCheckboxes?.includes(original?._id)}
          onChange={({ target }) => {
            handleSelectProductById(target.checked, original?._id);
          }}
        />
      ),
      header: (
        <Checkbox
          onChange={({ target }) => {
            handleSelectAllproducts(target.checked);
          }}
          checked={
            data?.data?.salesproducts?.length &&
            selectedCheckboxes?.length === data?.data?.salesproducts?.length
          }
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => capitalizeFirstLetters(info?.getValue()),
      header: 'Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.sku,
      id: 'SKU',
      isSortable: true,
      header: 'SKU',
      cell: (info: any) => (info?.getValue() === '' ? 'N/A' : info?.getValue()),
    },
    {
      accessorFn: (row: any) => row?.unitPrice,
      id: 'unitPrice',
      isSortable: true,
      header: 'Unit Price',
      cell: (info: any) => `${info?.getValue()} £`,
    },
    {
      accessorFn: (row: any) => row?.purchasePrice,
      id: 'purchasePrice',
      isSortable: true,
      header: 'Purchase Price',
      cell: (info: any) => `${info?.getValue()} £`,
    },
    {
      accessorFn: (row: any) => row?.createdBy,
      id: 'createdBy',
      isSortable: true,
      header: 'Created By',
      cell: (info: any) => {
        const firstName = capitalizeFirstLetters(info?.getValue()?.firstName);
        const lastName = capitalizeFirstLetters(info?.getValue()?.lastName);
        return firstName && lastName ? ` ${firstName} ${lastName}` : 'N/A';
      },
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: any) => row?.isActive,
      id: 'action',
      isSortable: true,
      header: 'Action',
      cell: (info: any) => (
        <SwitchBtn
          defaultChecked={info?.row?.original?.isActive === true ? true : false}
          handleSwitchChange={(e: any) =>
            handleUserSwitchChange(e, info?.row?.original?._id)
          }
        />
      ),
    },
  ];
};
