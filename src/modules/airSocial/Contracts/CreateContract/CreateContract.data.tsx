export const SIGNATURE_METHODS_ENUM = {
  CLICK: 'click',
  SMS: 'sms',
  DRAW: 'draw',
};
export const SIGNATURE_METHODS_LABEL = {
  CLICK: 'Sign with a Click',
  SMS: 'SMS Verification',
  DRAW: 'Draw a Signature',
};
export const SIGNATURE_METHODS = [
  { value: SIGNATURE_METHODS_ENUM.CLICK, label: SIGNATURE_METHODS_LABEL.CLICK },
  { value: SIGNATURE_METHODS_ENUM.SMS, label: SIGNATURE_METHODS_LABEL.SMS },
  { value: SIGNATURE_METHODS_ENUM.DRAW, label: SIGNATURE_METHODS_LABEL.DRAW },
];

export const initialParties = [
  {
    _id: '1',
    type: 'Individual',
    name: '',
    address: '',
    nationalID: '',
    referredAs: '',
  },
  {
    _id: '2',
    type: 'Individual',
    name: '',
    address: '',
    nationalID: '',
    referredAs: '',
  },
];

export const initialSignees = [
  {
    _id: '1',
    signeeOrder: '',
    onBehalfOf: 'Bell Tim',
    personalTitle: 'Business Analyst',
    email: 'bell@orcalo.co.uk',
    firstName: 'Harley',
    lastName: 'Hardy',
    signatureMethod: SIGNATURE_METHODS_ENUM?.SMS,
  },
  {
    _id: '2',
    signeeOrder: '',
    onBehalfOf: 'Bell Tim',
    personalTitle: 'Business Analyst',
    email: 'bell@orcalo.co.uk',
    firstName: 'Harley',
    lastName: 'Hardy',
    signatureMethod: SIGNATURE_METHODS_ENUM?.SMS,
  },
];
