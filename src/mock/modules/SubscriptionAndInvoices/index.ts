export const data = [
  {
    id: '001',
    status: 'active',
    product: 'Sales',
    price: '20',
    numberOfUsers: '3',
    planDuration: 'Paid Monthly',
    planUsers: '2',
    planData: '3GB',
    billOn: '20th Feb 2024',
    type: 'Growth Plan',
  },
  {
    id: '002',
    status: 'inactive',
    product: 'Service',
    price: '0',
    numberOfUsers: '1',
    planDuration: '',
    planUsers: '1',
    planData: '3GB',
    billOn: '-',
    type: 'Free Plan',
  },
  {
    id: '003',
    status: 'inactive',
    product: 'Marketing',
    price: '0',
    numberOfUsers: '1',
    planDuration: '',
    planUsers: '1',
    planData: '3GB',
    billOn: '-',
    type: 'Free Plan',
  },
  {
    id: '004',
    status: 'active',
    product: 'Operation',
    price: '20',
    numberOfUsers: '1',
    planDuration: 'Paid Monthly',
    planUsers: '1',
    planData: '5GB',
    billOn: '20th Feb 2024',
    type: 'Growth Plan',
  },
  {
    id: '005',
    status: 'inactive',
    product: 'Loyalty Program',
    price: '0',
    numberOfUsers: '1',
    planDuration: 'Paid Monthly',
    planUsers: '1',
    planData: '5GB',
    billOn: '-',
    type: 'Free Plan',
  },
];

export const invoicesData: any = [
  {
    id: 1,
    invoiceNumber: '12341234',
    dueDate: 'mar 04, 2023',
    product: 'Air Sales',
    plan: 'Growth Plan',
    dateIssued: 'Mar 04, 2023',
    invoiceAmount: '1,234.11',
    invoiceBalance: '1,234.11',
    status: 'Overdue',
  },
];

export const invoiceProducData: any = [
  {
    id: 1,
    product: 'Air Sales',
    planPrice: 40,
    additionalUsers: 3,
    additionalStorage: 3,
    discount: 20,
    subTotal: 40,
  },
];

export const paymentData: any = [
  {
    id: 1,
    name: 'Mastercard Ending in 1002',
    billingAddress:
      'Office 82, 4 Roundwood Avenue Stockley Park, Uxibridge, UB1111AF, United Kingdom',
    expirationDate: '03/ 2024',
    product: 'Air Sales',
  },
];
