import { Overview } from '../Overview';
import { Product } from '../Product';
import { Contract } from '../Contract';

export const SingleVendorDetailTabsData = [
  {
    _id: 1,
    name: 'Overview',
    id: 'overview',
    tabPermissions: [],
    hasNoPermissions: true,
    component: Overview,
  },
  {
    _id: 2,
    name: 'Product',
    id: 'product',
    tabPermissions: [],
    hasNoPermissions: true,
    component: Product,
  },
  {
    _id: 3,
    name: 'Contract',
    id: 'contract',
    tabPermissions: [],
    hasNoPermissions: true,
    component: Contract,
  },
];
