import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
import { AIR_MARKETER_LEAD_CAPTURE_PERMISSIONS } from '@/constants/permission-keys';
import RowSelection from '@/components/RowSelection';
import RowSelectionAll from '@/components/RowSelectionAll';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

export const columns = (
  selectedRow: any,
  setSelectedRow: any,
  handleDrawerOpen: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      isSortable: false,
      header: (info: any) => {
        const rows = info?.table?.options?.data;
        return (
          <RowSelectionAll
            rows={rows}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            disabled={rows?.length === 0}
          />
        );
      },
      cell: (info: any) => {
        const id = info?.cell?.row?.original?._id;
        return (
          <RowSelection
            id={id}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
          />
        );
      },
    },

    {
      accessorFn: (row: any) => row?.ctaInternalName,
      id: 'ctaInternalName',
      isSortable: false,
      header: 'Name',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.viewCount,
      id: 'viewCount',
      isSortable: true,
      header: 'View Count',
      cell: (info: any) =>
        info?.getValue() < 10 ? `0${info?.getValue()}` : info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.clickRate,
      id: 'clickRate',
      isSortable: true,
      header: 'Click Rate(%)',
      cell: (info: any) => `${info?.getValue()}%`,
    },

    {
      accessorFn: (row: any) => row?.clickCount,
      id: 'clickCount',
      isSortable: true,
      header: 'Clicks Count',
      cell: (info: any) =>
        info?.getValue() < 10 ? `0${info?.getValue()}` : info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.updatedAt,
      id: 'updatedAt',
      isSortable: true,
      header: 'Last Modified',
      cell: (info: any) => dayjs(info?.getValue()).format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: any) => row?.assignedTo,
      id: 'assignedTo',
      isSortable: false,
      header: 'Actions',
      cell: () => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <PermissionsGuard
            permissions={[AIR_MARKETER_LEAD_CAPTURE_PERMISSIONS?.PREVIEW]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => handleDrawerOpen('View')}
            >
              <ViewEyeIcon />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_MARKETER_LEAD_CAPTURE_PERMISSIONS?.EDIT]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => handleDrawerOpen('Edit')}
            >
              <EditPenIcon />
            </Box>
          </PermissionsGuard>

          <PermissionsGuard
            permissions={[AIR_MARKETER_LEAD_CAPTURE_PERMISSIONS?.DELETE]}
          >
            <Box sx={{ cursor: 'pointer' }}>
              <DeleteCrossIcon />
            </Box>
          </PermissionsGuard>
        </Box>
      ),
    },
  ];
};

export const exportData = [
  {
    value: 'CSV',
    label: 'CSV',
  },
  {
    value: 'XLS',
    label: 'XLS',
  },
  {
    value: 'PDF',
    label: 'PDF',
  },
];

// Todo: Temporay data will be removed afterapi integration
export const ctAdata = [
  {
    name: 'Files 2',
    viewCount: '00',
    clickRate: '0%',
    clickCount: '00',
    lastModified: 'Mar 3 - Mar 26, 2022',
  },
];

export const CTA_FORM = {
  CUSTOMIZED_BUTTON: 'Customized_Button',
  IMAGE_BUTTON: 'Image_Button',
};

export const FORM_STEP = {
  CUSTOM_ACTION: 'custom-action',
  CTA_INTERNAL: 'cta-internal',
  IMAGE_ACTION: 'image-action',
  IMAGE_CTA_INTERNAL: 'custom-action',
};

export const drawerOkText: any = {
  Add: 'Add',
  Edit: 'Edit',
  Next: 'Next',
};
