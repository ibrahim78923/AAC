import {
  RHFAutocomplete,
  RHFCheckbox,
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ANNOUNCEMENTS_VISIBILITY_MAPPED } from '@/constants/api-mapped';
import { ANNOUNCEMENTS_VISIBILITY } from '@/constants/strings';
import { pxToRem } from '@/utils/getFontValue';
import { Typography } from '@mui/material';
import * as Yup from 'yup';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { CHARACTERS_LIMIT } from '@/constants/validation';
import { DashboardOwnersFieldDropdown } from '../../DashboardFormFields/DashboardOwnersFieldDropdown';

const {
  SERVICES_DASHBOARD_ANNOUNCEMENT_TITLE_MAX_CHARACTERS,
  SERVICES_DASHBOARD_ANNOUNCEMENT_DESCRIPTION_MAX_CHARACTERS,
} = CHARACTERS_LIMIT ?? {};

const { EVERYONE, ALL_AGENT, SPECIFIC_USERS } = ANNOUNCEMENTS_VISIBILITY ?? {};

export const announcementsVisibilityOptions = [
  {
    _id: EVERYONE,
    label: ANNOUNCEMENTS_VISIBILITY_MAPPED?.[EVERYONE],
  },
  {
    _id: ALL_AGENT,
    label: ANNOUNCEMENTS_VISIBILITY_MAPPED?.[ALL_AGENT],
  },
  {
    _id: SPECIFIC_USERS,
    label: ANNOUNCEMENTS_VISIBILITY_MAPPED?.[SPECIFIC_USERS],
  },
];

export const upsertAnnouncementValidationSchema: any = Yup?.object()?.shape({
  title: Yup?.string()
    ?.trim()
    ?.required('Title is required')
    ?.max(
      SERVICES_DASHBOARD_ANNOUNCEMENT_TITLE_MAX_CHARACTERS,
      `Maximum characters limit is ${SERVICES_DASHBOARD_ANNOUNCEMENT_TITLE_MAX_CHARACTERS}`,
    ),
  description: Yup?.string()
    ?.trim()
    ?.max(
      SERVICES_DASHBOARD_ANNOUNCEMENT_DESCRIPTION_MAX_CHARACTERS,
      `Maximum characters limit is ${SERVICES_DASHBOARD_ANNOUNCEMENT_DESCRIPTION_MAX_CHARACTERS}`,
    ),
  notifyMembers: Yup?.boolean(),
  visibility: Yup?.mixed()?.nullable()?.required('Visibility is required'),
  additionalEmail: Yup?.array()
    ?.of(Yup?.string())
    ?.test('is-emails-valid', 'Enter valid email formats', function (value) {
      return value?.every(
        (email) => Yup?.string()?.email()?.isValidSync(email),
      );
    }),
  addMember: Yup?.array()?.when('visibility', {
    is: (value: any) => value?._id === SPECIFIC_USERS,
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
    notifyMembers: data?.notifyMembers ?? false,
    additionalEmail: data?.additionalEmail ?? [],
    addMember: data?.addMember ?? [],
    visibility: data?.visibility
      ? { _id: data?.visibility, label: data?.visibility }
      : null,
  };
};

export const upsertAnnouncementFormFieldsDynamic = (
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
      disablePast: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    id: 6,
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
    id: 7,
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
  ...(visibilityWatch?._id === SPECIFIC_USERS
    ? [
        {
          id: 8,
          componentProps: {
            name: 'addMember',
            label: 'Add Member',
            placeholder: 'Search agents and requesters',
            required: true,
            multiple: true,
            moreQueryParams: { requester: true, admin: true },
          },
          component: DashboardOwnersFieldDropdown,
          md: 12,
        },
      ]
    : []),
  {
    id: 9,
    componentProps: {
      name: 'additionalEmail',
      label: 'Additional email recipients',
      fullWidth: true,
      placeholder: 'Write email and press enter',
      freeSolo: true,
      options: [],
      multiple: true,
      isOptionEqualToValue: () => {},
    },
    component: RHFAutocomplete,
  },
];

export const DATE_DIFFERENCE = {
  ZERO: 0,
};
