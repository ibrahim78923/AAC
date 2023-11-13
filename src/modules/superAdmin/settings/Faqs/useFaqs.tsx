import { useState } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetFaqsQuery,
  usePostFaqsMutation,
} from '@/services/superAdmin/settings/faqs';
import { faqsFilterDefaultValues } from './Faqs.data';
import {
  addFaqsValidationSchema,
  addFaqsDefaultValues,
} from './AddFaq/AddFaq.data';

const useFaqs = () => {
  const [faqId, setFaqId] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [openFilters, setOpenFilters] = useState(false);
  const [openModalAddFaq, setOpenModalAddFaq] = useState(false);
  const defaultParams = { page: 1, limit: 5 };
  const [filterParams, setFilterParams] = useState(defaultParams);
  const methodsFilter: any = useForm({
    defaultValues: faqsFilterDefaultValues,
  });
  const { handleSubmit: handleMethodFilter, reset: resetFilters } =
    methodsFilter;
  const { data: dataGetFaqs, isLoading: loagingGetFaqs } =
    useGetFaqsQuery(filterParams);
  const [postAddFaq, { isLoading: loadingAddFaq }] = usePostFaqsMutation();

  const handleOpenFilters = () => {
    setOpenFilters(true);
  };
  const handleCloseFilters = () => {
    setOpenFilters(false);
  };

  const handleRefresh = () => {
    setFilterParams(defaultParams);
    setSearchValue('');
    resetFilters();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setFilterParams((prev) => {
      return {
        ...prev,
        search: event.target.value,
      };
    });
  };

  const onSubmitFilters = async (values: any) => {
    if (values?.faqCategory !== '') {
      setFilterParams((prev) => {
        return {
          ...prev,
          faqCategory: values.faqCategory,
        };
      });
    }
    if (values?.createdBy !== '') {
      setFilterParams((prev) => {
        return {
          ...prev,
          createdBy: values.createdBy,
        };
      });
    }
    if (values?.createAt != null) {
      if (!Array.isArray(values?.createdAt)) {
        setFilterParams((prev) => {
          return {
            ...prev,
            startDate: dayjs(values?.createdAt).format('YYYY-MM-DD'),
            endDate: dayjs(values?.createdAt).format('YYYY-MM-DD'),
          };
        });
      } else {
        setFilterParams((prev) => {
          return {
            ...prev,
            startDate: dayjs(values?.createdAt[0]).format('YYYY-MM-DD'),
            endDate: dayjs(values?.createdAt[1]).format('YYYY-MM-DD'),
          };
        });
      }
    }
    handleCloseFilters();
  };
  const handleFiltersSubmit = handleMethodFilter(onSubmitFilters);

  // const methodsAddJobPosting = useForm({
  //   resolver: yupResolver(jobPostingValidationSchema),
  //   defaultValues: jobPostingDefaultValues,
  // });

  // const onSubmitAddJobPost = async (values: any) => {
  //   const dateString = values?.deadline;
  //   const dateObject = new Date(dateString);
  //   const formattedDate = dateObject.toISOString();
  //   const payload = {
  //     ...values,
  //     deadline: formattedDate,
  //   };

  //   try {
  //     await postAddJobPost({ body: payload })?.unwrap();
  //     setOpenAddJobPost(false);
  //     enqueueSnackbar('Plan Modules Details Added Successfully', {
  //       variant: 'success',
  //     });
  //   } catch (error: any) {
  //     enqueueSnackbar('An error occured', {
  //       variant: 'error',
  //     });
  //   }
  // };

  // const { handleSubmit: handleMethodAddJobpost } = methodsAddJobPosting;

  // const handleSubmitAddJobPost = handleMethodAddJobpost(onSubmitAddJobPost);

  const methodsAddFaqs = useForm({
    resolver: yupResolver(addFaqsValidationSchema),
    defaultValues: addFaqsDefaultValues,
  });

  const { handleSubmit: handleMethodAddFaq, reset: resetAddFaqForm } =
    methodsAddFaqs;

  const handleOpenModalFaq = () => {
    setOpenModalAddFaq(true);
  };
  const handleCloseModalFaq = () => {
    setOpenModalAddFaq(false);
  };

  const onSubmitAddFaq = async (values: any) => {
    try {
      await postAddFaq({ body: values })?.unwrap();
      handleCloseModalFaq();
      enqueueSnackbar('FAQ added successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleAddFaqSubmit = handleMethodAddFaq(onSubmitAddFaq);

  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowSelect = (event: any, id: any) => {
    setFaqId(id);
    setSelectedRow((prevSelectedRow) => (prevSelectedRow === id ? null : id));
  };

  const isSelected = (id: any) => selectedRow === id;

  return {
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    loagingGetFaqs,
    dataGetFaqs,
    handleSearch,
    searchValue,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,
    openModalAddFaq,
    handleOpenModalFaq,
    handleCloseModalFaq,
    methodsAddFaqs,
    handleAddFaqSubmit,
    loadingAddFaq,
    resetAddFaqForm,
    handleRowSelect,
    isSelected,
    faqId,
  };
};

export default useFaqs;
