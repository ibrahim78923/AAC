import * as Yup from 'yup';

export const permissionValidation = Yup?.object()?.shape({
  allowUserSignUp: Yup?.string()?.trim(),
  whoCanSubmit: Yup?.string()?.trim(),
  whoCanView: Yup?.string()?.trim(),
  autoSuggest: Yup?.boolean(),
  allowLoggedIn: Yup?.string()?.trim(),
  allowRequester: Yup?.string()?.trim(),
  whoCanLogIn: Yup?.string()?.trim(),
});

export const permissionValue = {
  allowUserSignUp: '',
  whoCanSubmit: '',
  whoCanView: '',
  autoSuggest: false,
  allowLoggedIn: '',
  allowRequester: '',
  whoCanLogIn: '',
};

const headingProp = {
  variant: 'h5',
  color: 'secondary.main',
  fontWeight: 500,
  pb: 1,
};

export const permissionData = [
  {
    id: 1,
    mainHeading: 'User Sign Up',
    heading: 'Allow user to Sign Up from the customer portal',
    mainHeadingProp: {
      variant: 'h5',
      pb: 1,
      color: 'secondary.main',
    },
    headingProp: headingProp,
    componentProps: {
      name: 'allowUserSignUp',
      fullWidth: true,
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
  },
  {
    id: 2,
    heading: 'Who can submit a new ticket on portal',
    headingProp: headingProp,
    componentProps: {
      name: 'whoCanSubmit',
      fullWidth: true,
      options: [
        { value: 'loggedInUsers', label: 'Logged In Users' },
        { value: 'everyone', label: 'Everyone' },
      ],
    },
    tooltipProps: {
      title: '(CAPTA will be shown to logged out users to help avoid spam)',
    },
  },
  {
    id: 3,
    heading: 'Who can view solutions',
    headingProp: headingProp,
    componentProps: {
      name: 'whoCanView',
      fullWidth: true,
      options: [
        { value: 'loggedInUsers', label: 'Logged In Users' },
        { value: 'everyone', label: 'Everyone' },
      ],
    },
    checkboxProps: {
      name: 'autoSuggest',
      label: 'Auto Suggest Solutions while creating a new ticket',
    },
    tooltipProps: {
      title: 'This also applies to the search features inside feedback widget',
    },
  },
  {
    id: 4,
    heading:
      'Allow logged-in users to search requesters when creating tickets or services requesters',
    headingProp: headingProp,
    componentProps: {
      name: 'allowLoggedIn',
      fullWidth: true,
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
      fullWidth: true,
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
  },
  {
    id: 6,
    mainHeading: 'Email Domain Restriction',
    heading: 'Who can log in  (or)  Sign up  (or) create tickets?',
    mainHeadingProp: {
      variant: 'h5',
      pb: 1,
      color: 'secondary.main',
    },
    headingProp: headingProp,
    componentProps: {
      name: 'whoCanLogIn',
      fullWidth: true,
      options: [
        { value: 'userFromAnyDomain', label: 'User from any domain' },
        {
          value: 'UserFromSpecifiedDomain',
          label: 'User from specified domain (including existing contacts)',
        },
      ],
    },
  },
];
