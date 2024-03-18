import { DATE_FORMAT } from '@/constants';
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
      { name: 'Vendor', detail: contractData?.vendorDetails?.name ?? '--' },
      { name: 'Type', detail: contractData?.contractType ?? '--' },
      { name: 'Status', detail: contractData?.status ?? '--' },
      { name: 'Cost', detail: contractData?.cost ?? '--' },
      {
        name: 'Approver',
        detail: `${approverName?.firstName} ${approverName?.lastName}` ?? '--',
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
      { name: 'Pricing Model', detail: contractItemData?.priceModel ?? '--' },
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
