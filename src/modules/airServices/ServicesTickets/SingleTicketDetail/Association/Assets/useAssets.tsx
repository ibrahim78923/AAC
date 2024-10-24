import { drawerInitialState } from '../Association.data';
import { useTheme } from '@mui/material';
import {
  TYPE_VALUES,
  getAssociateAssetsColumns,
  getAssociateOrderColumns,
} from './Assets.data';
import { useRouter } from 'next/router';
import {
  useGetAirServicesAssociateTicketsQuery,
  usePostAirServicesRemoveAssociateTicketsMutation,
} from '@/services/airServices/tickets/single-ticket-details/association';
import { useEffect, useState } from 'react';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useForm, useWatch } from 'react-hook-form';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';

export default function useAssets({ setIsDrawerOpen }: any) {
  const theme: any = useTheme();
  const router = useRouter();

  const [selected, setSelected] = useState([]);
  const [deleteModal, setDeleteModal] = useState({
    asset: false,
    order: false,
  });
  const [selectedAsset, setSelectedAsset] = useState('');

  const { ticketId } = router?.query;

  const methods = useForm({
    defaultValues: { type: TYPE_VALUES?.ASSETS },
  });

  const { control, reset } = methods;

  const type = useWatch({
    control,
    name: 'type',
    defaultValue: TYPE_VALUES?.ASSETS,
  });

  useEffect(() => {
    setSelected([]);
  }, [type]);

  const onClose = () => {
    setIsDrawerOpen(drawerInitialState);
    setSelected([]);
    reset();
  };

  const [postRemoveAssociateTicketsTrigger, postRemoveAssociateTicketsStatus] =
    usePostAirServicesRemoveAssociateTicketsMutation();

  // Asset
  const setAssetId = (id: any) => {
    setSelectedAsset(id);
    setDeleteModal({
      asset: true,
      order: false,
    });
  };

  const associateAssetsColumns = getAssociateAssetsColumns({
    theme,
    router,
    setAssetId,
  });

  const associateTicketsAssetsParameter = {
    queryParams: {
      recordId: ticketId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
      associationType: ASSOCIATIONS_API_PARAMS_FOR?.ASSETS,
    },
  };

  const {
    data: dataAssets,
    isLoading: isLoadingAssets,
    isFetching: isFetchingAssets,
    isError: isErrorAssets,
    isSuccess: isSuccessAssets,
  } = useGetAirServicesAssociateTicketsQuery(associateTicketsAssetsParameter, {
    refetchOnMountOrArgChange: true,
  });

  const removeTicketsAssociatesAssets = async () => {
    const postRemoveAssociateTicketsParameter = {
      body: {
        recordId: ticketId,
        recordType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
        operation: ASSOCIATIONS_API_PARAMS_FOR?.REMOVE,
        associateAssets: [selectedAsset],
      },
    };
    try {
      await postRemoveAssociateTicketsTrigger(
        postRemoveAssociateTicketsParameter,
      )?.unwrap();
      successSnackbar('Asset Detached Successfully!');
      setDeleteModal?.({
        asset: false,
        order: false,
      });
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setDeleteModal?.({
        asset: false,
        order: false,
      });
    }
  };

  // Order
  const setOrderId = (id: any) => {
    setSelectedAsset(id);
    setDeleteModal({
      asset: false,
      order: true,
    });
  };

  const associateOrderColumns = getAssociateOrderColumns({
    router,
    setOrderId,
  });

  const associateTicketsOrderParameter = {
    queryParams: {
      recordId: ticketId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
      associationType: ASSOCIATIONS_API_PARAMS_FOR?.PURCHASE_ORDER,
    },
  };

  const {
    data: dataOrder,
    isLoading: isLoadingOrder,
    isFetching: isFetchingOrder,
    isError: isErrorOrder,
    isSuccess: isSuccessOrder,
  } = useGetAirServicesAssociateTicketsQuery(associateTicketsOrderParameter, {
    refetchOnMountOrArgChange: true,
  });

  const removeTicketsAssociatesOrder = async () => {
    const postRemoveAssociateTicketsParameter = {
      body: {
        recordId: ticketId,
        recordType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
        operation: ASSOCIATIONS_API_PARAMS_FOR?.REMOVE,
        associatePurchaseOrders: [selectedAsset],
      },
    };
    try {
      await postRemoveAssociateTicketsTrigger(
        postRemoveAssociateTicketsParameter,
      )?.unwrap();
      successSnackbar('Asset Detached Successfully!');
      setDeleteModal?.({
        asset: false,
        order: false,
      });
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setDeleteModal?.({
        asset: false,
        order: false,
      });
    }
  };

  // Submission
  const submitHandler = async () => {
    if (type === TYPE_VALUES?.PURCHASE_ORDER) {
      const body = {
        recordId: ticketId,
        recordType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
        operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
        associatePurchaseOrders: selected,
      };
      const postRemoveAssociateTicketsParameter = {
        body,
      };
      try {
        await postRemoveAssociateTicketsTrigger(
          postRemoveAssociateTicketsParameter,
        )?.unwrap();
        successSnackbar('Asset(s) Associated Successfully!');
        onClose?.();
      } catch (error: any) {
        errorSnackbar(error?.data?.message);
      }
    }
    if (type === TYPE_VALUES?.ASSETS) {
      const body = {
        recordId: ticketId,
        recordType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
        operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
        associateAssets: selected,
      };
      const postRemoveAssociateTicketsParameter = {
        body,
      };
      try {
        await postRemoveAssociateTicketsTrigger(
          postRemoveAssociateTicketsParameter,
        )?.unwrap();
        successSnackbar('Asset(s) Associated Successfully!');
        onClose?.();
      } catch (error: any) {
        errorSnackbar(error?.data?.message);
      }
    }
  };

  return {
    onClose,
    submitHandler,
    selected,
    methods,
    type,
    setSelected,
    associateAssetsColumns,
    associateOrderColumns,
    dataAssets,
    isLoadingAssets,
    isFetchingAssets,
    isErrorAssets,
    isSuccessAssets,
    dataOrder,
    isLoadingOrder,
    isFetchingOrder,
    isErrorOrder,
    isSuccessOrder,
    deleteModal,
    setDeleteModal,
    removeTicketsAssociatesAssets,
    removeTicketsAssociatesOrder,
    postRemoveAssociateTicketsStatus,
  };
}
