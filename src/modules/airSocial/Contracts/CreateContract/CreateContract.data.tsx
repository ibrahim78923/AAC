// import { generateUniqueId } from '@/utils/dynamic-forms';
import * as Yup from 'yup';
import { FIELD_TYPES } from '@/utils/contracts';

export const validationSchema = () => {
  return Yup?.object()?.shape({
    name: Yup?.string()?.trim()?.required('Field is Required'),
    signees: Yup.array().of(
      Yup.object().shape({
        signingOrder: Yup?.string()?.trim()?.required('Field is Required'),
        // onBehalfOf: Yup?.object()?.required('Field is Required'),
        // name: Yup?.string()?.trim()?.required('Field is Required'),
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
    dynamicFields: [
      ...defaultFieldsData,
      ...(Array.isArray(data?.dynamicFields) ? data.dynamicFields : []),
    ],
  };
};

export const defaultFieldsData = [
  {
    index: 0,
    name: 'startDate',
    label: 'Start Date',
    type: FIELD_TYPES.DATE,
    placeholder: 'Set date',
    required: false,
    description: '',
    value: '',
  },
  {
    index: 1,
    name: 'renewalTerms',
    label: 'Renewal terms',
    type: FIELD_TYPES.TEXT,
    placeholder: 'Add text',
    required: false,
    description: '',
    value: '',
  },
  {
    index: 2,
    name: 'contractCurrency',
    label: 'Contract currency',
    type: FIELD_TYPES.CHECKBOX,
    placeholder: 'Select',
    required: false,
    description: '',
    value: '',
    options: [
      { value: 'USD', label: 'USD' },
      { value: 'EUR', label: 'EUR' },
      { value: 'GBP', label: 'GBP' },
    ],
  },
  {
    index: 3,
    name: 'contractValue',
    label: 'Total yearly Contract Value',
    type: FIELD_TYPES.SELECT,
    placeholder: 'Select',
    required: false,
    description: '',
    value: '',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  {
    index: 4,
    name: 'amount',
    label: 'Amount',
    type: FIELD_TYPES.NUMBER,
    placeholder: 'Add value',
    required: false,
    description: '',
    value: '',
  },
];
