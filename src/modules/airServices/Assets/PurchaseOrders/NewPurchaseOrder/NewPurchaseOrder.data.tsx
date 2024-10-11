import * as yup from 'yup';
import {
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { PURCHASE_ORDER_STATUS } from '@/constants/strings';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import { localeDateTime } from '@/utils/dateTime';
import { GLOBAL_CHARACTERS_LIMIT } from '@/constants/validation';

const purchaseDetailSchema = yup?.object()?.shape({
  itemName: yup?.mixed()?.nullable()?.required('Item Name is required'),
  description: yup
    ?.string()
    ?.trim()
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.DEFAULT,
      `Limit is ${GLOBAL_CHARACTERS_LIMIT?.DEFAULT}`,
    )
    ?.required('Description is required'),
  quantity: yup
    ?.number()
    ?.nullable()
    ?.positive('Greater than zero')
    ?.typeError('Not a number')
    ?.required('Quantity is required'),
  costPerItem: yup
    ?.number()
    ?.nullable()
    ?.positive('Greater than zero')
    ?.typeError('Not a number')
    ?.required('Cost is required'),
  taxRate: yup
    ?.number()
    ?.nullable()
    ?.positive('Greater than zero')
    ?.typeError('Not a number')
    ?.required('Tax is required'),
  total: yup?.number()?.positive('\u00a0')?.typeError('\u00a0'),
});

export const validationSchema: any = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return yup?.object()?.shape({
    orderName: yup
      ?.string()
      ?.required('Order Name is Required')
      ?.max(
        GLOBAL_CHARACTERS_LIMIT?.DEFAULT,
        `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.DEFAULT}`,
      ),
    orderNumber: yup
      ?.string()
      ?.required('Order Number is Required')
      ?.max(
        GLOBAL_CHARACTERS_LIMIT?.DEFAULT,
        `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.DEFAULT}`,
      ),
    vendor: yup?.mixed()?.nullable()?.required('Vendor is Required'),
    department: yup?.mixed()?.nullable(),
    expectedDeliveryDate: yup
      ?.date()
      ?.nullable()
      ?.required('Delivery Date is Required'),
    location: yup?.mixed()?.nullable(),
    termAndCondition: yup
      ?.string()
      ?.max(
        GLOBAL_CHARACTERS_LIMIT?.DESCRIPTION,
        `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.DESCRIPTION}`,
      ),
    subTotal: yup?.number(),
    taxRatio: yup?.number(),
    shipping: yup?.number(),
    discount: yup?.number(),
    total: yup?.number(),
    purchaseDetails: yup?.array()?.of(purchaseDetailSchema),
    ...formSchema,
  });
};

export const defaultValues = (data?: any, form?: any) => {
  const initialValues: any = dynamicFormInitialValue(data, form);

  return {
    orderName: data?.orderName ?? '',
    orderNumber: data?.orderNumber ?? '',
    vendor: data?.vendorDetails ?? null,
    department: data?.departmentDetails ?? null,
    expectedDeliveryDate: data?.expectedDeliveryDate
      ? localeDateTime(data?.expectedDeliveryDate)
      : null,
    location: data?.locationDetails ?? null,
    termAndCondition: data?.termAndCondition ?? '',
    subTotal: data?.subTotal ?? 0,
    taxRatio: data?.taxRate ?? 0,
    shipping: data?.shipping ?? 0,
    discount: data?.discount ?? 0,
    total: data?.total ?? 0,
    status: data?.status ?? PURCHASE_ORDER_STATUS?.OPEN,
    purchaseDetails: !!data?.purchaseDetails?.length
      ? data?.purchaseDetails?.map((item: any, index: any) => {
          const { ...rest } = item;
          delete rest?.itemName;
          return {
            itemName: data?.productDetails?.[index],
            ...rest,
          };
        })
      : [
          {
            itemName: null,
            description: '',
            quantity: null,
            costPerItem: null,
            taxRate: null,
            total: null,
          },
        ],
    ...initialValues,
  };
};

export const newPurchaseFieldsFunction = (
  departmentApiQuery: any,
  locationApiQuery: any,
  vendorApiQuery: any,
) => [
  {
    id: 1,
    component: RHFTextField,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'orderName',
      label: 'Order Name',
      placeholder: 'Enter Order Name',
      required: true,
    },
  },
  {
    id: 2,
    component: RHFTextField,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'orderNumber',
      label: 'Order Number',
      placeholder: 'Enter Order Number',
      required: true,
      InputProps: {
        inputProps: {
          min: 0,
        },
      },
    },
  },
  {
    id: 3,
    component: RHFAutocompleteAsync,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'vendor',
      label: 'Vendor',
      placeholder: 'Select Vendor',
      apiQuery: vendorApiQuery,
      externalParams: {
        meta: false,
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
      },
      required: true,
    },
  },
  {
    id: 5,
    componentProps: {
      fullWidth: true,
      name: 'department',
      label: 'Department',
      apiQuery: departmentApiQuery,
      placeholder: 'Select Department',
    },
    gridLength: 6,
    component: RHFAutocompleteAsync,
  },
  {
    id: 6,
    component: RHFDatePicker,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      required: true,
      disablePast: true,
      name: 'expectedDeliveryDate',
      label: 'Expected delivery date',
    },
  },
  {
    id: 7,
    componentProps: {
      fullWidth: true,
      name: 'location',
      label: 'Location',
      apiQuery: locationApiQuery,
      placeholder: 'Select Location',
      getOptionLabel: (option: any) => option?.locationName,
    },
    gridLength: 6,
    component: RHFAutocompleteAsync,
  },
  {
    id: 8,
    componentProps: {
      fullWidth: true,
      name: 'termAndCondition',
      label: 'Terms and Conditions',
      multiline: true,
      minRows: 3,
      placeholder: 'Enter Description',
    },
    gridLength: 12,
    component: RHFTextField,
  },
];

export const itemsDetailsList = [
  { label: 'Item Name', value: 'itemName' },
  { label: 'Description', value: 'description' },
  { label: 'Cost Per Item', value: 'costPerItem' },
  { label: 'Quantity', value: 'quantity' },
  { label: 'Tax Rate(%)', value: 'taxRate' },
  { label: 'Total(£)', value: 'total' },
];

export const itemsDetailsSubList = ['itemName', 'description', 'total'];
