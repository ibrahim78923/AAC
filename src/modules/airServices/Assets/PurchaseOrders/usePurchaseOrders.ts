import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues } from './PurchaseOrderFilter/PurchaseOrderFilter.data';
import { useRouter } from 'next/navigation';
import { AIR_SERVICES } from '@/constants';
import { PAGINATION } from '@/config';
import { EXPORT_TYPE, NOTISTACK_VARIANTS } from '@/constants/strings';
import { downloadFile } from '@/utils/file';
import { enqueueSnackbar } from 'notistack';
import {
  useGetPurchaseOrderListQuery,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetVendorDropdownQuery,
} from '@/services/airServices/assets/purchase-orders';

const { NEW_PURCHASE_ORDER } = AIR_SERVICES;

const usePurchaseOrders = () => {
  const router = useRouter();
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewPurchaseOrder, setIsNewPurchaseOrder] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [SelectedExportType, setSelectedExportType] = useState(
    EXPORT_TYPE?.XLS,
  );

  const params = {
    page: page,
    limit: pageLimit,
    search: searchValue,
  };

  const { data, isLoading, isError, isFetching, isSuccess }: any =
    useGetPurchaseOrderListQuery(params);

  const purchaseData = data?.data?.purchases;

  const metaData = data?.data?.meta;

  const methodsPurchaseOrderFilterForm = useForm({
    defaultValues,
  });
  const handleNewPurchaseOrder = () => {
    router?.push(NEW_PURCHASE_ORDER);
  };

  const submitPurchaseOrderFilterForm = async () => {};

  const resetPurchaseOrderFilterForm = async () => {
    methodsPurchaseOrderFilterForm?.reset();
    setIsDrawerOpen(false);
  };
  const excelExportHandler = async () => {
    try {
      const purchases = purchaseData || [];

      const formattedData = purchases.reduce((result: any, purchase: any) => {
        const orderDetails = {
          'Order Number': purchase.orderNumber,
          'Order Name': purchase.orderName,
          Vendor: purchase.vendorId,
          'Expected Delivery Date': purchase.expectedDeliveryDate,
          Status: purchase.status,
          'Total Cost (£)': purchase.subTotal,
        };

        return [...result, orderDetails];
      }, []);

      const headings = [
        'Order Number',
        'Order Name',
        'Vendor',
        'Expected Delivery Date',
        'Status',
        'Total Cost (£)',
      ];

      const csvContent = [
        headings.join(','),
        ...formattedData.map(
          (row: any) =>
            headings.map((key) => String(row[key])).join(',') + '\n',
        ),
      ];

      await downloadFile(csvContent, 'excel-export.csv', SelectedExportType);

      enqueueSnackbar('XLS File Download successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error) {
      enqueueSnackbar('Error exporting XLS file', {
        variant: purchaseData?.error ?? NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const csvExportHandler = async () => {
    try {
      const purchases = purchaseData || [];

      const formattedData = purchases.reduce((result: any, purchase: any) => {
        const orderDetails = {
          'Order Number': purchase.orderNumber,
          'Order Name': purchase.orderName,
          Vendor: purchase.vendorId,
          'Expected Delivery Date': purchase.expectedDeliveryDate,
          Status: purchase.status,
          'Total Cost (£)': purchase.subTotal,
        };

        return [...result, orderDetails];
      }, []);

      const headings = [
        'Order Number',
        'Order Name',
        'Vendor',
        'Expected Delivery Date',
        'Status',
        'Total Cost (£)',
      ];

      const csvContent = [
        headings.join(','),
        ...formattedData.map(
          (row: any) =>
            headings.map((key) => String(row[key])).join(',') + '\n',
        ),
      ];

      await downloadFile(csvContent, 'csv-export.csv', SelectedExportType);

      enqueueSnackbar('CSV File Download Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error) {
      enqueueSnackbar('Error exporting CSV file', {
        variant: purchaseData?.error ?? NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const departmentDropdown = useLazyGetDepartmentDropdownQuery();
  const vendorDropdown = useLazyGetVendorDropdownQuery();

  const handleExportTypeClick = (type: any) => {
    setSelectedExportType(type);
  };
  return {
    isDrawerOpen,
    setIsDrawerOpen,
    handleNewPurchaseOrder,
    methodsPurchaseOrderFilterForm,
    submitPurchaseOrderFilterForm,
    resetPurchaseOrderFilterForm,
    isNewPurchaseOrder,
    setIsNewPurchaseOrder,
    router,
    deleteModalOpen,
    setDeleteModalOpen,
    purchaseOrderData,
    setPurchaseOrderData,
    metaData,
    setPage,
    setPageLimit,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    page,
    pageLimit,
    purchaseData,
    searchValue,
    setSearchValue,
    handleExportTypeClick,
    csvExportHandler,
    excelExportHandler,
    departmentDropdown,
    vendorDropdown,
  };
};
export default usePurchaseOrders;
