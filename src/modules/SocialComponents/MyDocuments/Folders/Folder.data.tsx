import { RHFDropZone, RHFTextField } from '@/components/ReactHookForm';
import { IMG_URL } from '@/config';
import { Box, Checkbox } from '@mui/material';
import Image from 'next/image';

import * as Yup from 'yup';

export const columns: any = (
  setIsGetRowValues: any,
  setIschecked: any,
  ischecked: any,
  isGetRowValues: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: 'id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          checked={isGetRowValues?.includes(info?.row?.original?._id)}
          name={info?.getValue()}
          onClick={() => {
            const isChecked = isGetRowValues?.includes(
              info?.row?.original?._id,
            );
            if (!isChecked) {
              setIsGetRowValues((prev: any) => [
                ...prev,
                info?.row?.original?._id,
              ]);
            } else {
              setIsGetRowValues((prev: any) =>
                prev.filter((id: any) => id !== info?.row?.original?._id),
              );
            }
            setIschecked(!isChecked);
          }}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Image
              src={`${IMG_URL} ${info?.row?.original?.media?.url}`}
              alt="no image"
              width={20}
              height={20}
            />
            {info?.getValue()}
          </Box>
        );
      },
      header: 'Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.sharedLinks,
      id: 'sharedLinks',
      isSortable: true,
      header: 'Shared Links',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.readsCount,
      id: 'readsCount',
      isSortable: true,
      header: 'Reads',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.createdBy,
      id: 'createdBy',
      isSortable: true,
      header: 'Created By',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {info?.row?.original?.createdBy?.firstName}{' '}
          {info?.row?.original?.createdBy?.lastName}
        </Box>
      ),
    },
  ];
};

export const toolTipData = [
  'To track who has viewed this link, make sure Require an email address to view document is enabled. Disabling this option will prevent HubSpot from tracking who is viewing your Document',
];

export const validationSchema: any = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required'),
});

export const defaultValuesFolder = {
  name: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'name',
      label: 'Folder Name',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
];

export const ImageUploadSchema: any = Yup?.object()?.shape({
  file: Yup?.string()?.required('Field is Required'),
});

export const defaultValuesImage = {
  file: '',
};

export const dataArrayImage = [
  {
    componentProps: {
      name: 'file',
      fullWidth: true,
      select: false,
    },
    component: RHFDropZone,
    md: 12,
  },
];
