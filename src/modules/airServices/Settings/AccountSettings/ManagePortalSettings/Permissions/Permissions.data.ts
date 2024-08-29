import * as Yup from 'yup';

export const permissionValidation = Yup?.object()?.shape({
  allowUserSignUp: Yup?.string(),
  whoCanSubmit: Yup?.string(),
  whoCanView: Yup?.string(),
  autoSuggest: Yup?.boolean(),
  allowLoggedIn: Yup?.string(),
  allowRequester: Yup?.string(),
});

export const permissionValue = {
  allowUserSignUp: 'yes',
  whoCanSubmit: 'loggedInUsers',
  whoCanView: 'loggedInUsers',
  autoSuggest: true,
  allowLoggedIn: 'yes',
  allowRequester: 'yes',
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
      name: 'allowUserSignUp',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
  },
  {
    id: 2,
    heading: 'Who can submit a new ticket on portal?',
    headingProp: headingProp,
    componentProps: {
      name: 'whoCanSubmit',
      options: [
        { value: 'loggedInUsers', label: 'Logged In Users' },
        { value: 'everyone', label: 'Everyone' },
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
      name: 'whoCanView',
      options: [
        { value: 'loggedInUsers', label: 'Logged In Users' },
        { value: 'everyone', label: 'Everyone' },
      ],
    },
    checkboxProps: {
      name: 'autoSuggest',
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
      name: 'allowLoggedIn',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
  },
  {
    id: 5,
    heading: 'Allow  requester to share ticket with others',
    headingProp: headingProp,
    componentProps: {
      name: 'allowRequester',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
  },
];
