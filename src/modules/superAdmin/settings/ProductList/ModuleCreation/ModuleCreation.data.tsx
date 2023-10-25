import { EditPenBorderedIcon } from '@/assets/icons';
import { Box } from '@mui/material';

export const moduleCreationColumns = (setSubModuleData: any) => {
  return [
    {
      accessorFn: (row: any) => row.moduleID,
      id: 'moduleID',
      cell: (info: any) => (
        <Box onClick={() => setSubModuleData(info.row.original.subModule)}>
          {info.getValue()}
        </Box>
      ),
      header: 'Module ID',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.moduleName,
      id: 'moduleName',
      isSortable: true,
      header: 'Module Name',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.createdDate,
      id: 'createdDate',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.createdBy,
      id: 'createdBy',
      isSortable: true,
      header: 'Created By',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.status,
      id: 'status',
      isSortable: true,
      header: 'Actions',
      cell: () => <EditPenBorderedIcon />,
    },
  ];
};
export const subModuleColumns = (setRightsData: any) => {
  return [
    {
      accessorFn: (row: any) => row.subModuleId,
      id: 'subModuleId',
      cell: (info: any) => (
        <Box onClick={() => setRightsData(info.row.original.rights)}>
          {info.getValue()}
        </Box>
      ),
      header: 'Sub Module Id',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.subModuleName,
      id: 'subModuleName',
      isSortable: true,
      header: 'Sub Module Name',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.createdDate,
      id: 'createdDate',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.createdBy,
      id: 'createdBy',
      isSortable: true,
      header: 'Created By',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.status,
      id: 'status',
      isSortable: true,
      header: 'Actions',
      cell: () => <EditPenBorderedIcon />,
    },
  ];
};
export const rightsColumns = () => {
  return [
    {
      accessorFn: (row: any) => row.moduleName,
      id: 'moduleName',
      cell: (info: any) => <Box>{info.getValue()}</Box>,
      header: 'Module Name',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.subModuleName,
      id: 'subModuleName',
      isSortable: true,
      header: 'Sub Module Name',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.rightId,
      id: 'rightId',
      isSortable: true,
      header: 'Right Id',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.rightName,
      id: 'rightName',
      isSortable: true,
      header: 'Right Name',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.createdDate,
      id: 'createdDate',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.createdBy,
      id: 'createdBy',
      isSortable: true,
      header: 'Created By',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.status,
      id: 'status',
      isSortable: true,
      header: 'Actions',
      cell: () => <EditPenBorderedIcon />,
    },
  ];
};
