import {
  RHFDatePicker,
  RHFTextField,
  RHFSelect,
  RHFSearchableSelect,
  RHFRadioGroup,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import StepBuyerInfo from './StepBuyerInfo/index';
import StepDeal from './StepDeal/index';
import StepLineItems from './StepLineItems/index';
import StepReview from './StepReview/index';
import StepSignature from './StepSignature/index';
import StepYourInfo from './StepYourInfo/index';

export const dealValidationSchema = Yup.object().shape({
  dealId: Yup.string().required('Field is Required'),
  template: Yup.string().required('Field is Required'),
  name: Yup.string().required('Field is Required'),
  expiryDate: Yup.date().required('Field is Required'),
});

export const dealInitValues = {
  dealId: '',
  template: '',
  name: '',
  expiryDate: null,
  notes: '',
  termsAndConditions: '',
};

export const dealFormData = (dealsData: any, openCreateDeal: any) => {
  return [
    {
      md: 12,
      component: RHFSearchableSelect,
      componentProps: {
        name: 'dealId',
        label: 'Select Deal',
        required: true,
        fullWidth: true,
        options: dealsData?.map((deal: any) => {
          return { value: deal?._id, label: deal?.name };
        }),
        isFooter: true,
        footerText: 'Create New Deal',
        footerActionHandler: openCreateDeal,
      },
    },
    {
      id: 'template',
      component: RHFSelect,
      componentProps: {
        name: 'template',
        label: 'Select Quote template',
        fullWidth: true,
        select: true,
        placeholder: 'Select',
        required: true,
      },
      options: [
        { value: 'Basic', label: 'Basic' },
        { value: 'Original', label: 'Original' },
      ],
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
      id: 'expiryDate',
      component: RHFDatePicker,
      componentProps: {
        name: 'expiryDate',
        label: 'Quote Expiration Date',
        fullWidth: true,
        placeholder: 'Select',
        required: true,
      },
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

interface QuotesUpdateI {
  data?: any;
  detailValues?: any;
  methodStepDeal?: any;
  openCreateDeal?: any;
  openAddContact?: any;
  openAddCompany?: any;
  openCreateProduct?: any;
  // signatureValue?: any;
  methodsSignature?: any;
}
export const updateQuoteSteps = (params: QuotesUpdateI) => {
  // console.log('septArrray::: datafile:::', params?.dealsList)
  return [
    {
      key: 'deal',
      label: 'Deal & Details',
      component: (
        <StepDeal
          openCreateDeal={params?.openCreateDeal}
          values={params?.detailValues}
          methods={params?.methodStepDeal}
        />
      ),
    },
    {
      key: 'buyerInfo',
      label: 'Buyer Info',
      component: (
        <StepBuyerInfo
          data={params?.data}
          openAddContact={params?.openAddContact}
          openAddCompany={params?.openAddCompany}
        />
      ),
    },
    {
      key: 'yourInfo',
      label: 'Your Info',
      component: <StepYourInfo />,
    },
    {
      key: 'lineItems',
      label: 'Line Items',
      component: (
        <StepLineItems openCreateProduct={params?.openCreateProduct} />
      ),
    },
    {
      key: 'signature',
      label: 'Signature',
      component: (
        <StepSignature
          // values={params?.signatureValue}
          methods={params?.methodsSignature}
        />
      ),
    },
    {
      key: 'review',
      label: 'Review',
      component: <StepReview />,
    },
  ];
};
