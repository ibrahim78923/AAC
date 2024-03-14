import { useState } from 'react';
import { useRouter } from 'next/router';
import { AIR_SALES } from '@/routesConstants/paths';
import { PAGINATION } from '@/config';
import { useGetInvoiceQuery } from '@/services/airSales/invoices';
import { useForm } from 'react-hook-form';

const useListView = () => {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState(null);
  const [searchBy, setSearchBy] = useState('');
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const params = {
    ...(searchBy && { search: searchBy }),
    page,
    limit,
  };
  const { data: InvoiceData, isLoading } = useGetInvoiceQuery({
    params: params,
  });

  const handleClose = () => {
    setSelectedValue(null);
  };

  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  const handleIsViewPage = () => {
    handleClose;
    router.push(AIR_SALES?.SALES_VIEW_INVOICES);
  };

  const handleDeleteModal = () => {
    handleClose();
    setIsDeleteModal(true);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onSubmit = () => {};

  const methods: any = useForm();
  const { handleSubmit } = methods;

  return {
    selectedValue,
    searchBy,
    isDeleteModal,
    setSearchBy,
    setSelectedValue,
    setIsDeleteModal,
    handleClose,
    handleClick,
    handleIsViewPage,
    handleDeleteModal,
    InvoiceData,
    isLoading,
    setPage,
    setPageLimit,
    isDrawerOpen,
    setIsDrawerOpen,
    onSubmit,
    handleSubmit,
    methods,
  };
};

export default useListView;
