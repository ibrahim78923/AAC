import { RHFSelect, RHFSwitchableDatepicker } from '@/components/ReactHookForm';
import { Checkbox } from '@mui/material';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import useFaqs from './useFaqs';
import { DATE_FORMAT } from '@/constants';

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
        !uniqueOptions.some((item: any) => item?.value === createdById)
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

export const columns = (
  selectedRow: any,
  setSelectedRow: any,
  setIsActionsDisabled: (value: boolean) => void,
  setRowId: any,
) => {
  const handleRowClick = (id: any) => {
    const selectedIndex = selectedRow?.indexOf(id);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRow, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRow.slice(1));
    } else if (selectedIndex === selectedRow.length - 1) {
      newSelected = newSelected.concat(selectedRow.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRow.slice(0, selectedIndex),
        selectedRow.slice(selectedIndex + 1),
      );
    }
    setSelectedRow(newSelected);
    setIsActionsDisabled(newSelected.length === 0);
    if (newSelected.length === 1) {
      setRowId(newSelected[0]);
    } else {
      setRowId(null);
    }
  };

  // Select All Row
  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    rows: any,
  ) => {
    if (event?.target?.checked) {
      const newSelected = rows?.map((n: any) => n?._id);
      setSelectedRow(newSelected);
      setIsActionsDisabled(false);
      return;
    }
    setSelectedRow([]);
    setIsActionsDisabled(true);
  };

  const isSelected = (id: any) => selectedRow?.indexOf(id) !== -1;

  return [
    {
      accessorFn: (row: any) => row._id,
      id: '_id',
      cell: (info: any) => {
        return (
          <Checkbox
            color="primary"
            checked={isSelected(info?.cell?.row?.original?._id)}
            name={info?.cell?.row?.original?._id}
            onClick={() => {
              handleRowClick(info?.cell?.row?.original?._id);
            }}
          />
        );
      },
      header: (info: any) => {
        const rows = info?.table?.options?.data;
        return (
          <Checkbox
            color="primary"
            indeterminate={
              selectedRow?.length > 0 && selectedRow?.length < rows?.length
            }
            checked={
              rows?.length > 0 &&
              selectedRow?.length === info?.table?.options?.data?.length
            }
            onChange={(event) => handleSelectAllClick(event, rows)}
          />
        );
      },
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
      cell: (info: any) => dayjs(info?.getValue()).format(DATE_FORMAT.UI),
    },
  ];
};
