import { RHFSelect, RHFSwitchableDatepicker } from '@/components/ReactHookForm';
import { Checkbox } from '@mui/material';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import useFaqs from './useFaqs';

export const faqsFilterValidationSchema = Yup.object().shape({
  faqCategory: Yup.string().trim().required('Field is Required'),
  createdBy: Yup.string().trim().required('Field is Required'),
  createdAt: Yup.string().trim().required('Field is Required'),
});

export const faqsFilterDefaultValues = {
  faqCategory: '',
  createdBy: '',
  createdAt: null,
};

export const faqsFilterFiltersDataArray = () => {
  const { dataGetFaqs } = useFaqs();
  const createdByOptions = dataGetFaqs?.data?.faqs?.reduce(
    (uniqueOptions: any, option: any) => {
      const createdById = option?.createdBy?._id;
      if (
        createdById &&
        !uniqueOptions.some((item: any) => item.value === createdById)
      ) {
        uniqueOptions.push({
          value: createdById,
          label: option?.createdBy?.name,
        });
      }
      return uniqueOptions;
    },
    [],
  );
  return [
    {
      componentProps: {
        name: 'faqCategory',
        label: 'Category',
        select: true,
      },
      options: [
        { value: 'SALES', label: 'Sales' },
        { value: 'MARKETING', label: 'Marketing' },
        { value: 'SERVICES', label: 'Services' },
        { value: 'OPERATIONS', label: 'Operations' },
        { value: 'LOYALTY_PROGRAM', label: 'Loyalty Program' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'createdBy',
        label: 'Created By',
        select: true,
      },
      options: createdByOptions,
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'createdAt',
        label: 'Created Date',
        fullWidth: true,
      },
      component: RHFSwitchableDatepicker,
      md: 12,
    },
  ];
};

export const columns = () => {
  const { handleRowSelect, isSelected } = useFaqs();

  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          name={info?.getValue()}
          checked={isSelected(info?.getValue())}
          onChange={(event: any) => handleRowSelect(event, info?.getValue())}
        />
      ),
      // cell: (info: any) => info?.getValue(),
      header: <></>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.faqQuestion,
      id: 'faqQuestion',
      cell: (info: any) => info?.getValue(),
      header: 'Question',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.faqCategory,
      id: 'faqCategory',
      isSortable: true,
      header: 'FAQ Category',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.faqAnswer,
      id: 'faqAnswer',
      isSortable: true,
      header: 'Answer',
      cell: (info: any) => {
        const response = info?.getValue().replace(/<[^>]*>/g, '');
        return <>{response}</>;
      },
    },
    {
      accessorFn: (row: any) => row?.createdBy,
      id: 'createdBy',
      isSortable: true,
      header: 'Created By',
      cell: (info: any) => info?.getValue().name,
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => dayjs(info?.getValue()).format('MM/DD/YYYY'),
    },
  ];
};
