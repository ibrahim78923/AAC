import { RHFSelect, RHFSwitchableDatepicker } from '@/components/ReactHookForm';
import useCompanies from '../useCompanies';

export const FilterArray = () => {
  const { getCompanyContacts } = useCompanies();
  return [
    {
      componentProps: {
        name: 'industry',
        label: 'Industry',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'computerSoftware', label: 'Computer software' },
        { value: 'computerServices', label: 'Computer Services' },
        { value: 'construction', label: 'Construction' },
        { value: 'none', label: 'None' },
      ],
      component: RHFSelect,
      md: 12,
    },
    // commented for future use
    // {
    //   componentProps: {
    //     name: 'name',
    //     label: 'Company Name',
    //     fullWidth: true,
    //     select: true,
    //   },
    //   options: [
    //     { value: 'AirApple Cart', label: 'AirApple Cart' },
    //     { value: 'PhoenixBaker', label: 'PhoenixBaker' },
    //     { value: 'Foster App', label: 'Foster App' },
    //     { value: 'Share My Dine', label: 'Share My Dine' },
    //   ],
    //   component: RHFSelect,
    //   md: 12,
    // },
    // {
    //   componentProps: {
    //     name: 'crn',
    //     label: 'Company Registration Number',
    //     fullWidth: true,
    //     select: true,
    //   },
    //   options: [
    //     { value: 'AirApple Cart', label: 'AirApple Cart' },
    //     { value: 'PhoenixBaker', label: 'PhoenixBaker' },
    //     { value: 'Foster App', label: 'Foster App' },
    //     { value: 'Share My Dine', label: 'Share My Dine' },
    //   ],
    //   component: RHFSelect,
    //   md: 12,
    // },
    {
      componentProps: {
        name: 'ownerId',
        label: 'Company Owner',
        fullWidth: true,
        select: true,
      },
      options: getCompanyContacts?.data?.contacts?.map((item: any) => ({
        value: item?._id,
        label: `${item?.firstName} ${item?.lastName}`,
      })),
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'date',
        label: 'Created Date',
        fullWidth: true,
        placeholder: 'Created Date',
      },
      component: RHFSwitchableDatepicker,
      md: 12,
    },
  ];
};
