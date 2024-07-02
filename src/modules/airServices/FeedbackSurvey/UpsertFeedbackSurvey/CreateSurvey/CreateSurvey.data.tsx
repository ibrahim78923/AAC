import { CopyPrimaryColorIcon } from '@/assets/icons';
import {
  RHFAutocomplete,
  RHFCheckbox,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { successSnackbar } from '@/utils/api';
import { Box, Button, IconButton, Typography } from '@mui/material';

export const surveyConditions = {
  email: 'viaEmail',
  link: 'viaMagicLink',
  surveyDuration: 'subject',
  sendSurveyPeople: 'sendSurveyPeople',
  displayName: 'displayName',
  createSurvey: 'createSurvey',
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
const sendSurveyPeopleOptions = [
  'dummy1@gmail.com',
  'dummy2@gmail.com',
  'dummy3@gmail.com',
  'dummy4@gmail.com',
  'dummy5@gmail.com',
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

export const createSurveyFields = [
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
      required: true,
      multiline: true,
      minRows: 3,
    },
    type: ['customer-support', 'customer-satisfaction'],
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'subject',
      label: 'Survey Duration(Days)',
      placeholder: 'Enter subject',
    },
    type: ['customer-support'],
    component: RHFTextField,
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
      options: sendSurveyPeopleOptions,
      isOptionEqualToValue: (option: any, newValue: any) => option === newValue,
    },
    type: ['customer-support'],
    component: RHFAutocomplete,
  },
  {
    id: 6,
    type: ['customer-support'],
    conditionalComponent: (linkRef: any, setValue: any) => {
      const handleCopy = () => {
        navigator?.clipboard
          ?.writeText(linkRef?.current?.innerText)
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
              px: 1,
            }}
          >
            <Typography
              variant="body2"
              color="blue.link_blue"
              mt={0.5}
              ref={linkRef}
            >
              {window?.location?.href}
            </Typography>
            <IconButton onClick={handleCopy}>
              <CopyPrimaryColorIcon />
            </IconButton>
          </Box>
          <Box display="flex" gap={1} mt={2}>
            <Button variant="outlined" color="secondary">
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
