import { RHFSelect, RHFSwitchableDatepicker } from '@/components/ReactHookForm';
import { DATE_FORMAT } from '@/constants';
import { Checkbox } from '@mui/material';
import dayjs from 'dayjs';

export const quickLinksFilterFiltersDataArray = (selectProductOptions: any) => [
  {
    componentProps: {
      name: 'createdAt',
      label: 'Created Date',
      fullWidth: true,
    },
    component: RHFSwitchableDatepicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'productId',
      label: 'Select Product',
      select: true,
    },
    options: selectProductOptions,
    component: RHFSelect,
    md: 12,
  },
];

export const columns: any = (
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
            checked={rows?.length > 0 && selectedRow?.length === rows?.length}
            onChange={(event) => handleSelectAllClick(event, rows)}
            disabled={rows?.length === 0}
          />
        );
      },
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.productName,
      id: 'productName',
      cell: (info: any) => info.getValue(),
      header: 'Product',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.parent,
      id: 'parent',
      isSortable: true,
      header: 'Module/Sub Module Name',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created at',
      cell: (info: any) => dayjs(info.getValue()).format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: any) => row.url,
      id: 'url',
      isSortable: true,
      header: 'URL',
      cell: (info: any) => info.getValue(),
    },
  ];
};

export const productsData = [
  {
    _id: '6541cbb46e917be584ed1a31',
    productName: 'Air Operations',
    type: 'PRODUCT',
    data: [
      {
        _id: '660a574f90c9586706ad742e',
        moduleSlug: 'crete-marketing-workflow',
        productId: '6541cbb46e917be584ed1a31',
        type: 'PRODUCT',
        parent: 'workflow',
        createdAt: '2024-04-01T06:42:23.617Z',
        isActive: true,
        isDeleted: false,
        updatedAt: '2024-04-01T07:39:31.684Z',
        url: 'test/test',
        updatedBy: '65eadeb8dd744bd3a7f8660a',
        productName: 'Air Operations',
      },
    ],
  },
  {
    _id: '6553145fe330587844cbc672',
    productName: 'Air Sales',
    type: 'PRODUCT',
    data: [
      {
        _id: '660a547190c9586706a89ad5',
        type: 'PRODUCT',
        parent: 'Quotes',
        moduleSlug: 'view-quotes',
        productId: '6553145fe330587844cbc672',
        createdAt: '2024-04-01T06:30:09.525Z',
        isActive: true,
        isDeleted: false,
        updatedAt: '2024-04-01T06:30:09.525Z',
        url: '/quotes/view-quotes',
        productName: 'Air Sales',
      },
    ],
  },
  {
    _id: '6553147be330587844cbc675',
    productName: 'Air Marketer',
    type: 'PRODUCT',
    data: [
      {
        _id: '660a55a490c9586706aaaf14',
        type: 'PRODUCT',
        moduleSlug: 'create-campaign',
        parent: 'campaign',
        productId: '6553147be330587844cbc675',
        createdAt: '2024-04-01T06:35:16.599Z',
        isActive: true,
        isDeleted: false,
        updatedAt: '2024-04-01T06:35:16.599Z',
        url: '/campaign/create-campaign',
        productName: 'Air Marketer',
      },
    ],
  },
];
export const nonProductData = [
  {
    _id: 'ORG_ADMIN',
    productName: 'ORG_ADMIN',
    type: 'ORG_ADMIN',
    data: [
      {
        _id: '660a5a6790c9586706b2ec3c',
        type: 'ORG_ADMIN',
        moduleSlug: 'dashboard',
        parent: 'dashboard',
        productId: null,
        createdAt: '2024-04-01T06:55:35.634Z',
        isActive: true,
        isDeleted: false,
        updatedAt: '2024-04-01T06:55:35.634Z',
        url: '/dashboard/dashboard',
      },
    ],
  },
  {
    _id: 'SUPER_ADMIN',
    productName: 'SUPER_ADMIN',
    type: 'SUPER_ADMIN',
    data: [
      {
        _id: '660a59e390c9586706b214fb',
        type: 'SUPER_ADMIN',
        moduleSlug: 'dashboard',
        productId: null,
        parent: 'dashboard',
        createdAt: '2024-04-01T06:53:23.077Z',
        isActive: true,
        isDeleted: false,
        updatedAt: '2024-04-01T06:53:23.077Z',
        url: '/dashboard/dashboard',
      },
    ],
  },
];
