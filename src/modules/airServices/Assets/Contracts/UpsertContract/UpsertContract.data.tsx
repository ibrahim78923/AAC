import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ItemDetail } from './ItemDetail';

export const dropdownDummy = [
  {
    value: 'option1',
    label: 'Option 1',
  },
  {
    value: 'option2',
    label: 'Option 2',
  },
];

export const upsertContractFormDefaultValues = () => {
  return {
    contractName: '',
    contractNumber: '',
    type: '',
    associateAssets: '',
    cost: '',
    status: '',
    vendor: '',
    approver: '',
    startDate: '',
    endDate: '',
    autoRenew: '',
    notifyExpiry: '',
    notifyBefore: '',
    notifyTo: '',
    itemDetail: [{ serviceName: '', priceModel: '', cost:0 , count:'', comments:'' }],
  };
};

export const upsertContractFormDefaultValuesFunction = (
  data: any = upsertContractFormDefaultValues?.(),
) => {
  return {
    contractName: data?.contractName,
    contractNumber: data?.contractNumber,
    type: data?.type,
    associateAssets: data?.associateAssets,
    cost: data?.cost,
    status: data?.status,
    vendor: data?.vendor,
    approver: data?.approver,
    startDate: data?.startDate,
    endDate: data?.endDate,
    autoRenew: data?.autoRenew,
    notifyExpiry: data?.notifyExpiry,
    notifyBefore: data?.notifyBefore,
    notifyTo: data?.notifyTo,
    itemDetail: data?.itemDetail,
  };
};

export const upsertContractFormFieldsDataFunction = (
  isFieldDisable = false,
) => [
  {
    id: 2,
    component: RHFTextField,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'contractName',
      label: 'Contract Name',
      disabled: isFieldDisable,
    },
  },
  {
    id: 20,
    component: RHFTextField,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'contractName',
      label: 'Contract Name',
      disabled: isFieldDisable,
    },
  },
  {
    id: 920,
    componentProps: {
      fullWidth: true,
      name: 'type',
      label: 'Type',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
    gridLength: 6,
    component: RHFSelect,
  },
  {
    id: 150,
    componentProps: {
      fullWidth: true,
      name: 'associateAssets',
      label: 'Associate Assets',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
    gridLength: 6,
    component: RHFSelect,
  },
  {
    id: 200,
    component: RHFSelect,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'cost',
      label: 'Cost (£)',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
  },
  {
    id: 129,
    componentProps: {
      fullWidth: true,
      name: 'status',
      label: 'Status',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
    gridLength: 6,
    component: RHFSelect,
  },
  {
    id: 100,
    componentProps: {
      fullWidth: true,
      name: 'vendor',
      label: 'Vendor',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
    gridLength: 6,
    component: RHFSelect,
  },
  {
    id: 82,
    component: RHFSelect,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'approver',
      label: 'Approver',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
  },
  {
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 7.5,
  },
  {
    componentProps: {
      name: 'endDate',
      label: 'Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 7.5,
  },
  {
    componentProps: {
      name: 'itemDetail',
    },
    component: ItemDetail,
    md: 10,
  },
];
