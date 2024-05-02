import * as Yup from 'yup';

export const otherEmailValidationSchema = Yup?.object()?.shape({
  email: Yup?.string()?.required('Field is Required')?.trim(),
  username: Yup?.string()?.required('Field is Required')?.trim(),
  imapServerHost: Yup?.string()?.required('Field is Required')?.trim(),
  smtpServerHost: Yup?.string()?.required('Field is Required')?.trim(),
});

export const otherEmailDefaultValues = {
  email: '',
  username: '',
  password: '',
  imapServerHost: '',
  imapServerPort: '',
  useSSL: false,
  imapAuthenticationType: '',
  smtpServerHost: '',
  smtpServerPort: '',
  securityMode: '',
  smtpAuthenticationType: '',
};

export const emailsData = [
  {
    from: 'John Doe <johndoe@dummy.com>',
    sent: 'Wednesday April 19, 2023 - 11:30PM',
    to: 'John Doe <johndoe@dummy.com>',
    subject: 'Test mail',
  },
  {
    from: 'John Doe <johndoe@dummy.com>',
    sent: 'Wednesday April 19, 2023 - 11:30PM',
    to: 'John Doe <johndoe@dummy.com>',
    subject: 'Test mail',
  },
];
