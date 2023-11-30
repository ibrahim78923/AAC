import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { Typography } from '@mui/material';
import { ItemDetail } from './ItemDetail';
import dayjs from 'dayjs';
import { CONTRACT_TYPES } from '@/constants/strings';
import {
  contractTypeOptions,
  dropdownDummy,
} from '../UpsertContract/UpsertContract.data';

const todayDate = dayjs()?.format('MM/DD/YYYY');

export const updateContractFormValidationSchema = Yup?.object()?.shape({
  startDate: Yup?.date(),
  endDate: Yup?.date(),
  cost: Yup?.string(),
  approver: Yup?.string(),
  type: Yup?.string(),
  itemDetail: Yup?.array()
    ?.of(
      Yup?.object()?.shape({
        serviceName: Yup?.string(),
        priceModel: Yup?.string(),
        cost: Yup?.number(),
        count: Yup?.number(),
        comments: Yup?.string(),
      }),
    )
    ?.when('type', {
      is: (value: any) => value === CONTRACT_TYPES?.SOFTWARE_LICENSE,
      then: () => {
        return Yup?.array()
          ?.of(
            Yup?.object()?.shape({
              serviceName: Yup?.string()?.required('service name is required'),
              priceModel: Yup?.string()?.required('Price model is required'),
              cost: Yup?.number()?.positive()?.typeError('Not a number'),
              count: Yup?.number()?.positive()?.typeError('Not a number'),
              comments: Yup?.string(),
            }),
          )
          ?.min(1, 'At least one item is required');
      },
      otherwise: (schema: any) => schema?.notRequired(),
    }),
});

export const updateContractFormDefaultValuesFunction = (
  router: any,
  data?: any,
) => {
  return {
    startDate: new Date(data?.startDate ?? todayDate),
    endDate: new Date(data?.startDate ?? todayDate),
    cost: data?.cost ?? '',
    approver: data?.approver ?? '',
    type: router?.query?.contractType
      ? (router?.query?.contractType as string)
      : data?.type,
    itemDetail: !!data?.itemDetail?.length
      ? data?.itemDetail
      : [
          {
            serviceName: '',
            priceModel: '',
            cost: 0,
            count: 0,
            comments: '',
          },
        ],
  };
};

export const updateContractFormFieldsFunction = (router: any) => [
  {
    componentProps: {
      variant: 'h5',
    },
    heading: 'Contract Details',
    md: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'cost',
      label: 'Cost (£)',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    componentProps: {
      name: 'approver',
      label: 'Approver',
      fullWidth: true,
      select: true,
    },
    options: dropdownDummy,
    component: RHFSelect,
    md: 6,
  },
  ...(router?.query?.contractType === CONTRACT_TYPES?.SOFTWARE_LICENSE
    ? [
        {
          id: 3,
          componentProps: {
            color: 'slateBlue.main',
            variant: 'h4',
          },
          heading: 'Item & Cost Details',
          md: 12,
          component: Typography,
        },
        {
          id: 54383,
          componentProps: {
            name: 'itemDetail',
          },
          component: ItemDetail,
          md: 12,
        },
      ]
    : []),
  {
    id: 129091,
    componentProps: {
      fullWidth: true,
      name: 'type',
      label: '',
      select: true,
      options: contractTypeOptions,
      disabled: true,
      sx: { display: 'none' },
    },
    component: RHFSelect,
    md: 6,
  },
];
