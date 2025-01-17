import { RHFAutocomplete } from '@/components/ReactHookForm';
import { PURCHASE_ORDER_STATUS, TIME_PERIODS } from '@/constants/strings';
import GetPurchaseOrderVendorDropdown from '../PurchaseOrderFormFieldsDropdowns/GetPurchaseOrderVendorDropdown';
import GetPurchaseOrderDepartmentDropdown from '../PurchaseOrderFormFieldsDropdowns/GetPurchaseOrderDepartmentDropdown';

export const statusOptions = [
  {
    label: PURCHASE_ORDER_STATUS?.APPROVED,
    _id: PURCHASE_ORDER_STATUS?.APPROVED,
  },
  {
    label: PURCHASE_ORDER_STATUS?.CANCELLED,
    _id: PURCHASE_ORDER_STATUS?.CANCELLED,
  },
  {
    label: PURCHASE_ORDER_STATUS?.CLOSED,
    _id: PURCHASE_ORDER_STATUS?.CLOSED,
  },
  {
    label: PURCHASE_ORDER_STATUS?.DRAFT,
    _id: PURCHASE_ORDER_STATUS?.DRAFT,
  },
  {
    label: PURCHASE_ORDER_STATUS?.OPEN,
    _id: PURCHASE_ORDER_STATUS?.OPEN,
  },
  {
    label: PURCHASE_ORDER_STATUS?.ORDERED,
    _id: PURCHASE_ORDER_STATUS?.ORDERED,
  },
  {
    _id: PURCHASE_ORDER_STATUS?.PARTLY_RECEIVED,
    label: PURCHASE_ORDER_STATUS?.PARTLY_RECEIVED,
  },
  {
    label: PURCHASE_ORDER_STATUS?.PENDING_APPROVAL,
    _id: PURCHASE_ORDER_STATUS?.PENDING_APPROVAL,
  },
  {
    _id: PURCHASE_ORDER_STATUS?.RECEIVED,
    label: PURCHASE_ORDER_STATUS?.RECEIVED,
  },
  {
    _id: PURCHASE_ORDER_STATUS?.REJECTED,
    label: PURCHASE_ORDER_STATUS?.REJECTED,
  },
];

export const dateOptions = [
  {
    _id: TIME_PERIODS?.NONE,
    label: TIME_PERIODS?.NONE,
  },
  {
    _id: TIME_PERIODS?.ALL_TIME,
    label: TIME_PERIODS?.ALL_TIME,
  },
  {
    _id: TIME_PERIODS?.TODAY,
    label: TIME_PERIODS?.TODAY,
  },
  {
    _id: TIME_PERIODS?.YESTERDAY,
    label: TIME_PERIODS?.YESTERDAY,
  },
  {
    _id: TIME_PERIODS?.PREVIOUS_WEEK,
    label: TIME_PERIODS?.PREVIOUS_WEEK,
  },
  {
    _id: TIME_PERIODS?.PREVIOUS_MONTH,
    label: TIME_PERIODS?.PREVIOUS_MONTH,
  },
];
export const expectedDeliveryDateOptions = [
  {
    _id: TIME_PERIODS?.NONE,
    label: TIME_PERIODS?.NONE,
  },
  {
    _id: TIME_PERIODS?.ALL_TIME,
    label: TIME_PERIODS?.ALL_TIME,
  },
  {
    _id: TIME_PERIODS?.TODAY,
    label: TIME_PERIODS?.TODAY,
  },
  {
    _id: TIME_PERIODS?.YESTERDAY,
    label: TIME_PERIODS?.YESTERDAY,
  },
  {
    _id: TIME_PERIODS?.PREVIOUS_WEEK,
    label: TIME_PERIODS?.PREVIOUS_WEEK,
  },
  {
    _id: TIME_PERIODS?.PREVIOUS_MONTH,
    label: TIME_PERIODS?.PREVIOUS_MONTH,
  },
  {
    _id: TIME_PERIODS?.NEXT_WEEK,
    label: TIME_PERIODS?.NEXT_WEEK,
  },
  {
    _id: TIME_PERIODS?.NEXT_MONTH,
    label: TIME_PERIODS?.NEXT_MONTH,
  },
];

export const purchaseOrderFilterFormDefaultValues = (data: any) => {
  return {
    vendorId: data?.vendorId ?? null,
    status: data?.status ?? null,
    createdAt: data?.createdAt ?? null,
    expectedDeliveryDate: data?.expectedDeliveryDate ?? null,
    departmentId: data?.departmentId ?? null,
  };
};

export const purchaseOrderFilterFieldsDynamic = [
  {
    id: 2,
    component: GetPurchaseOrderVendorDropdown,
    componentProps: {
      name: 'vendorId',
      required: false,
    },
  },
  {
    id: 920,
    componentProps: {
      placeholder: 'Select Status',
      fullWidth: true,
      name: 'status',
      label: 'Status',
      options: statusOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 150,
    componentProps: {
      placeholder: 'Select time period',
      fullWidth: true,
      name: 'createdAt',
      label: 'Created Date',
      options: dateOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 200,
    component: RHFAutocomplete,
    componentProps: {
      placeholder: 'Select time period',
      fullWidth: true,
      name: 'expectedDeliveryDate',
      label: 'Deliver Date',
      options: expectedDeliveryDateOptions,
      getOptionLabel: (option: any) => option?.label,
    },
  },
  {
    id: 129,
    componentProps: {
      name: 'departmentId',
    },
    component: GetPurchaseOrderDepartmentDropdown,
  },
];
