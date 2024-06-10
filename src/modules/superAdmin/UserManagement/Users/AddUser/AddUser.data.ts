import { Typography } from '@mui/material';
import { RHFMultiCheckbox, RHFSelect } from '@/components/ReactHookForm';
import RHFTextField from '@/components/ReactHookForm/RHFTextField';
import useUserManagement from '../../useUserManagement';
import * as Yup from 'yup';
import { PRODUCT_USER_STATUS } from '@/constants/strings';

// commented this code for future use
// import { useGetSuperAdminRolesQuery } from '@/services/superAdmin/user-management/users';

export const CompanyOwnerValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Field is Required')
    .matches(
      /^[A-Za-z\s]+$/,
      'Only alphabetic characters and spaces are allowed',
    ),
  lastName: Yup.string()
    .required('Field is Required')
    .matches(
      /^[A-Za-z\s]+$/,
      'Only alphabetic characters and spaces are allowed',
    ),
  // commented this code for future use
  // adminRoleId: Yup.string().required('Field is Required'),
  email: Yup.string()
    .required('Field is Required')
    .email('Invalid email address'),
  crn: Yup.string().required('Field is Required'),
  phoneNumber: Yup.string().matches(/^\+\d{1,}$/, 'Invalid phone number'),
});
export const orgEmployeeValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Field is Required')
    .matches(
      /^[A-Za-z\s]+$/,
      'Only alphabetic characters and spaces are allowed',
    ),
  lastName: Yup.string()
    .required('Field is Required')
    .matches(
      /^[A-Za-z\s]+$/,
      'Only alphabetic characters and spaces are allowed',
    ),
  email: Yup.string()
    .required('Field is Required')
    .email('Invalid email address'),
  phoneNumber: Yup.string()
    .nullable() // Allow null or undefined values
    .matches(/^\+\d{1,}(\s\d+)*$/, 'Invalid phone number')
    .transform((value, originalValue) => {
      if (
        originalValue === '' ||
        originalValue === null ||
        originalValue === undefined
      ) {
        return null; // Convert empty string or null/undefined to null
      }
      return value;
    }),
  postCode: Yup.string()
    .required('Field is Required')
    .matches(/^[0-9]+$/, 'Must be a number'),
  address: Yup.string()?.required('Field is Required'),
  jobTitle: Yup.string()
    .nullable() // Allow null or undefined values
    .matches(/^[A-Za-z]*$/, 'Only alphabetic characters are allowed') // Validate alphabetic characters if provided
    .transform((value, originalValue) => {
      if (
        originalValue === '' ||
        originalValue === null ||
        originalValue === undefined
      ) {
        return null; // Convert empty string or null/undefined to null
      }
      return value;
    }),
  facebookUrl: Yup.string().url('Please enter a valid URL').optional(),
  linkedInUrl: Yup.string().url('Please enter a valid URL').optional(),
});

export const superAdminValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Field is Required')
    .matches(
      /^[A-Za-z\s]+$/,
      'Only alphabetic characters and spaces are allowed',
    ),
  lastName: Yup.string()
    .required('Field is Required')
    .matches(
      /^[A-Za-z\s]+$/,
      'Only alphabetic characters and spaces are allowed',
    ),
  // commented this code for future use
  // adminRoleId: Yup.string().required('Field is Required'),
  email: Yup.string()
    .required('Field is Required')
    .email('Invalid email address'),
  phoneNumber: Yup.string()
    .nullable() // Allow null or undefined values
    .matches(/^\+\d{1,}(\s\d+)*$/, 'Invalid phone number')
    .transform((value, originalValue) => {
      if (
        originalValue === '' ||
        originalValue === null ||
        originalValue === undefined
      ) {
        return null; // Convert empty string or null/undefined to null
      }
      return value;
    }),
  postCode: Yup.string().required('Field is Required'),
  address: Yup.string()?.required('Field is Required'),
  jobTitle: Yup.string()
    .nullable()
    .matches(/^[A-Za-z]*$/, 'Only alphabetic characters are allowed')
    .transform((value, originalValue) => {
      if (
        originalValue === '' ||
        originalValue === null ||
        originalValue === undefined
      ) {
        return null;
      }
      return value;
    }),
  facebookUrl: Yup.string().url('Please enter a valid URL').optional(),
  linkedInUrl: Yup.string().url('Please enter a valid URL').optional(),
});

export const companyOwnerDefaultValues = {
  products: [],
};

export const addUsersArray = () => {
  const { productsList } = useUserManagement();
  const filteredProducts = productsList?.data?.filter(
    (item: any) => item?.status === PRODUCT_USER_STATUS?.active,
  );
  //for future use
  // const { data: superAdminRoles } = useGetSuperAdminRolesQuery();

  return [
    {
      componentProps: {
        name: 'firstName',
        label: 'First Name',
        required: true,
        placeholder: 'Enter First Name',
        fullWidth: true,
      },
      toShow: ['COMPANY_OWNER', 'SUPER_ADMIN', 'ORG_EMPLOYEE'],
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'lastName',
        label: 'Last Name',
        required: true,
        placeholder: 'Enter Last  Name',
        fullWidth: true,
      },
      toShow: ['COMPANY_OWNER', 'SUPER_ADMIN', 'ORG_EMPLOYEE'],
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'email',
        label: 'Email',
        required: true,
        placeholder: 'Enter Email',
        fullWidth: true,
      },
      toShow: ['COMPANY_OWNER', 'SUPER_ADMIN', 'ORG_EMPLOYEE'],
      component: RHFTextField,
      md: 12,
    },
    //for future use
    // commented this code for future use
    // {
    //   componentProps: {
    //     name: 'adminRoleId',
    //     label: 'Assign Role',
    //     fullWidth: true,
    //     select: true,
    //     required: true,
    //   },
    //   options: superAdminRoles?.data?.map((item: any) => ({
    //     value: item?._id,
    //     label: item?.name,
    //   })),
    //   component: RHFSelect,
    //   toShow: ['SUPER_ADMIN', 'COMPANY_OWNER'],
    //   md: 12,
    // },
    {
      componentProps: {
        name: 'crn',
        label: 'Company Registration Number(CRN)',
        required: true,
        placeholder: 'Enter CRN number',
        fullWidth: true,
      },
      toShow: ['COMPANY_OWNER'],
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'companyName',
        label: 'Company Name',
        required: true,
        placeholder: 'Enter Company Name',
        fullWidth: true,
      },
      toShow: ['COMPANY_OWNER'],
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'phoneNumber',
        label: 'Phone Number',
        placeholder: 'Enter Number',
        fullWidth: true,
      },
      toShow: ['COMPANY_OWNER', 'SUPER_ADMIN', 'ORG_EMPLOYEE'],
      component: RHFTextField,
      md: 12,
    },

    {
      componentProps: {
        color: '#7a7a7b',
        varient: 'h4',
        heading: 'Select Product(s)',
      },
      toShow: ['COMPANY_OWNER'],
      gridLength: 12,
      component: Typography,
    },
    {
      componentProps: {
        name: 'products',
        GridView: 6,
        isCheckBox: true,
        options: filteredProducts?.map((item: any) => ({
          value: item?._id,
          label: item?.name,
        })),
        fullWidth: true,
      },
      toShow: ['COMPANY_OWNER'],
      component: RHFMultiCheckbox,
      md: 12,
    },

    {
      componentProps: {
        name: 'postCode',
        label: 'Post Code',
        required: true,
        placeholder: 'Enter Post Code',
        fullWidth: true,
      },
      toShow: ['SUPER_ADMIN', 'ORG_EMPLOYEE'],
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'address',
        label: 'Address',
        required: true,
        placeholder: 'Address',
        multiline: true,
        rows: 4,
        fullWidth: true,
      },
      toShow: ['SUPER_ADMIN', 'ORG_EMPLOYEE'],
      component: RHFTextField,
      md: 12,
      subData: [
        {
          componentProps: {
            name: 'flat',
            label: 'Flat/Unit',
            placeholder: 'Enter Flat/Unit',
            fullWidth: true,
          },
          toShow: ['SUPER_ADMIN', 'ORG_EMPLOYEE'],
          component: RHFTextField,
          md: 12,
        },
        {
          componentProps: {
            name: 'buildingName',
            label: 'Building Name',
            placeholder: 'Enter Building Name',
            fullWidth: true,
          },
          toShow: ['SUPER_ADMIN', 'ORG_EMPLOYEE'],
          component: RHFTextField,
          md: 12,
        },
        {
          componentProps: {
            name: 'buildingNumber',
            label: 'Building Number',
            placeholder: 'Enter Building Number',
            fullWidth: true,
          },
          toShow: ['SUPER_ADMIN', 'ORG_EMPLOYEE'],
          component: RHFTextField,
          md: 12,
        },
        {
          componentProps: {
            name: 'streetName',
            label: 'Street Name',
            placeholder: 'Enter Street Name',
            fullWidth: true,
          },
          toShow: ['SUPER_ADMIN', 'ORG_EMPLOYEE'],
          component: RHFTextField,
          md: 12,
        },
        {
          componentProps: {
            name: 'city',
            label: 'Town/CIty',
            placeholder: 'Enter Town/City',
            fullWidth: true,
          },
          toShow: ['SUPER_ADMIN', 'ORG_EMPLOYEE'],
          component: RHFTextField,
          md: 12,
        },
        {
          componentProps: {
            name: 'country',
            label: 'Country',
            fullWidth: true,
            select: true,
          },
          options: [
            { value: 'pakistan', label: 'Pakistan' },
            { value: 'India', label: 'India' },
            { value: 'uk', label: 'UK' },
            { value: 'us', label: 'US' },
          ],
          component: RHFSelect,
          toShow: ['SUPER_ADMIN', 'ORG_EMPLOYEE'],
          md: 12,
        },
      ],
    },
    {
      componentProps: {
        name: 'jobTitle',
        label: 'Job Title',
        placeholder: 'Enter Job Title',
        fullWidth: true,
      },
      toShow: ['SUPER_ADMIN', 'ORG_EMPLOYEE'],
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'facebookUrl',
        label: 'Facebook URL',
        placeholder: 'Enter Facebook URL',
        fullWidth: true,
      },
      toShow: ['SUPER_ADMIN', 'ORG_EMPLOYEE'],
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'linkedInUrl',
        label: 'LinkedIn URL',
        placeholder: 'Enter LinkedIn URL',
        fullWidth: true,
      },
      toShow: ['SUPER_ADMIN', 'ORG_EMPLOYEE'],
      component: RHFTextField,
      md: 12,
    },
  ];
};
