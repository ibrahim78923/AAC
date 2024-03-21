import { RHFAutocomplete, RHFFileImport } from '@/components/ReactHookForm';
export const requiredColumns = ['Name', 'Deal Value'];
export const productOptions = ['Sales', 'Services', 'Marketing'];
export const productData = [
  {
    icon: {},
    import: 'Sales',
    title: 'Deals',
    desc: 'The revenue connected to a company, which is commonly called an opportunity',
  },
  {
    icon: {},
    import: 'Sales',
    title: 'Companies',
    desc: 'The businesses you work with, which are commonly called accounts or organization',
  },
  {
    icon: {},
    import: 'Services',
    title: 'Inventory',
    desc: 'The people you work with, commonly called leads or customers',
  },
  {
    icon: {},
    import: 'Services',
    title: 'Catalog',
    desc: 'The people you work with, commonly called leads or customers',
  },
  {
    icon: {},
    import: 'Services',
    title: 'Tickets',
    desc: 'The issue created form a customer’s request for help',
  },
  {
    icon: {},
    import: 'Marketing',
    title: 'Tickets',
    desc: 'The issue created form a customer’s request for help',
  },
  {
    icon: {},
    import: 'Marketing',
    title: 'Deals',
    desc: 'The revenue connected to a company, which is commonly called an opportunity',
  },
];
export const importDefaultValues = {
  product: null,
  importDeals: null,
  crmFields: null,
};
export const importDataField = [
  {
    id: 6457,
    tag: 'product',
    componentProps: {
      name: 'product',
      label: 'Product',
      required: true,
      options: productOptions,
      placeholder: 'Select product',
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 4574,
    tag: 'import',
    componentProps: {
      name: 'importDeals',
      label: 'Import Deals',
    },
    component: RHFFileImport,
    md: 12,
  },
];
