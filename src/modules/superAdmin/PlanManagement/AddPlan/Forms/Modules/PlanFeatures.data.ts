import * as Yup from 'yup';
export const AirSalesCategories = [
  {
    id: '01',
    name: 'Create Deals',
    desc: 'Lorem ipsum dolor sit amet',
    checked: false,
  },
  {
    id: '02',
    name: 'Deals Associations',
    desc: '            ',
    checked: false,
  },
  {
    id: '03',
    name: 'Deals Notes',
    desc: '',
    checked: false,
  },
  {
    id: '04',
    name: 'Create Goals',
    desc: '',
    checked: false,
  },
  {
    id: '05',
    name: 'Edit Goals',
    desc: '',
    checked: false,
  },
  {
    id: '06',
    name: 'View Quote',
    desc: 'Lorem ipsum dolor sit amet',
    checked: false,
  },
  {
    id: '07',
    name: 'View Invoice',
    desc: 'Lorem ipsum dolor sit amet',
    checked: false,
  },
  {
    id: '08',
    name: 'Import Task',
    desc: 'Lorem ipsum dolor sit amet',
    checked: false,
  },
];

export const AirMarketingCategories = [
  {
    id: '01',
    name: 'Create Campaign',
    desc: 'Lorem ipsum dolor sit amet',
    checked: false,
  },
  {
    id: '02',
    name: 'Create Contact',
    desc: '            ',
    checked: false,
  },
  {
    id: '03',
    name: 'Create Dashboard',
    desc: '',
    checked: false,
  },
  {
    id: '04',
    name: 'Import Company',
    desc: '',
    checked: false,
  },
  {
    id: '05',
    name: 'Company Associations',
    desc: '',
    checked: false,
  },
  {
    id: '06',
    name: 'Compare Campaign',
    desc: 'Lorem ipsum dolor sit amet',
    checked: false,
  },
  {
    id: '07',
    name: 'Social Inbox',
    desc: 'Lorem ipsum dolor sit amet',
    checked: false,
  },
  {
    id: '08',
    name: 'Create CTA',
    desc: 'Lorem ipsum dolor sit amet',
    checked: false,
  },
];

export const validationSchemaModules = Yup.object().shape({
  permissionSlugs: Yup.array()
    ?.min(1, 'Field is Required')
    ?.max(10, 'Field is Required')
    ?.required('Field is Required'),
});

export const defaultValuesModules = {
  permissionSlugs: [],
};

export const validationSchemaPlanFeatures = Yup.object().shape({
  // featureId: Yup.string()
  // ?.required('Field is Required'),
});

export const defaultValuesPlanFeatures = {
  featureId: '',
};
