import { IItemData } from '../EmailNotification.interface';

export const purchaseOrdersData: IItemData[] = [
  {
    _id: 1,
    heading: 'Requester Notification',
    details: [
      {
        _id: 'poItemsOrdered',
        title: 'Notify when items are ordered',
      },
      {
        _id: 'poItemsReceived',
        title: 'Notify when items are received',
      },
      {
        _id: 'poCancelled',
        title: 'Notify when a purchase order is cancelled',
      },
      {
        _id: 'poAssociatedToServicReport',
        title: 'Notify when a purchase order is associated to Service Report',
      },
      {
        _id: 'poOverdue',
        title: 'Notify when a purchase order is overdue',
      },
      {
        _id: 'poApprovedRejected',
        title: 'Notify when a purchase order is approved or rejected',
      },
      {
        _id: 'poSentForApproval',
        title: 'Notify when a purchase order is sent for approval',
      },
    ],
  },
];
