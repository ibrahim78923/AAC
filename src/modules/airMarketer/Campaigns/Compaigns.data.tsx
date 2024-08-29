import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';
// import { ROLES } from '@/constants/strings';
// import { dynamicFormInitialValue, dynamicFormValidationSchema } from '@/utils/dynamic-forms';
// import * as Yup from 'yup';

// export const validationSchema = (form: any) => {
//   const formSchema: any = dynamicFormValidationSchema(form);
//   return Yup?.object()?.shape({
//     title: Yup?.string()?.required('Field is Required'),
//     ...formSchema,
//   });
// }

// export const initvalues = {
//   title: '',
//   campaignOwner: '',
//   startDate: undefined,
//   endDate: undefined,
//   campaignGoal: '',
//   campaignStatus: '',
//   description: '',
//   campaignAudience: '',
//   campaignBudget: null,
// };

// export const campaignArray = (userListData: any, organizationId: any) => {
//   return [
//     {
//       componentProps: {
//         name: 'title',
//         label: 'Title',
//         placeholder: 'Enter title',
//         fullWidth: true,
//         required: true,
//       },
//       component: RHFTextField,
//       md: 12,
//     },
//     {
//       componentProps: {
//         name: 'campaignOwner',
//         label: 'Campaign Owner',
//         fullWidth: true,
//         placeholder: 'Select campaign owner',
//         apiQuery: userListData,
//         getOptionLabel: (item: any) =>
//           item ? `${item?.firstName} ${item?.lastName}` : '',
//         externalParams: {
//           role: ROLES?.ORG_EMPLOYEE,
//           organization: organizationId,
//         },
//         queryKey: 'role',
//       },
//       component: RHFAutocompleteAsync,
//       md: 12,
//     },
//     {
//       componentProps: {
//         name: 'startDate',
//         label: 'Start Date',
//         placeholder: 'Select start date',
//         fullWidth: true,
//       },
//       component: RHFSwitchableDatepicker,
//       md: 12,
//     },
//     {
//       componentProps: {
//         name: 'endDate',
//         label: 'End Date',
//         placeholder: 'Select end date',
//         fullWidth: true,
//       },
//       component: RHFSwitchableDatepicker,
//       md: 12,
//     },
//     {
//       componentProps: {
//         name: 'campaignGoal',
//         label: 'Campaign Goal',
//         placeholder: 'Enter goal',
//         fullWidth: true,
//       },
//       component: RHFTextField,
//       md: 12,
//     },
//     {
//       componentProps: {
//         name: 'campaignAudience',
//         label: 'Campaign Audience',
//         placeholder: 'Enter campaign audience',
//         fullWidth: true,
//       },
//       component: RHFTextField,
//       md: 12,
//     },
//     {
//       componentProps: {
//         name: 'campaignBudget',
//         label: 'Campaign Budget (₤)',
//         placeholder: 'Enter Amount',
//         type: 'number',
//         InputProps: { inputProps: { min: 0 } },
//       },
//       component: RHFTextField,
//     },
//     {
//       componentProps: {
//         label: 'Campaign Status',
//         name: 'campaignStatus',
//         fullWidth: true,
//         placeholder: 'Select status',
//         options: ['Scheduled', 'Inprogress', 'Active', 'Paused', 'Completed'],
//       },

//       component: RHFAutocomplete,
//       md: 12,
//     },
//     {
//       componentProps: {
//         name: 'description',
//         fullWidth: true,
//       },
//       component: RHFEditor,
//       md: 12,
//     },
//   ];
// };

export const compareInitialVals = {
  startDate: '',
  endDate: '',
  selectFirstCampaign: '',
  selectSecondCampaign: '',
};

export const compareCampaignArray = [
  {
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
      select: false,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
      select: false,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'selectFirstCampaign',
      label: 'Select Campaign 1',
      fullWidth: true,
      select: true,
    },
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'selectSecondCampaign',
      label: 'Select Campaign 2',
      fullWidth: true,
      select: true,
    },
    component: RHFSelect,
    md: 12,
  },
];
