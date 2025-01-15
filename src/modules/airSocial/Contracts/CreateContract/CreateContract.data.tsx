// import { generateUniqueId } from '@/utils/dynamic-forms';
import * as Yup from 'yup';
import { FIELD_TYPES } from '@/utils/contracts';

export const ENUM_SIGNATURE_METHODS = {
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
  { value: ENUM_SIGNATURE_METHODS.CLICK, label: SIGNATURE_METHODS_LABEL.CLICK },
  { value: ENUM_SIGNATURE_METHODS.SMS, label: SIGNATURE_METHODS_LABEL.SMS },
  { value: ENUM_SIGNATURE_METHODS.DRAW, label: SIGNATURE_METHODS_LABEL.DRAW },
];

export const validationSchema = () => {
  return Yup?.object()?.shape({
    name: Yup?.string()?.trim()?.required('Field is Required'),
  });
};

export const defaultValues = (data: any) => {
  const dynamicFields: any = [];
  return {
    name: data?.name ?? '',
    attachment: data?.attachment ?? null,
    message: data?.message ?? '',
    visibleTo: data?.visibleTo ?? 'EVERYONE',
    logo: data?.logo ?? null,
    signees: data?.signees?.length
      ? data?.signees.map((signee: any) => ({
          _id: signee._id,
          signingOrder: signee.signingOrder,
          onBehalfOf: signee.onBehalfOf,
          personalTitle: signee.personalTitle,
          name: signee.fullName,
          email: signee.email,
          signatureStatus: signee.signatureStatus,
          signatureType: signee.signatureType,
        }))
      : [],
    parties: data?.parties?.length
      ? data?.parties.map((party: any) => ({
          _id: party._id,
          name: party.name,
          address: party.address,
          idNumber: party.idNumber,
          email: party.email,
          referredAs: party.referredAs,
          moduleType: party.moduleType,
        }))
      : [],
    dynamicFields: dynamicFields,
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
    type: FIELD_TYPES.CHECKBOX,
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
