import { AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS } from '@/constants/permission-keys';
import * as Yup from 'yup';

export const customerPortalSettingsSchemaValidation = Yup?.object()?.shape({
  [AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_ALLOW_SIGNUP_FROM_CS]:
    Yup?.string(),
  [AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SUBMIT_TICKET_BY_EVERYONE]:
    Yup?.string(),
  [AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_VIEW_KB_TO_EVERYONE]:
    Yup?.string(),
  [AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SUGGEST_ARTICLES_TO_EVERYONE]:
    Yup?.boolean(),
  [AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SEARCH_REQUESTER_AGENT_BY_EVERYONE]:
    Yup?.string(),
  [AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SHARE_TICKET_WITH_OTHER_REQUESTER]:
    Yup?.string(),
});

export const customerPortalSettingsFormDefaultValues = (data?: any) => {
  return {
    [AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_ALLOW_SIGNUP_FROM_CS]:
      data?.includes(
        AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_ALLOW_SIGNUP_FROM_CS,
      ) + '',
    [AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SUBMIT_TICKET_BY_EVERYONE]:
      data?.includes(
        AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SUBMIT_TICKET_BY_EVERYONE,
      ) + '',
    [AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_VIEW_KB_TO_EVERYONE]:
      data?.includes(
        AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_VIEW_KB_TO_EVERYONE,
      ) + '',
    [AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SUGGEST_ARTICLES_TO_EVERYONE]:
      !!data?.includes(
        AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SUGGEST_ARTICLES_TO_EVERYONE,
      ),
    [AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SEARCH_REQUESTER_AGENT_BY_EVERYONE]:
      data?.includes(
        AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SEARCH_REQUESTER_AGENT_BY_EVERYONE,
      ) + '',
    [AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SHARE_TICKET_WITH_OTHER_REQUESTER]:
      data?.includes(
        AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SHARE_TICKET_WITH_OTHER_REQUESTER,
      ) + '',
  };
};

const headingProp = {
  variant: 'h5',
  color: 'secondary.main',
  fontWeight: 500,
  mb: 1,
};

export const permissionData = [
  {
    id: 1,
    mainHeading: 'User Sign Up',
    heading: 'Allow user to Sign Up from the customer portal',
    mainHeadingProp: {
      variant: 'h5',
      mb: 1,
      color: 'secondary.main',
    },
    headingProp: headingProp,
    componentProps: {
      name: AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_ALLOW_SIGNUP_FROM_CS,
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' },
      ],
    },
  },
  {
    id: 2,
    heading: 'Who can submit a new ticket on portal?',
    headingProp: headingProp,
    componentProps: {
      name: AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SUBMIT_TICKET_BY_EVERYONE,

      options: [
        { value: 'false', label: 'Logged In Users' },
        {
          value: 'true',
          label: 'Everyone',
        },
      ],
    },
    tooltipProps: {
      title: '(CAPTCHA will be shown to logged out users to help avoid spam)',
    },
  },
  {
    id: 3,
    heading: 'Who can view Knowledge Base?',
    headingProp: headingProp,
    componentProps: {
      name: AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_VIEW_KB_TO_EVERYONE,

      options: [
        { value: 'false', label: 'Logged In Users' },
        { value: 'true', label: 'Everyone' },
      ],
    },
    checkboxProps: {
      name: AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SUGGEST_ARTICLES_TO_EVERYONE,

      label: 'Auto suggest articles while creating a new ticket',
    },
    tooltipProps: {
      title: 'This also applies to the search features inside article widget',
    },
  },
  {
    id: 4,
    heading:
      'Allow logged-in users to search requesters when creating tickets or services requesters',
    headingProp: headingProp,
    componentProps: {
      name: AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SEARCH_REQUESTER_AGENT_BY_EVERYONE,

      options: [
        {
          value: 'true',
          label: 'Yes',
        },
        { value: 'false', label: 'No' },
      ],
    },
  },
  {
    id: 5,
    heading: 'Allow requester to share ticket with others',
    headingProp: headingProp,
    componentProps: {
      name: AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SHARE_TICKET_WITH_OTHER_REQUESTER,

      options: [
        {
          value: 'true',
          label: 'Yes',
        },
        { value: 'false', label: 'No' },
      ],
    },
  },
];
