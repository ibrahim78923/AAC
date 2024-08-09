import {
  RHFAutocomplete,
  RHFFileImport,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { Delete } from '@mui/icons-material';
import { IMPORT_ACTION_TYPE } from '@/constants/strings';

export const productData = [
  {
    icon: {},
    import: 'Services',
    title: 'Inventories',
    checkedValue: IMPORT_ACTION_TYPE?.INVENTORIES,
    desc: `Inventories manage all assets, resources, and materials necessary for the project's operation and maintenance.`,
  },
  {
    icon: {},
    import: 'Services',
    title: 'Product Catalog',
    checkedValue: IMPORT_ACTION_TYPE?.PRODUCT_CATALOG,
    desc: 'Product catalog provides a detailed listing of all available products, including specifications and pricing.',
  },
  {
    icon: {},
    import: 'Services',
    title: 'Vendors',
    checkedValue: IMPORT_ACTION_TYPE?.VENDORS,
    desc: 'Vendors manage supplier information and interactions, ensuring efficient procurement and inventory control.',
  },
  {
    icon: {},
    import: 'Sales',
    title: 'Tasks',
    checkedValue: IMPORT_ACTION_TYPE?.TASKS,
    desc: 'The Tasks module streamlines workflow by assigning and tracking task completion for team members.',
  },
  {
    icon: {},
    import: 'Sales',
    title: 'Deals',
    checkedValue: IMPORT_ACTION_TYPE?.DEALS,
    desc: 'The Deals module manages and tracks sales opportunities from initiation to closure.',
  },
];
export const stepsData: any = {
  inventories: [
    'displayName',
    'assetType',
    'impact',
    'description',
    'assetLifeExpiry',
    'location',
    'department',
    'assignedOn',
    'usedBy',
    'attachment',
  ],
  productCatalog: [
    'name',
    'assetType',
    'manufacturer',
    'status',
    'modeOfProcurement',
    'description',
  ],
  vendors: [
    'name',
    'contactName',
    'phone',
    'mobile',
    'email',
    'description',
    'address',
    'country',
    'state',
    'city',
    'zipCode',
  ],
  DEALS: [
    'Deal Owner',
    'Deal Name',
    'Amount',
    'Deal Stage',
    'Deal Pipeline',
    'Closed Date',
    'Email',
  ],
  TASKS: [
    'Task Name',
    'Task Status',
    'Linked Company',
    'Assigned User',
    'Task Type',
    'Last Date',
  ],
};

export const importTableHeader = ['File Column', 'Crm Fields', 'Action'];
export const productOptions = ['Sales', 'Services'];

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
  remove: any,
) => {
  return [
    {
      id: 2355,
      data: (
        <RHFTextField
          name={`${name}.${index}.fileColumn`}
          control={control}
          size="small"
          sx={{ minWidth: '10rem' }}
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
          sx={{ minWidth: '10rem' }}
          placeholder={'Select'}
        />
      ),
    },
    {
      id: 5346,
      data: (
        <Delete
          onClick={() => remove(index)}
          sx={{ cursor: 'pointer' }}
          color="error"
        />
      ),
    },
  ];
};
