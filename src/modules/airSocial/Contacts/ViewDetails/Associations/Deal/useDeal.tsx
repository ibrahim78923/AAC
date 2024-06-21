import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import useAuth from '@/hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { DATE_FORMAT } from '@/constants';
import {
  dealDefaultValues,
  dealValidationSchema,
  existingDealValidationSchema,
  existingDealDefaultValues,
} from './DealEditorDrawer/DealEditorDrawer.data';
import { useLazyGetOrganizationUsersQuery } from '@/services/dropdowns';
import { useLazyGetDealPipeLineQuery } from '@/services/common-APIs';
import {
  useGetAssociationQuery,
  usePostAssociationMutation,
} from '@/services/commonFeatures/contacts/associations';
import {
  usePostDealsMutation,
  useGetAddLineItemsQuery,
} from '@/services/airSales/deals';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { DEAL_TYPE } from './Deal.data';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';

const useDeal = (contactId: any) => {
  const theme = useTheme();
  const { user }: any = useAuth();
  const orgId = user?.organization?._id;
  const dealOwnersData = useLazyGetOrganizationUsersQuery();
  const dealPipelineData = useLazyGetDealPipeLineQuery();
  const { data: addLineItems } = useGetAddLineItemsQuery({});
  const addLineItemsData = addLineItems?.data?.salesproducts?.map(
    (item: any) => ({
      value: item?._id,
      label: item?.name,
    }),
  );

  // Get Association Deals
  const [searchValue, setSearchValue] = useState(null);
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const filterParams = {
    recordId: contactId,
    recordType: 'contacts',
    associationType: 'deals',
  };
  const { data: dataGetDeals, isLoading: loadingDeals } =
    useGetAssociationQuery({
      params: { ...searchPayLoad, ...filterParams },
    });

  // Handle Change Deal type
  const [dealType, setDealType] = useState(DEAL_TYPE?.NEW_DEAL);
  const handleChangeDealType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDealType((event.target as HTMLInputElement).value);
  };

  // Drawer Edit New Deal
  const methodsEditDeal = useForm<any>({
    resolver: yupResolver(dealValidationSchema),
    defaultValues: dealDefaultValues,
  });
  const { handleSubmit, watch, reset: resetEditDeal }: any = methodsEditDeal;
  const methodsExistingDeal = useForm<any>({
    resolver: yupResolver(existingDealValidationSchema),
    defaultValues: existingDealDefaultValues,
  });
  const { handleSubmit: handleSubmitExisting, reset: resetExistingDeal }: any =
    methodsExistingDeal;

  useEffect(() => {
    resetExistingDeal();
    resetEditDeal();
  }, [dealType]);

  const selectedPipeline = watch('dealPipelineId');
  const dealStagesData = selectedPipeline?.stages?.map((stage: any) => ({
    value: stage?._id,
    label: stage?.name,
  }));
  const [drawerTitle, setDrawerTitle] = useState('View');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isDisabledFields, setIsDisabledFields] = useState(true);

  const handleOpenDrawer = (title: string, data: any) => {
    const flag = title === 'View';
    setDrawerTitle(title);
    setIsDisabledFields(flag);
    if (flag && data) {
      setDealType(DEAL_TYPE?.NEW_DEAL);
      methodsEditDeal.setValue('name', data?.name);
      methodsEditDeal.setValue('dealPipelineId', data?.dealPipeline);
      methodsEditDeal.setValue('dealStageId', data?.dealStage);
      methodsEditDeal.setValue('amount', data?.amount);
      methodsEditDeal.setValue('closeDate', new Date(data?.closeDate));
      methodsEditDeal.setValue('ownerId', data?.dealOwner);
      methodsEditDeal.setValue('priority', data?.priority);
      methodsEditDeal.setValue('addLineItemId', data?.addLineItemId);
    }
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setDealType(DEAL_TYPE?.NEW_DEAL);
  };

  const [postAssociation, { isLoading: loadingCreateAssociation }] =
    usePostAssociationMutation();
  const [postDeals] = usePostDealsMutation();
  const [isLoadingAddDeal, setLoadingAddDeal] = useState(false);

  const onSubmit = async (values: any) => {
    const payload: any = {};
    Object.entries(values)?.forEach(([key, value]: any) => {
      if (value !== undefined && value !== null && value !== '') {
        if (key === 'closeDate') {
          payload[key] = dayjs(value)?.format(DATE_FORMAT?.API);
        } else if (key === 'dealPipelineId' || key === 'ownerId') {
          payload[key] = value?._id;
        } else {
          payload[key] = value;
        }
      }
    });

    try {
      setLoadingAddDeal(true);
      const response = await postDeals({ body: payload })?.unwrap();
      if (!response?.data) {
        throw new Error('No data in response');
      }
      if (response?.data) {
        try {
          await postAssociation({
            body: {
              recordId: contactId,
              recordType: ASSOCIATIONS_API_PARAMS_FOR?.CONTACTS,
              operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
              dealIds: [response?.data?._id],
            },
          })?.unwrap();
          handleCloseDrawer();
          enqueueSnackbar('Deal created successfully', {
            variant: 'success',
          });
        } catch (error: any) {
          enqueueSnackbar('Error while creating deal', {
            variant: 'error',
          });
        }
      }
      setLoadingAddDeal(false);
    } catch (error) {
      setLoadingAddDeal(false);
      enqueueSnackbar('Error while creating deal', {
        variant: 'error',
      });
    }
  };
  const handleAddDealSubmit = handleSubmit(onSubmit);

  const onExistingDealSubmit = async (values: any) => {
    const payload: any = {
      recordId: contactId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.CONTACTS,
      operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
      dealIds: [values?.dealId?._id],
    };
    try {
      await postAssociation({
        body: payload,
      }).unwrap();
      handleCloseDrawer();
      enqueueSnackbar('Deal added successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('Error while adding deal', {
        variant: 'error',
      });
    }
  };
  const handleExsistingDealSubmit = handleSubmitExisting(onExistingDealSubmit);

  // Delete Modal
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [dealRecordId, setDealRecordId] = useState('');
  const handleOpenAlert = (id: string) => {
    setDealRecordId(id);
    setIsOpenAlert(true);
  };
  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const handleRemoveAssociation = async () => {
    try {
      await postAssociation({
        body: {
          recordId: contactId,
          recordType: ASSOCIATIONS_API_PARAMS_FOR?.CONTACTS,
          dealIds: [dealRecordId],
          operation: ASSOCIATIONS_API_PARAMS_FOR?.REMOVE,
        },
      })?.unwrap();
      enqueueSnackbar('Record Deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setIsOpenAlert(false);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    theme,
    orgId,
    setSearchValue,
    loadingDeals,
    dataGetDeals,
    drawerTitle,
    openDrawer,
    handleOpenDrawer,
    handleCloseDrawer,
    methodsEditDeal,
    isDisabledFields,
    isOpenAlert,
    handleOpenAlert,
    handleCloseAlert,
    setIsOpenAlert,
    setOpenDrawer,
    isLoadingAddDeal,
    handleAddDealSubmit,
    dealOwnersData,
    dealPipelineData,
    dealStagesData,
    addLineItemsData,
    handleRemoveAssociation,
    dealType,
    handleChangeDealType,
    methodsExistingDeal,
    handleExsistingDealSubmit,
    loadingCreateAssociation,
  };
};

export default useDeal;
