import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AIR_SALES } from '@/routesConstants/paths';
import { PAGINATION } from '@/config';
import {
  useDeleteInvoiceMutation,
  useGetInvoiceQuery,
  useUpdateInvoiceMutation,
  useLazyGetEmployeeListInvoiceQuery,
  useGetRulesForInvoiceQuery,
} from '@/services/airSales/invoices';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { enqueueSnackbar } from 'notistack';
import { isNullOrEmpty } from '@/utils';
import {
  usePutGiftCardValueMutation,
  usePutLoyaltyProgramConsumersPointsUpdateMutation,
  usePutVoucherValueMutation,
  useUpdateRedeemRewardMutation,
} from '@/services/airSales/quotes/loyality';

const useListView = () => {
  const router = useRouter();
  const { user }: any = useAuth();
  const orgId = user?.organization?._id;
  const employeeList = useLazyGetEmployeeListInvoiceQuery();

  const [selectedRow, setSelectedRow]: any = useState([]);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [rowId, setRowId] = useState(null);
  const [searchBy, setSearchBy] = useState(null);
  const [filterParams, setFilterParams] = useState({});
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [consumerData, setConsumerData]: any = useState();
  const [getRulesData, setGetRulesData]: any = useState();
  const [invoiceStatus, setInvoiceStatus]: any = useState();

  const paginationParams = {
    page: page,
    limit: pageLimit,
  };
  let searchPayLoad;
  if (searchBy) {
    searchPayLoad = { search: searchBy };
  }
  const methodsFilter: any = useForm();
  const { handleSubmit: handleMethodFilter, reset: resetFilters } =
    methodsFilter;
  const {
    data: InvoiceData,
    isLoading,
    isFetching,
  } = useGetInvoiceQuery({
    params: { ...paginationParams, ...searchPayLoad, ...filterParams },
  });

  // Dropdown Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleActionsMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleActionsMenuClose = () => {
    setAnchorEl(null);
  };

  // Filters
  const [openFilters, setOpenFilters] = useState(false);
  const handleOpenFilters = () => {
    setOpenFilters(true);
  };
  const handleCloseFilters = () => {
    setOpenFilters(false);
  };

  const onSubmitFilters = async (values: any) => {
    const { creationDate, createdBy, ...others } = values;
    setFilterParams(() => {
      const updatedParams = { ...others };
      if (creationDate != null) {
        updatedParams.creationDate = dayjs(creationDate).format(
          DATE_FORMAT.API,
        );
      }
      if (createdBy != null) {
        updatedParams.createdBy = createdBy?._id;
      }
      return updatedParams;
    });
    handleCloseFilters();
  };
  const handleFiltersSubmit = handleMethodFilter(onSubmitFilters);

  // Refresh
  const handleRefresh = () => {
    setPageLimit(PAGINATION?.PAGE_LIMIT);
    setPage(PAGINATION?.CURRENT_PAGE);
    setFilterParams({});
    resetFilters();
  };

  const handleIsViewPage = () => {
    handleActionsMenuClose();
    router.push(`${AIR_SALES?.SALES_INVOICES}/${rowId}`);
  };

  // Delete Invoices
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteInvoice, { isLoading: loadingDelete }] =
    useDeleteInvoiceMutation();
  const handleOpenModalDelete = () => {
    handleActionsMenuClose();
    setIsDeleteModal(true);
  };
  const handleCloseModalDelete = () => {
    setIsDeleteModal(false);
  };

  const handleDeleteInvoice = async () => {
    const ids = await selectedRow;
    try {
      await deleteInvoice(ids)?.unwrap();
      handleCloseModalDelete();
      setSelectedRow([]);
      enqueueSnackbar('Record has been deleted.', {
        variant: 'success',
      });
      setIsActionsDisabled(true);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  // Update Status
  const [updateInvoice, { isLoading: loadingUpdateInvoice }] =
    useUpdateInvoiceMutation();

  const [updateRedeemReward] = useUpdateRedeemRewardMutation();
  const [updateConsumerPoints] =
    usePutLoyaltyProgramConsumersPointsUpdateMutation();
  const [updateGiftCardApi] = usePutGiftCardValueMutation();
  const [updateVoucherApi] = usePutVoucherValueMutation();

  const { data: RulesData, refetch: refetchRulesData } =
    useGetRulesForInvoiceQuery(
      {
        id: consumerData?.quote?.consumer?._id,
        quetoAmount: consumerData?.quote?.subTotal,
        amount: consumerData?.quote?.subTotal,
        productQuantity: consumerData?.quote?.products?.length,
      },
      { skip: isNullOrEmpty(consumerData) },
    );

  useEffect(() => {
    setGetRulesData(RulesData);
  }, [RulesData]);

  useEffect(() => {
    if (!isNullOrEmpty(getRulesData) && invoiceStatus === 'PAID') {
      const consumersPayload = {
        lastTransactionDate: dayjs()?.format('YYYY-MM-DD'),
        currentPointBalance: `${
          consumerData?.quote?.consumer?.currentPointBalance +
          getRulesData?.totalDiscount
        }`,
        totalPointsEarned: `${
          consumerData?.quote?.consumer?.totalPointsEarned +
          getRulesData?.totalDiscount
        }`,
        numberOfTransactions: `${
          consumerData?.quote?.consumer?.numberOfTransactions + 1
        }`,
        firstPointsReceptionDate:
          consumerData?.quote?.consumer?.numberOfTransactions >= 1
            ? dayjs(consumerData?.quote?.consumer?.lastTransactionDate).format(
                DATE_FORMAT?.API,
              )
            : dayjs()?.format('YYYY-MM-DD'),
        ids: [consumerData?.quote?.consumer?._id],
      };
      updateConsumerPoints(consumersPayload)?.unwrap();
    }
  }, [!isNullOrEmpty(getRulesData), consumerData?.quote?.consumer?._id]);

  const handleUpdateStatus = async (status: string, Data: any) => {
    setConsumerData(null);
    setConsumerData(Data);
    setInvoiceStatus(status);
    // Check if refetchRulesData is defined before calling it
    if (consumerData) {
      refetchRulesData();
    }

    const redeemRewardDataArray = Data?.quote?.loyaltyRewards
      ?.map((reward: any) => {
        const matchingRewardData = Data?.quote?.loyaltyRewardsData?.find(
          (data: any) => data?._id === reward?._id,
        );

        if (matchingRewardData) {
          return {
            id: reward?._id,
            redeemedQuantity: matchingRewardData?.redeemedQuantity + 1,
            escrowRedeemedQuantity:
              matchingRewardData?.escrowRedeemedQuantity === 0
                ? 0
                : matchingRewardData?.escrowRedeemedQuantity - 1,
            redeemedRewardPerConsumer: {
              consumerId: Data?.quote?.consumer?._id,
              quotesId: Data?.quote?._id,
              escrowStatus: 'Done',
            },
          };
        }
        return null;
      })
      ?.filter((item: any) => item !== null);

    const giftCardData = {
      queryParams: { id: Data?.quote?.loyaltyGiftCards?._id },
      body: {
        escrowAmount: `${Data?.quote?.loyaltyGiftCardsData?.currentamount} - ${Data?.quote?.loyaltyGiftCards?.value}`,
        spentamount: `${Data?.quote?.loyaltyGiftCardsData?.currentamount} + ${Data?.quote?.loyaltyGiftCards?.value}`,
        transactionAmount: Data?.quote?.loyaltyGiftCards?.value,
        escrowAmountStatus: 'Done',
        quotesId: Data?.quote?._id,
      },
    };

    const voucherData = {
      queryParams: {
        voucherCode: Data?.quote?.loyaltyVouchersData?.voucherCode,
        consumerId: Data?.quote?.consumer?._id,
      },
      body: {
        ascrowRedeemedVoucherLimit:
          Data?.quote?.loyaltyVouchersData?.ascrowRedeemedVoucherLimit === 0
            ? 0
            : Data?.quote?.loyaltyVouchersData?.ascrowRedeemedVoucherLimit - 1,
        redeemedVoucherLimit:
          Data?.quote?.loyaltyVouchersData?.redeemedVoucherLimit + 1,
        redeemedPerConsumer: {
          escrowStatus: 'Done',
        },
      },
    };

    const payLoad = {
      status: status,
    };
    try {
      await updateInvoice({ id: Data?._id, body: payLoad })
        ?.unwrap()
        ?.then((data: any) => {
          if (data?.data) {
            enqueueSnackbar(
              `This invoice is ${
                status === 'PAID'
                  ? 'Paid'
                  : status === 'DRAFT'
                    ? 'Draft'
                    : 'Published'
              } now`,
              {
                variant: 'success',
              },
            );
            if (status === 'PAID') {
              try {
                if (!isNullOrEmpty(Data?.quote?.loyaltyRewards)) {
                  updateRedeemReward({
                    body: redeemRewardDataArray,
                  })?.unwrap();
                }
                if (!isNullOrEmpty(Data?.quote?.loyaltyGiftCards)) {
                  updateGiftCardApi(giftCardData).unwrap();
                }
                if (!isNullOrEmpty(Data?.quote?.loyaltyVouchers)) {
                  updateVoucherApi(voucherData).unwrap();
                }
              } catch (error: any) {}
            }
          }
        });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  return {
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,

    setSearchBy,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,

    InvoiceData,
    isLoading,
    isFetching,
    setPage,
    setPageLimit,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,

    isDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteInvoice,
    loadingDelete,

    employeeList,
    orgId,
    handleIsViewPage,
    handleUpdateStatus,
    loadingUpdateInvoice,
  };
};

export default useListView;
