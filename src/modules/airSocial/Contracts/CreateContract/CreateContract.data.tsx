import { generateUniqueId } from '@/utils/dynamic-forms';

export const defaultValues = {
  contractTitle: '',
  contractLogo: null,
  defaultAttachment: null,
  messageToRecipient: '',
  defaultSignatures: '',
};
export const SIGNATURE_METHODS_ENUM = {
  CLICK: 'CLICk',
  SMS: 'SMS',
  DRAW: 'DRAW',
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

export const mockContract = {
  name: 'Service Agreement',
  status: 'PENDING',
  attachment: null,
  message: '',
  visibleTo: 'PRIVATE',
  logo: null,
  signees: [
    {
      _id: generateUniqueId(),
      signingOrder: 1,
      onBehalfOf: '',
      personalTitle: '',
      fullName: '',
      email: '',
      signatureStatus: 'PENDING',
      signatureType: SIGNATURE_METHODS_ENUM.DRAW,
      moduleId: '',
    },
  ],
  parties: [
    {
      _id: generateUniqueId(),
      name: '',
      address: '',
      idNumber: '',
      email: '',
      referredAs: '',
      moduleType: '',
      moduleId: '',
    },
  ],
  dynamicFields: null,
};
