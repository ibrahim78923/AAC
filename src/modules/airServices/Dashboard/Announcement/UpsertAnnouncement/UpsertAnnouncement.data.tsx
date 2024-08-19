import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ANNOUNCEMENTS_VISIBLITY_MAPPED } from '@/constants/api-mapped';
import { ANNOUNCEMENTS_VISIBLITY } from '@/constants/strings';
import { pxToRem } from '@/utils/getFontValue';
import { Typography } from '@mui/material';
import * as Yup from 'yup';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import {
  AutocompleteAsyncOptionsI,
  AutocompleteOptionsI,
} from '@/components/ReactHookForm/ReactHookForm.interface';

export const announcementsVisibilityOptions = [
  {
    _id: ANNOUNCEMENTS_VISIBLITY?.EVERYONE,
    label: ANNOUNCEMENTS_VISIBLITY_MAPPED?.[ANNOUNCEMENTS_VISIBLITY?.EVERYONE],
  },
  {
    _id: ANNOUNCEMENTS_VISIBLITY?.ALL_AGENT,
    label: ANNOUNCEMENTS_VISIBLITY_MAPPED?.[ANNOUNCEMENTS_VISIBLITY?.ALL_AGENT],
  },
  {
    _id: ANNOUNCEMENTS_VISIBLITY?.SPECIFIC_USERS,
    label:
      ANNOUNCEMENTS_VISIBLITY_MAPPED?.[ANNOUNCEMENTS_VISIBLITY?.SPECIFIC_USERS],
  },
];

export const upsertAnnouncementValidationSchema: any = Yup?.object()?.shape({
  title: Yup?.string()?.trim()?.required('Title is required'),
  description: Yup?.string()?.trim(),
  notifyMembers: Yup?.string()?.trim(),
  visibility: Yup?.mixed()?.nullable()?.required('visibility is required'),
  additionalEmail: Yup?.array()
    ?.of(Yup?.string())
    ?.test('is-emails-valid', 'Enter valid email formats', function (value) {
      return value?.every(
        (email) => Yup?.string()?.email()?.isValidSync(email),
      );
    }),
  addMember: Yup?.array()?.when('visibility', {
    is: (value: any) => value?._id === ANNOUNCEMENTS_VISIBLITY?.SPECIFIC_USERS,
    then: () => Yup?.array()?.min(1, 'Member is required'),
    otherwise: () => Yup?.array(),
  }),
  startDate: Yup?.mixed()?.nullable()?.required('Start date is required'),
  endDate: Yup?.mixed()?.nullable()?.required('End date is required'),
});

export const upsertAnnouncementDefaultValues = (data?: any) => {
  return {
    title: data?.title ?? '',
    description: data?.description ?? '',
    startDate: data?.startDate ? new Date(data?.startDate) : null,
    endDate: data?.endDate ? new Date(data?.endDate) : null,
    notifyMembers: data?.notifyMembers ?? '',
    additionalEmail: data?.additionalEmail ?? [],
    addMember: data?.addMember ?? [],
    visibility: data?.visibility
      ? { _id: data?.visibility, label: data?.visibility }
      : null,
  };
};

export const upsertAnnouncementFormFieldsDynamic = (
  apiQueryUsers: any,
  startDateWatch: any,
  visibilityWatch: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'title',
      label: 'Title',
      fullWidth: true,
      required: true,
      placeholder: 'Enter Title',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      required: false,
      style: { height: pxToRem(200) },
    },
    component: RHFEditor,
    md: 12,
  },
  {
    id: 3,
    componentProps: {},
    heading: 'Schedule an announcement',
    component: Typography,
    md: 12,
  },
  {
    id: 4,
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
      required: true,
      disablePast: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    id: 5,
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
      minDate: startDateWatch,
      required: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    id: 7,
    componentProps: {
      name: 'visibility',
      label: 'Visibility',
      placeholder: 'Select',
      fullWidth: true,
      options: announcementsVisibilityOptions,
      required: true,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 8,
    componentProps: {
      name: 'notifyMembers',
      label: 'Notify members via email',
      icon: <CheckboxIcon />,
      checkedIcon: <CheckboxCheckedIcon />,
    },
    component: RHFCheckbox,
    gridSx: {
      paddingTop: `0rem !important`,
      marginTop: `${pxToRem(-12)} !important`,
    },
    md: 12,
  },
  {
    id: 9,
    componentProps: {
      name: 'additionalEmail',
      label: 'Additional Email recipients',
      fullWidth: true,
      placeholder: 'write email and press Enter',
      freeSolo: true,
      options: [],
      multiple: true,
      isOptionEqualToValue: () => {},
    },
    component: RHFAutocomplete,
  },
  ...(visibilityWatch?._id === ANNOUNCEMENTS_VISIBLITY?.SPECIFIC_USERS
    ? [
        {
          id: 10,
          componentProps: {
            name: 'addMember',
            label: 'Add Member',
            fullWidth: true,
            placeholder: 'Search agents and requesters',
            apiQuery: apiQueryUsers,
            required: true,
            multiple: true,
            externalParams: { requester: true, admin: true },
            getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
              `${option?.firstName} ${option?.lastName}`,
          },
          component: RHFAutocompleteAsync,
          md: 12,
        },
      ]
    : []),
];

export const DATE_DIFFERENCE = {
  ZERO: 0,
};
