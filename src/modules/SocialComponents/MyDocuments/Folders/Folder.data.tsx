import { RHFDropZone, RHFTextField } from '@/components/ReactHookForm';
import { generateImage } from '@/utils/avatarUtils';
import { Box, Checkbox } from '@mui/material';
import Image from 'next/image';
import * as Yup from 'yup';
import { RowI } from './Folder.interface';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';

export const columns: any = (
  setIsGetRowValues: React.Dispatch<React.SetStateAction<string[]>>,
  setIschecked: React.Dispatch<React.SetStateAction<boolean>>,
  ischecked: boolean,
  isGetRowValues: string[],
) => {
  return [
    {
      accessorFn: (row: RowI) => row?._id,
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
      accessorFn: (row: RowI) => row?.name,
      id: 'name',
      cell: (info: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Image
              src={generateImage(info?.row?.original?.media?.url)}
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
      accessorFn: (row: RowI) => row?.sharedLinks,
      id: 'sharedLinks',
      isSortable: true,
      header: 'Shared Links',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: RowI) => row?.readsCount,
      id: 'readsCount',
      isSortable: true,
      header: 'Reads',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: RowI) => row?.createdBy,
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

export const validationSchema = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    name: Yup?.string()?.required('Field is Required'),
    ...formSchema,
  });
};

export const defaultValuesFolder = (data?: any, form?: any) => {
  const initialValues: any = dynamicFormInitialValue(data, form);

  return {
    name: data?.name ?? '',
    ...initialValues,
  };
};

export const dataArray = [
  {
    componentProps: {
      name: 'name',
      label: 'Folder Name',
      fullWidth: true,
      select: false,
      placeholder: 'Enter name',
      required: true,
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
      required: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];
