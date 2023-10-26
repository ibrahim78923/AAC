import { EditPenBorderedIcon } from '@/assets/icons';
import { Box, useTheme } from '@mui/material';
import { styles } from './ModuleCreation.style';

import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const editModuleValidationSchema = Yup.object().shape({
  moduleId: Yup.string().trim().required('Field is Required'),
  moduleName: Yup.string().trim().required('Field is Required'),
  createdDate: Yup.string().trim().required('Field is Required'),
  createdBy: Yup.string().trim().required('Field is Required'),
});

export const editModuleDefaultValues = {
  moduleId: 'test',
  moduleName: 'test',
  createdDate: 'test',
  createdBy: 'test',
};

export const editSubModuleValidationSchema = Yup.object().shape({
  subModuleId: Yup.string().trim().required('Field is Required'),
  subModuleName: Yup.string().trim().required('Field is Required'),
  createdDate: Yup.string().trim().required('Field is Required'),
  createdBy: Yup.string().trim().required('Field is Required'),
});
export const editSubModuleDefaultValues = {
  subModuleId: 'test',
  subModuleName: 'test',
  createdDate: 'test',
  createdBy: 'test',
};

export const editRightValidationSchema = Yup.object().shape({
  moduleName: Yup.string().trim().required('Field is Required'),
  subModuleName: Yup.string().trim().required('Field is Required'),
  rightName: Yup.string().trim().required('Field is Required'),
  createdDate: Yup.string().trim().required('Field is Required'),
  createdBy: Yup.string().trim().required('Field is Required'),
});
export const editRightDefaultValues = {
  moduleName: 'test',
  subModuleName: 'test',
  rightName: 'test',
  createdDate: 'test',
  createdBy: 'test',
};

export const editModuleDataArray = [
  {
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'createdBy',
      label: 'CreatedBy',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];

// COLUMNS
export const moduleCreationColumns = (
  setSubModuleData: any,
  setIsShowSubModule: any,
  handelModalProperties: any,
) => {
  const theme = useTheme();
  return [
    {
      accessorFn: (row: any) => row.moduleID,
      id: 'moduleID',
      cell: (info: any) => (
        <Box
          sx={styles.tableLink(theme)}
          onClick={() => {
            setSubModuleData(info.row.original.subModule);
            setIsShowSubModule(true);
          }}
        >
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
      id: 'status',
      isSortable: true,
      header: 'Actions',
      cell: (info: any) => (
        <Box
          onClick={() =>
            handelModalProperties({
              modalType: 'module',
              rowData: info.row.original,
            })
          }
        >
          <EditPenBorderedIcon />
        </Box>
      ),
    },
  ];
};
export const subModuleColumns = (
  setRightsData: any,
  setIsShowRights: any,
  handelModalProperties: any,
) => {
  const theme = useTheme();
  return [
    {
      accessorFn: (row: any) => row.subModuleId,
      id: 'subModuleId',
      cell: (info: any) => (
        <Box
          sx={styles.tableLink(theme)}
          onClick={() => {
            setRightsData(info.row.original.rights);
            setIsShowRights(true);
          }}
        >
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
      id: 'status',
      isSortable: true,
      header: 'Actions',
      cell: (info: any) => (
        <Box
          onClick={() =>
            handelModalProperties({
              modalType: 'subModule',
              rowData: info.row.original,
            })
          }
        >
          <EditPenBorderedIcon />
        </Box>
      ),
    },
  ];
};
export const rightsColumns = (handelModalProperties: any) => {
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
      cell: (info: any) => (
        <Box
          onClick={() =>
            handelModalProperties({
              modalType: 'right',
              rowData: info.row.original,
            })
          }
        >
          <EditPenBorderedIcon />
        </Box>
      ),
    },
  ];
};
