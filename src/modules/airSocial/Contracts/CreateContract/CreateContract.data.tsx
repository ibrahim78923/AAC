// import { generateUniqueId } from '@/utils/dynamic-forms';
import * as Yup from 'yup';
import { FIELD_TYPES } from '@/utils/contracts';

export const ENUM_SIGNATURE_TYPE = {
  CLICK: 'CLICK',
  SMS: 'SMS',
  DRAW: 'DRAW',
} as const;
export const SIGNATURE_METHODS_LABEL = {
  CLICK: 'Sign with a Click',
  SMS: 'SMS Verification',
  DRAW: 'Draw a Signature',
};
export const SIGNATURE_METHODS = [
  { value: ENUM_SIGNATURE_TYPE.CLICK, label: SIGNATURE_METHODS_LABEL.CLICK },
  { value: ENUM_SIGNATURE_TYPE.SMS, label: SIGNATURE_METHODS_LABEL.SMS },
  { value: ENUM_SIGNATURE_TYPE.DRAW, label: SIGNATURE_METHODS_LABEL.DRAW },
];

export const validationSchema = () => {
  return Yup?.object()?.shape({
    name: Yup?.string()?.trim()?.required('Field is Required'),
    signees: Yup.array().of(
      Yup.object().shape({
        signingOrder: Yup?.string()?.trim()?.required('Field is Required'),
        // onBehalfOf: Yup?.object()?.required('Field is Required'),
        name: Yup?.string()?.trim()?.required('Field is Required'),
        email: Yup.string()?.trim()?.email('Invalid email'),
      }),
    ),
    parties: Yup.array().of(
      Yup.object().shape({
        name: Yup?.object()?.required('Field is Required'),
        // address: Yup?.string()?.trim()?.required('Field is Required'),
        // idNumber: Yup?.string()?.trim()?.required('Field is Required'),
        // referredAs: Yup?.string()?.trim()?.required('Field is Required'),
      }),
    ),
  });
};

export const defaultValues = (data: any) => {
  return {
    name: data?.name ?? '',
    folderId: data?.folderId ?? null,
    attachment: data?.attachment ?? null,
    message: data?.message ?? '',
    visibleTo: data?.visibleTo ?? 'EVERYONE',
    logo: data?.logo ?? null,
    signees: data?.signees ?? [],
    parties: data?.parties ?? [],
    dynamicFields: data?.dynamicFields ?? [],
  };
};

export const defaultFieldsData = [
  {
    name: 'startDate',
    label: 'Start Date',
    type: FIELD_TYPES.DATE,
    placeholder: 'Set date',
  },
  {
    name: 'renewalTerms',
    label: 'Renewal terms',
    type: FIELD_TYPES.TEXT,
    placeholder: 'Add text',
  },
  {
    name: 'contractCurrency',
    label: 'Contract currency',
    type: FIELD_TYPES.CHECKBOX,
    placeholder: 'Select',
    options: [
      { value: 'USD', label: 'USD' },
      { value: 'EUR', label: 'EUR' },
      { value: 'GBP', label: 'GBP' },
    ],
  },
  {
    name: 'contractValue',
    label: 'Total yearly Contract Value',
    type: FIELD_TYPES.SELECT,
    placeholder: 'Select',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  {
    name: 'amount',
    label: 'Amount',
    type: FIELD_TYPES.NUMBER,
    placeholder: 'Add value',
  },
];
