// import { generateUniqueId } from '@/utils/dynamic-forms';
import * as Yup from 'yup';
import { FIELD_TYPES } from '@/utils/contracts';
import dayjs from 'dayjs';

export const validationSchema = () => {
  return Yup?.object()?.shape({
    name: Yup?.string()?.trim()?.required('Field is Required'),
    // signees: Yup.array().of(
    //   Yup.object().shape({
    //     signingOrder: Yup?.string()?.trim()?.required('Field is Required'),
    //     onBehalfOf: Yup?.mixed()?.nullable()?.required('Field is Required'),
    //     name: Yup?.string()?.trim()?.required('Field is Required'),
    //     email: Yup.string()?.trim()?.email('Invalid email'),
    //   }),
    // ),

    // parties: Yup.array().of(
    //   Yup.object().shape({
    //     moduleData: Yup?.object()?.required('Field is Required'),
    //     // address: Yup?.string()?.trim()?.required('Field is Required'),
    //     // idNumber: Yup?.string()?.trim()?.required('Field is Required'),
    //     // referredAs: Yup?.string()?.trim()?.required('Field is Required'),
    //   }),
    // ),
  });
};

export const defaultValues = (
  data: any,
  quoteId: string | string[] | undefined,
  templatePdf: any,
) => {
  const updatedSignees = (data?.signees || []).map((signee: any) => {
    return {
      ...signee,
      onBehalfOf: signee?.moduleData?._id,
    };
  });

  const updatedDynamicFields = (data?.dynamicFields || []).map((field: any) => {
    const fieldValue = field[field.name];

    if (
      field?.type === 'date' &&
      typeof fieldValue === 'string' &&
      fieldValue.trim() !== ''
    ) {
      const parsedDate = dayjs(fieldValue, undefined, true);
      return parsedDate.isValid()
        ? { ...field, [field.name]: parsedDate.toDate() }
        : { ...field, [field.name]: null };
    }

    return field;
  });

  let logo = data?.logo ?? null;
  if (typeof logo === 'string' && logo.trim() !== '') {
    logo = { url: logo };
  }

  return {
    name: data?.name ?? '',
    folderId: data?.folderId ?? null,
    attachment: quoteId && templatePdf ? templatePdf : data?.attachment ?? null,
    latestAttachment: data?.latestAttachment ?? null,
    message: data?.message ?? '',
    visibleTo: data?.visibleTo ?? 'EVERYONE',
    logo,
    signees: updatedSignees ?? [],
    parties: data?.parties ?? [],
    dynamicFields:
      updatedDynamicFields?.length > 0
        ? updatedDynamicFields
        : defaultFieldsData,
  };
};

export const defaultFieldsData = [
  {
    name: `startDate`,
    label: 'Start Date',
    type: FIELD_TYPES.DATE,
    placeholder: 'Set date',
    required: false,
    description: '',
    startDate: null,
  },
  {
    name: 'renewalTerms',
    label: 'Renewal terms',
    type: FIELD_TYPES.TEXT,
    placeholder: 'Add text',
    required: false,
    description: '',
    renewalTerms: '',
  },
  {
    name: 'contractCurrency',
    label: 'Contract currency',
    type: FIELD_TYPES.CHECKBOX,
    placeholder: 'Select',
    required: false,
    description: '',
    contractCurrency: '',
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
    required: false,
    description: '',
    contractValue: '',
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
    required: false,
    description: '',
    amount: '',
  },
];
