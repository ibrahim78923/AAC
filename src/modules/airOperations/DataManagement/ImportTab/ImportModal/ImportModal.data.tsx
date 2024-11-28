import {
  RHFAutocomplete,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { Delete } from '@mui/icons-material';
import {
  FIELD_TYPES,
  IMPORT_ACTION_TYPE,
  PRODUCTS_LISTS,
} from '@/constants/strings';
import {
  DealsIcon,
  InventoryReportsIcon,
  MtTaskIcon,
  ProductCatalogIcon,
  VendorIcon,
} from '@/assets/icons';
import { IconButton } from '@mui/material';

export const productData = [
  {
    icon: InventoryReportsIcon,
    import: 'Services',
    title: 'Inventories',
    checkedValue: IMPORT_ACTION_TYPE?.INVENTORIES,
    desc: `Inventories manage all assets, resources, and materials necessary for the project's operation and maintenance.`,
  },
  {
    icon: ProductCatalogIcon,
    import: 'Services',
    title: 'Product Catalog',
    checkedValue: IMPORT_ACTION_TYPE?.PRODUCT_CATALOG,
    desc: 'Product catalog provides a detailed listing of all available products, including specifications and pricing.',
  },
  {
    icon: VendorIcon,
    import: 'Services',
    title: 'Vendors',
    checkedValue: IMPORT_ACTION_TYPE?.VENDORS,
    desc: 'Vendors manage supplier information and interactions, ensuring efficient procurement and inventory control.',
  },
  {
    icon: MtTaskIcon,
    import: 'Sales',
    title: 'Tasks',
    checkedValue: IMPORT_ACTION_TYPE?.TASKS,
    desc: 'The Tasks module streamlines workflow by assigning and tracking task completion for team members.',
  },
  {
    icon: DealsIcon,
    import: 'Sales',
    title: 'Deals',
    checkedValue: IMPORT_ACTION_TYPE?.DEALS,
    desc: 'The Deals module manages and tracks sales opportunities from initiation to closure.',
  },
];
export const stepsData: any = {
  inventories: [
    {
      _id: 'displayName',
      label: 'Display Name',
      groupBy: FIELD_TYPES?.MANDATORY_FIELD,
    },
    {
      _id: 'assetType',
      label: 'Asset Type',
      groupBy: FIELD_TYPES?.MANDATORY_FIELD,
    },
    {
      _id: 'impact',
      label: 'Impact',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'description',
      label: 'Description',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'assetLifeExpiry',
      label: 'Asset Life Expiry',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'locationId',
      label: 'Location Id',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'departmentId',
      label: 'Department Id',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'usedBy',
      label: 'Used By',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'assignedOn',
      label: 'Assigned On',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
  ],
  productCatalog: [
    {
      _id: 'name',
      label: 'Name',
      groupBy: FIELD_TYPES?.MANDATORY_FIELD,
    },
    {
      _id: 'assetType',
      label: 'Asset Type',
      groupBy: FIELD_TYPES?.MANDATORY_FIELD,
    },
    {
      _id: 'status',
      label: 'Status',
      groupBy: FIELD_TYPES?.MANDATORY_FIELD,
    },
    {
      _id: 'manufacturer',
      label: 'Manufacturer',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'modeOfProcurement',
      label: 'Mode Of Procurement',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'description',
      label: 'Description',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
  ],
  vendors: [
    {
      _id: 'name',
      label: 'Name',
      groupBy: FIELD_TYPES?.MANDATORY_FIELD,
    },
    {
      _id: 'contactName',
      label: 'Contact Name',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'phone',
      label: 'Phone',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'mobile',
      label: 'Mobile',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'email',
      label: 'Email',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'description',
      label: 'Description',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'address',
      label: 'Address',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'country',
      label: 'Country',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'state',
      label: 'State',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'city',
      label: 'City',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'zipCode',
      label: 'Zip Code',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
  ],
  deals: [
    {
      _id: 'dealName',
      label: 'Deal Name',
      groupBy: FIELD_TYPES?.MANDATORY_FIELD,
    },
    {
      _id: 'dealOwner',
      label: 'Deal Owner',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'amount',
      label: 'Amount',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'dealStage',
      label: 'Deal Stage',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'dealPipeline',
      label: 'Deal Pipeline',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'closedDate',
      label: 'Closed Date',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'email',
      label: 'Email',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
  ],
  tasks: [
    {
      _id: 'taskName',
      label: 'Task Name',
      groupBy: FIELD_TYPES?.MANDATORY_FIELD,
    },
    {
      _id: 'taskStatus',
      label: 'Task Status',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'linkedCompany',
      label: 'Linked Company',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'assignedUser',
      label: 'Assigned User',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'taskType',
      label: 'Task Type',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
    {
      _id: 'lastDate',
      label: 'Last Date',
      groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
    },
  ],
};

export const importTableHeader = ['File Column', 'Crm Fields', 'Action'];

export const productOptionsFunction = (hasAccounts: any) => {
  const options = [];
  if (hasAccounts?.includes(PRODUCTS_LISTS?.AIR_SALES)) {
    options?.push(IMPORT_ACTION_TYPE?.SALES);
  }
  if (hasAccounts?.includes(PRODUCTS_LISTS?.AIR_SERVICES)) {
    options?.push(IMPORT_ACTION_TYPE?.SERVICES);
  }
  return options;
};

export const importValidationSchema = (modalStep: any) => {
  let schema;
  modalStep === 3
    ? (schema = Yup?.object()?.shape({
        importedFields: Yup?.array()?.of(
          Yup?.object()?.shape({
            crmFields: Yup?.mixed()
              ?.nullable()
              ?.required('Selection is required'),
          }),
        ),
      }))
    : (schema = Yup?.object()?.shape({}));
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
export const importDataField = (productOptions: any) => [
  {
    id: 6457,
    tag: 'product',
    componentProps: {
      name: 'product',
      label: 'Product',
      required: true,
      options: productOptions,
      isOptionEqualToValue: (option: any, newValue: any) => option === newValue,
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
      fileType: 'CSV only (max 2.44 MB)',
      accept: { 'text/csv': ['.csv'] },
    },
    component: RHFDropZone,
    md: 12,
  },
];

export const importTableFields = (
  control: any,
  name: string,
  index: number,
  importLog: string,
  remove: any,
  filterMandatoryFields: any,
  fields: any,
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
          getOptionLabel={(option: any) => option?.label}
          isOptionEqualToValue={(option: any, newValue: any) =>
            option?._id === newValue?._id
          }
          sx={{ minWidth: '10rem' }}
          placeholder={'Select'}
        />
      ),
    },
    {
      id: 5346,
      data: (
        <IconButton
          onClick={() => remove(index)}
          sx={{ cursor: 'pointer' }}
          color="error"
          disabled={
            fields?.length <= filterMandatoryFields()?.length ? true : false
          }
        >
          <Delete />
        </IconButton>
      ),
    },
  ];
};
