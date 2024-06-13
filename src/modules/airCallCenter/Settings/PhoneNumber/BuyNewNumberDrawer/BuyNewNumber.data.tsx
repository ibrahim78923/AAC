import { EditNumberIcon } from '@/assets/icons';
import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import { Box, IconButton, InputAdornment } from '@mui/material';
import * as Yup from 'yup';

export const newNumberValidationSchema = Yup.object().shape({
  country: Yup.string(),
  state: Yup.string(),
  digit: Yup.string(),
  companyName: Yup.string()?.required('Field Required'),
  postalCode: Yup.string()?.required('Field Required'),
  flatUnit: Yup.string()?.required('Field Required'),
  buildingName: Yup.string()?.required('Field Required'),
  buildingNumber: Yup.string()?.required('Field Required'),
  streetName: Yup.string()?.required('Field Required'),
  townCity: Yup.string()?.required('Field Required'),
  countryCode: Yup.string()?.required('Field Required'),
});

export const newNumberDefaultValues = {
  country: '',
  state: '',
  digit: '',
  companyName: '',
  postalCode: '',

  flatUnit: '',
  buildingName: '',
  buildingNumber: '',
  streetName: '',
  townCity: '',
  countryCode: '',
};

export const newNumberArray = (isEditNumber: any, serIsEditNumber: any) => {
  const handleToggle = () => {
    serIsEditNumber((prevState: boolean) => !prevState); // Toggle the state
  };
  return [
    // {
    //   componentProps: {
    //     name: 'formType',
    //     label: 'Local',
    //     fullWidth: true,
    //   },
    //   component: RHFSwitch,
    //   isNumberDatils: [false],
    //   md: 12,
    // },
    {
      id: '01',
      componentProps: {
        name: 'country',
        label: 'Countries',
        fullWidth: true,
      },
      component: RHFTextField,
      isNumberDatils: [false],
      md: 12,
    },
    {
      id: '02',
      componentProps: {
        name: 'state',
        label: 'All States',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'us', label: 'US' },
        { value: 'uk', label: 'UK' },
        { value: 'pak', label: 'Pakistan' },
      ],
      component: RHFSelect,
      isNumberDatils: [false],
      md: 12,
    },
    {
      id: '03',
      componentProps: {
        name: 'digit',
        fullWidth: true,
        placeholder: 'By digits',
      },
      component: RHFTextField,
      isNumberDatils: [false],
      md: 12,
    },
    {
      id: '04',
      componentProps: {
        name: 'companyName',
        label: 'Company Name',
        fullWidth: true,
        required: true,
        placeholder: 'Enter Company Name',
      },
      component: RHFTextField,
      isNumberDatils: [true],
      md: 12,
    },
    {
      id: '05',
      componentProps: {
        name: 'postalCode',
        label: 'Postal Code',
        fullWidth: true,
        required: true,
        placeholder: 'Enter Postal Code',
      },
      component: RHFTextField,
      isNumberDatils: [true],
      md: 12,
    },
    {
      id: '06',
      componentProps: {
        name: 'compositeAddress',
        label: 'Address',
        required: true,
        fullWidth: true,
        placeholder: 'Enter Address',
        multiline: true,
        minRows: 3,
        disabled: isEditNumber ? true : false,
        InputProps: {
          endAdornment: (
            <Box sx={{ top: '320px', right: '30px' }}>
              <InputAdornment
                position="end"
                sx={{ top: '0px', alignItems: 'flex-end' }}
              >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleToggle}
                >
                  <EditNumberIcon />
                </IconButton>
              </InputAdornment>
            </Box>
          ),
        },
      },
      component: RHFTextField,
      isNumberDatils: [true],
      md: 12,
    },
    {
      id: '07',
      componentProps: {
        name: 'flatUnit',
        label: 'Flat/Unit',
        fullWidth: true,
        required: true,
        placeholder: '2154',
      },
      component: RHFTextField,
      isNumberDatils: [isEditNumber ? true : null],
      md: 12,
    },
    {
      id: '08',
      componentProps: {
        name: 'buildingName',
        label: 'Building Name',
        fullWidth: true,
        required: true,
        placeholder: '2154',
      },
      component: RHFTextField,
      isNumberDatils: [isEditNumber ? true : null],
      md: 12,
    },
    {
      id: '09',
      componentProps: {
        name: 'buildingNumber',
        label: 'Building Number',
        fullWidth: true,
        required: true,
        placeholder: '2154',
      },
      component: RHFTextField,
      isNumberDatils: [isEditNumber ? true : null],
      md: 12,
    },
    {
      id: '10',
      componentProps: {
        name: 'streetName',
        label: 'Street Name',
        fullWidth: true,
        required: true,
        placeholder: '2154',
      },
      component: RHFTextField,
      isNumberDatils: [isEditNumber ? true : null],
      md: 12,
    },
    {
      id: '11',
      componentProps: {
        name: 'townCity',
        label: 'Town/City',
        fullWidth: true,
        required: true,
        placeholder: '2154',
      },
      component: RHFTextField,
      isNumberDatils: [isEditNumber ? true : null],
      md: 12,
    },
    {
      id: '12',
      componentProps: {
        name: 'countryCode',
        label: 'Country',
        fullWidth: true,
        required: true,
        placeholder: '2154',
      },
      component: RHFTextField,
      isNumberDatils: [isEditNumber ? true : null],
      md: 12,
    },
  ];
};

// number detail array
export const numberDetails = [
  { no: '(267) 380 - 2781', state: 'Pennslyvania, US', ammount: '(£ 12.35)' },
  { no: '(267) 380 - 2783', state: 'Pennslyvania, UK', ammount: '(£ 22.95)' },
  { no: '(267) 380 - 2785', state: 'Pennslyvania, US', ammount: '(£ 2.45)' },
  { no: '(267) 380 - 2788', state: 'Pennslyvania, UK', ammount: '(£ 23.75)' },
  { no: '(267) 380 - 2794', state: 'Pennslyvania, US', ammount: '(£ 20.15)' },
];
