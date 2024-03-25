import { AvailableIcon } from '@/assets/icons';
import {
  RHFAutocomplete,
  RHFFileImport,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Box } from '@mui/material';
import * as Yup from 'yup';

export const productData = [
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
    desc: 'The businesses you work with, which are commonly called accounts or organization',
  },
  {
    icon: {},
    import: 'Services',
    title: 'Location',
    desc: 'The people you work with, commonly called leads or customers',
  },
  {
    icon: {},
    import: 'Services',
    title: 'Vendor',
    desc: 'The people you work with, commonly called leads or customers',
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
  {
    icon: {},
    import: 'Sales',
    title: 'Deals',
    desc: 'The revenue connected to a company, which is commonly called an opportunity',
  },
];
export const stepsData: any = {
  Inventory: [
    'Display name',
    'Asset Type',
    'Impact',
    'Description',
    'Expiry date',
    'Location',
    'Department',
    'Assigned on',
    'Used By',
    'Attachment',
  ],
  Location: [
    'Location Name',
    'Contact Name',
    'Email',
    'Phone',
    'Address Line 1',
    'Address Line 2',
    'City',
    'Country',
    'State',
    'Zip Code',
  ],
  Catalog: [
    'Name',
    'Asset Type',
    'Manufacturer',
    'status',
    'Mode of Procurement',
    'Description',
  ],
  Vendor: [
    'Name',
    'Contact Name',
    'Phone',
    'Mobile',
    'Email',
    'Description',
    'Address',
    'Country',
    'State',
    'City',
    'Zip Code',
  ],
};

export const importTableHeader = ['File Column', 'Crm Fields', 'Mapped'];
export const requiredColumns = ['Name', 'Deal Value'];
export const productOptions = ['Sales', 'Services', 'Marketing'];

export const importValidationSchema = (modalStep: any) => {
  let schema;
  modalStep === 3
    ? (schema = Yup.object().shape({
        importedFields: Yup.array().of(
          Yup.object().shape({
            crmFields: Yup.string().required('Required'),
          }),
        ),
      }))
    : (schema = Yup.object().shape({}));
  return schema;
};

export const importDefaultValues = {
  product: null,
  importDeals: null,
  importedFields: [
    {
      fileColumn: '',
      crmFields: null,
    },
  ],
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

export const importTableFields = (
  control: any,
  name: any,
  index: any,
  importLog: any,
) => {
  return [
    {
      id: 2355,
      data: (
        <RHFTextField
          name={`${name}.${index}.fileColumn`}
          control={control}
          size="small"
          disabled={true}
        />
      ),
    },
    {
      id: 4365,
      data: (
        <RHFAutocomplete
          name={`${name}.${index}.crmFields`}
          size="small"
          options={stepsData[importLog]}
          fullWidth
          required={true}
          placeholder={'Select'}
        />
      ),
    },
    {
      id: 5346,
      data: (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <AvailableIcon />
        </Box>
      ),
    },
  ];
};
