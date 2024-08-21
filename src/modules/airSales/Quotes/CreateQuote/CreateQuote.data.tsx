import {
  RHFDatePicker,
  RHFTextField,
  RHFSearchableSelect,
  RHFRadioGroup,
  RHFAutocomplete,
} from '@/components/ReactHookForm';
import { DATE_FORMAT, dealStatus } from '@/constants';
import * as Yup from 'yup';
import useCreateQuote from './useCreateQuote';
import { dynamicFormValidationSchema } from '@/utils/dynamic-forms';

export const dealValidationSchema = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);
  return Yup?.object()?.shape({
    dealId: Yup?.string()?.required('Field is Required'),
    template: Yup?.string()?.required('Field is Required'),
    name: Yup?.string()?.required('Field is Required'),
    expiryDate: Yup?.date()?.required('Field is Required'),
    ...formSchema,
  });
};

export const dealInitValues = {
  dealId: '',
  template: '',
  name: '',
  expiryDate: null,
  notes: '',
  termsAndConditions: '',
};

export const dealFormData = (openCreateDeal: any) => {
  const { dataGetDeals } = useCreateQuote();
  const dealsData = dataGetDeals?.data?.deals || dataGetDeals;
  const wonDeals = dealsData?.filter(
    (deal: any) => deal?.dealStage === dealStatus?.WON,
  );

  return [
    {
      md: 12,
      component: RHFSearchableSelect,
      componentProps: {
        name: 'dealId',
        label: 'Select Deal',
        required: true,
        options: wonDeals?.map((deal: any) => {
          return { value: deal?._id, label: deal?.name };
        }),
        isFooter: true,
        footerText: 'Create New Deal',
        footerActionHandler: openCreateDeal,
      },
    },
    {
      id: 'template',
      componentProps: {
        label: 'Select Quote Template',
        name: 'template',
        fullWidth: true,
        required: true,
        placeholder: 'Select quote template',
        options: ['Basic', 'Original'],
      },

      component: RHFAutocomplete,
      md: 12,
    },
    {
      id: 'name',
      component: RHFTextField,
      componentProps: {
        name: 'name',
        label: 'Quote Name',
        fullWidth: true,
        placeholder: 'New quote',
        required: true,
      },
    },
    {
      componentProps: {
        name: 'expiryDate',
        label: 'Quote Expiration Date',
        placeholder: DATE_FORMAT?.UI,
        minDate: new Date(),
        fullWidth: true,
        required: true,
      },
      md: 12,
      component: RHFDatePicker,
    },
    {
      id: 'notes',
      component: RHFTextField,
      componentProps: {
        name: 'notes',
        label: 'Notes',
        fullWidth: true,
        multiline: true,
        rows: 3,
        placeholder: 'Enter notes you like to show buyer.',
      },
    },
    {
      id: 'termsAndConditions',
      component: RHFTextField,
      componentProps: {
        name: 'termsAndConditions',
        label: 'Terms and Condition for purchase',
        fullWidth: true,
        multiline: true,
        rows: 3,
        placeholder: 'Enter details',
      },
    },
  ];
};

export const signatureInitValues = {
  signature: 'noSignature',
};

export const signatureFormData = [
  {
    id: 'signature',
    component: RHFRadioGroup,
    componentProps: {
      name: 'signature',
      fullWidth: true,
      options: [
        { value: 'noSignature', label: 'No Signature' },
        {
          value: 'includeSignature',
          label: 'Include Space for a written signature',
        },
      ],
      row: false,
    },
  },
];

export const createQuoteFormFields = [
  {
    id: 'templateComment',
    component: RHFTextField,
    componentProps: {
      name: 'templateComment',
      fullWidth: true,
      placeholder: 'Write comment here...',
      multiline: true,
      rows: 3,
    },
  },
];
