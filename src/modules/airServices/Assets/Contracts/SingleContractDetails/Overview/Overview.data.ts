import { DATE_FORMAT } from '@/constants';
import { splitCapitalizedWords } from '@/utils/api';
import { DYNAMIC_FORM_FIELDS_TYPES } from '@/utils/dynamic-forms';
import dayjs from 'dayjs';

export const overviewData = ({
  contractData,
  contractItemData,
  approverName,
}: any) => [
  {
    id: '1',
    heading: 'General Details',
    detailsData: [
      { name: 'Contact Number', detail: contractData?.contractNumber ?? '--' },
      { name: 'Vendor', detail: contractData?.vendor?.name ?? '--' },
      { name: 'Type', detail: contractData?.contractTypeData?.name ?? '--' },
      { name: 'Status', detail: contractData?.status ?? '--' },
      { name: 'Cost', detail: contractData?.cost ?? '--' },
      {
        name: 'Approver',
        detail: `${approverName?.firstName ?? '---'} ${
          approverName?.lastName ?? ''
        }`,
      },
      {
        name: 'Validity',
        detail:
          `${dayjs(contractData?.startDate)?.format(
            DATE_FORMAT?.UI,
          )} to ${dayjs(contractData?.endDate)?.format(DATE_FORMAT?.UI)}` ??
          '--',
      },
    ],
  },
  {
    id: '2',
    heading: 'Items and Cost Details',
    detailsData: [
      { name: 'Software', detail: contractItemData?.serviceName ?? '--' },
      {
        name: 'Pricing Model',
        detail: splitCapitalizedWords(contractItemData?.priceModel) ?? '--',
      },
      { name: 'Cost', detail: contractItemData?.cost ?? '--' },
      { name: 'Count', detail: contractItemData?.count ?? '--' },
      { name: 'Comments', detail: contractItemData?.comments ?? '--' },
      { name: 'Billing Cycle', detail: contractData?.billingCycle ?? '--' },
    ],
  },
  {
    id: '3',
    heading: 'Software License Properties',
    detailsData: [
      { name: 'License Type', detail: contractData?.licenseType ?? '--' },
      { name: 'License Key', detail: contractData?.licenseKey ?? '--' },
    ],
  },
];

export const overviewDataArray = (data: any) => {
  const customFields =
    data?.customFields &&
    typeof data?.customFields === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT
      ? Object?.keys(data?.customFields)?.reduce((acc: any, key: any) => {
          acc[key] = data?.customFields[key] ?? '---';
          return acc;
        }, {})
      : {};

  return { ...customFields };
};
