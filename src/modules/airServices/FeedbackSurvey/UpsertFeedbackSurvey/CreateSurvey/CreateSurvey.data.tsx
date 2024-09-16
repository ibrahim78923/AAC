import {
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFDatePicker,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { successSnackbar } from '@/utils/api';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { FieldValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';

export const surveyConditions = {
  email: 'viaEmail',
  link: 'viaMagicLink',
  surveyDuration: 'surveyDuration',
  sendSurveyPeople: 'sendSurveyPeople',
  displayName: 'displayName',
  createSurvey: 'createSurvey',
  createSurveyTitle: 'Create Survey',
  editSurveyTitle: 'Edit Survey',
};

const customerSupportLinkTypeOptions = [
  {
    label: 'Send via email',
    value: 'viaEmail',
  },
  {
    label: 'Generate Magic link',
    value: 'viaMagicLink',
  },
];
const surveyLinkOptions = [
  {
    label: 'Send via email to all Agents',
    value: 'toAllAgents',
  },
  {
    label: 'Emails send after a ticket is "Closed"',
    value: 'afterTicketClosed',
  },
  {
    label: 'Emails send after a ticket is "Resolved"',
    value: 'afterTicketResolved',
  },
];

export const createSurveyFields = (
  watch: UseFormWatch<FieldValues>,
  setOpenShare: React.Dispatch<React.SetStateAction<boolean>>,
  userDropdown: any,
  sessionUser: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'surveyTitle',
      label: 'Survey Name',
      placeholder: 'Enter Survey Name',
      required: true,
    },
    type: ['customer-support', 'customer-satisfaction'],
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Enter Description',
      multiline: true,
      required: true,
      minRows: 3,
    },
    type: ['customer-support', 'customer-satisfaction'],
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'surveyDuration',
      label: 'Survey Duration',
      fullWidth: true,
      disablePast: true,
    },
    type: ['customer-support', 'customer-satisfaction'],
    component: RHFDatePicker,
  },
  {
    id: 4,
    componentProps: {
      name: 'customerSupportLinkType',
      options: customerSupportLinkTypeOptions,
    },
    type: ['customer-support'],
    component: RHFRadioGroup,
  },
  {
    id: 5,
    componentProps: {
      name: 'sendSurveyPeople',
      label: 'Add People',
      placeholder: 'Enter People',
      multiple: true,
      required: true,
      apiQuery: userDropdown,
      externalParams: {
        limit: 5000,
        role: 'ORG_EMPLOYEE',
        organization: sessionUser?.user?.organization?._id,
      },
      getOptionLabel: (option: any) => (option?.email ? option?.email : option),
      isOptionEqualToValue: (option: any, newValue: any) =>
        newValue?.email
          ? option?.email === newValue?.email
          : option?.email === newValue,
    },
    type: ['customer-support'],
    component: RHFAutocompleteAsync,
  },
  {
    id: 6,
    type: ['customer-support'],
    conditionalComponent: (
      linkRef: React.RefObject<HTMLAnchorElement>,
      setValue: UseFormSetValue<FieldValues>,
    ) => {
      const handleCopy = () => {
        navigator?.clipboard
          ?.writeText(linkRef?.current?.innerText as string)
          ?.then(() => {
            setValue('magicLink', linkRef?.current?.innerText);
            successSnackbar('Link copied to clipboard!');
          });
      };
      return (
        <Box>
          <Typography>Just copy and share link</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItem: 'center',
              justifyContent: 'space-between',
              border: '1px solid',
              borderColor: 'grey.700',
              borderRadius: 1.5,
              mt: 0.5,
              p: 1,
              overflow: 'hidden',
            }}
          >
            <Typography variant="body2" color="blue.link_blue" ref={linkRef}>
              {window?.location?.origin}/survey/response?surveyId=
              {watch('UUID')}
            </Typography>
          </Box>
          <Box display="flex" gap={1} mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenShare(true)}
            >
              Share
            </Button>
            <Button variant="contained" onClick={handleCopy}>
              Copy Link
            </Button>
          </Box>
        </Box>
      );
    },
  },
  {
    id: 7,
    type: ['customer-satisfaction'],
  },
  {
    id: 8,
    componentProps: {
      name: 'display',
      label: 'Display a Button',
      value: 'display',
    },
    type: ['customer-satisfaction'],
    component: RHFCheckbox,
  },
  {
    id: 10,
    componentProps: {
      name: 'displayName',
      label: 'Enter Display Name',
      placeholder: 'Enter Name',
    },
    type: ['customer-satisfaction'],
    component: RHFTextField,
  },
  {
    id: 11,
    componentProps: {
      name: 'satisfactionSurveyLinkType',
      label: 'Choose which emails have the satisfaction survey link',
      options: surveyLinkOptions,
      style: {
        display: 'flex',
        flexDirection: 'column',
      },
    },
    type: ['customer-satisfaction'],
    component: RHFRadioGroup,
  },
];
