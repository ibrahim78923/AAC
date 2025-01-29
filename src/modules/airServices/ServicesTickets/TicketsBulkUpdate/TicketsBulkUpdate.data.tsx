import {
  RHFDropZone,
  RHFEditor,
  RHFAutocomplete,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import {
  ticketImpactOptions,
  ticketPriorityOptions,
  ticketSourceOptions,
  ticketStatusOptions,
} from '../ServicesTickets.data';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { pxToRem } from '@/utils/getFontValue';
import { AgentFieldDropdown } from '../ServiceTicketFormFields/AgentFieldDropdown';
import { CategoryFieldDropdown } from '../ServiceTicketFormFields/CategoryFieldDropdown';
import { uploadFileMaxSize } from '@/utils/avatarUtils';
import { ACCEPT_FILE_EXTENSIONS } from '@/constants/file';

export const isReplyAddedNeglect = ['to', 'description', 'file'];

export const ticketsBulkUpdateToFormSchema: any = {
  to: Yup?.array()?.of(Yup?.string()),
  description: Yup?.string(),
  file: Yup?.mixed()?.nullable(),
};

export const ticketsBulkUpdateAddReplyFormFieldsData = [
  {
    _id: 11,
    componentProps: {
      name: 'to',
      label: 'To',
      placeholder: 'Enter Email And Press Enter',
      required: true,
      freeSolo: true,
      options: [],
      multiple: true,
      isOptionEqualToValue: () => {},
    },
    component: RHFAutocomplete,
  },
  {
    _id: 13,
    componentProps: {
      fullWidth: true,
      name: 'description',
      label: 'Description',
      required: true,
      style: { height: pxToRem(250) },
    },
    component: RHFEditor,
  },
  {
    _id: 15,
    componentProps: {
      fullWidth: true,
      name: 'file',
      label: 'File',
      fileType: `PNG, JPG and PDF (max ${uploadFileMaxSize} MB)`,
      accept: {
        'image/png': ACCEPT_FILE_EXTENSIONS?.PNG,
        'image/jpeg': ACCEPT_FILE_EXTENSIONS?.JPEG,
        'application/pdf': ACCEPT_FILE_EXTENSIONS?.PDF,
      },
    },
    component: RHFDropZone,
  },
];

export const ticketsBulkUpdateDefaultFormValues = {
  pirority: null,
  status: null,
  impact: null,
  agent: null,
  source: null,
  category: null,
  to: [],
  description: '',
  file: null,
};

export const ticketsBulkUpdateFormValidationSchemaFunction: any = (
  isReplyAdded: boolean,
) =>
  Yup?.object()?.shape({
    category: Yup?.mixed()?.nullable(),
    status: Yup?.mixed()?.nullable(),
    pirority: Yup?.mixed()?.nullable(),
    source: Yup?.mixed()?.nullable(),
    impact: Yup?.mixed()?.nullable(),
    agent: Yup?.mixed()?.nullable(),
    ...(isReplyAdded && {
      to: Yup?.array()
        ?.of(Yup?.string())
        ?.test(
          'is-emails-valid',
          'Enter valid email formats',
          function (value) {
            if (!value || value.length === 0) {
              return false;
            }
            return value.every(
              (email) => Yup?.string()?.email()?.isValidSync(email),
            );
          },
        ),
      description: Yup?.string()?.required('Description is required'),
      file: Yup?.mixed()?.nullable(),
    }),
  });

export const ticketsBulkUpdateFormFieldsDynamic = () => [
  {
    _id: 1,
    componentProps: {
      fullWidth: true,
      name: 'pirority',
      label: 'Priority',
      options: ticketPriorityOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 2,
    componentProps: {
      fullWidth: true,
      name: 'status',
      label: 'Status',
      options: ticketStatusOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 3,
    component: RHFAutocomplete,
    componentProps: {
      fullWidth: true,
      name: 'impact',
      label: 'Impact',
      options: ticketImpactOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
  },
  {
    _id: 4,
    component: AgentFieldDropdown,
  },
  {
    _id: 5,
    component: RHFAutocomplete,
    componentProps: {
      fullWidth: true,
      name: 'source',
      label: 'Source',
      options: ticketSourceOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
  },
  {
    _id: 6,
    component: CategoryFieldDropdown,
  },
];
