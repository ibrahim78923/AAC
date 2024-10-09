import {
  RHFAutocompleteAsync,
  RHFDropZone,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { generateImage } from '@/utils/avatarUtils';
import { Box } from '@mui/material';
import Image from 'next/image';
import * as Yup from 'yup';
import { RowI } from './Folder.interface';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import RowSelectionAll from '@/components/RowSelectionAll';
import RowSelection from '@/components/RowSelection';
import { VISIBLETO_OPTIONS } from '../Documents/Documents.data';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

export const columns: any = (selectedRow: any, setSelectedRow: any) => {
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
      accessorFn: (row: RowI) => row?.name,
      id: 'name',
      cell: (info: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {info?.row?.original?.media?.mimetype?.includes('image') ? (
              <Image
                src={generateImage(info?.row?.original?.media?.url) ?? ''}
                alt={info?.getValue()}
                width={20}
                height={20}
              />
            ) : (
              <DescriptionOutlinedIcon />
            )}

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

export const uploadDocumentValidationSchema = (visibleTo: string) =>
  Yup?.object()?.shape({
    file: Yup?.mixed()?.nullable()?.required('Field is Required'),
    visibleTo: Yup?.string()?.required('Field is Required'),
    userIds:
      visibleTo === VISIBLETO_OPTIONS?.USERS
        ? Yup.array()
            .min(1, 'At least one user must be selected')
            .required('Field is Required')
        : Yup.array().ensure(),
    teamIds:
      visibleTo === VISIBLETO_OPTIONS?.TEAMS
        ? Yup.array()
            .min(1, 'At least one user must be selected')
            .required('Field is Required')
        : Yup.array().ensure(),
  });

export const uploadDocumentDefaultValues = {
  file: null,
  visibleTo: VISIBLETO_OPTIONS?.EVERYONE,
  userIds: [],
  teamIds: [],
};

export const uploadDocumentData = (
  watchVisibleTo: any,
  orgUsersData: any,
  orgId: string,
  orgTeamsData: any,
) => [
  {
    componentProps: {
      name: 'file',
      fullWidth: true,
      required: true,
      fileType: 'PNG, JPG, and PDF  (max 2.44 MB)',
      accept: {
        'image/png': ['.png', '.PNG'],
        'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG'],
        'application/pdf': ['.pdf'],
      },
    },
    component: RHFDropZone,
    md: 12,
  },
  {
    componentProps: {
      name: 'visibleTo',
      label: 'Shared with',
      fullWidth: true,
      defaultValue: 'EVERYONE',
      options: [
        { value: VISIBLETO_OPTIONS?.PRIVATE, label: 'Private' },
        { value: VISIBLETO_OPTIONS?.USERS, label: 'Specific users' },
        { value: VISIBLETO_OPTIONS?.TEAMS, label: 'My teams' },
        { value: VISIBLETO_OPTIONS?.EVERYONE, label: 'Everyone' },
      ],
      row: false,
      required: true,
    },
    component: RHFRadioGroup,
    md: 12,
  },
  ...(watchVisibleTo === VISIBLETO_OPTIONS?.USERS
    ? [
        {
          componentProps: {
            placeholder: 'Select users',
            name: 'userIds',
            label: 'Select Users',
            apiQuery: orgUsersData,
            multiple: true,
            getOptionLabel: (option: any) =>
              `${option?.firstName} ${option?.lastName}`,
            externalParams: { id: orgId, meta: false },
          },
          component: RHFAutocompleteAsync,
          md: 12,
        },
      ]
    : []),
  ...(watchVisibleTo === VISIBLETO_OPTIONS?.TEAMS
    ? [
        {
          componentProps: {
            placeholder: 'Select teams',
            name: 'teamIds',
            label: 'Select Teams',
            apiQuery: orgTeamsData,
            multiple: true,
            getOptionLabel: (option: any) => `${option?.name}`,
            externalParams: { meta: false, onlyMyTeams: true },
          },
          component: RHFAutocompleteAsync,
          md: 12,
        },
      ]
    : []),
];

export const filterData = [
  {
    componentProps: {
      name: 'visibleTo',
      label: 'Filter by',
      fullWidth: true,
      defaultValue: 'EVERYONE',
      options: [
        { value: VISIBLETO_OPTIONS?.PRIVATE, label: 'Me' },
        { value: VISIBLETO_OPTIONS?.TEAMS, label: 'My Teams' },
        { value: VISIBLETO_OPTIONS?.EVERYONE, label: 'Any' },
      ],
      row: false,
    },
    component: RHFRadioGroup,
    md: 12,
  },
];
