import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { PAGINATION } from '@/config';
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
import { useCreateAssociationMutation } from '@/services/airSales/deals/view-details/association';
import {
  usePostDealsMutation,
  useGetAddLineItemsQuery,
} from '@/services/airSales/deals';
import { useGetContactAssociationsQuery } from '@/services/commonFeatures/contacts/associations';
import { useDeleteAssociationMutation } from '@/services/airSales/deals/view-details/association';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { DEAL_TYPE } from './Deal.data';

const useDeal = (contactId: any) => {
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
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchValue, setSearchValue] = useState(null);
  const [filterParams] = useState({
    page: page,
    limit: pageLimit,
    contactId: contactId,
    association_type: 'deals',
  });
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const { data: dataGetDeals, isLoading: loadingDeals } =
    useGetContactAssociationsQuery({
      params: { ...filterParams, ...searchPayLoad },
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
      methodsEditDeal.setValue('name', data?.name);
      methodsEditDeal.setValue('dealPipelineId', data?.dealPipelineId);
      methodsEditDeal.setValue('dealStageId', data?.dealStageId);
      methodsEditDeal.setValue('amount', data?.amount);
      methodsEditDeal.setValue('closeDate', new Date(data?.closeDate));
      methodsEditDeal.setValue('ownerId', data?.ownerId);
      methodsEditDeal.setValue('priority', data?.priority);
      methodsEditDeal.setValue('addLineItemId', data?.addLineItemId);
    }
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    resetEditDeal();
  };

  const [postDeals] = usePostDealsMutation();
  const [createAssociation, { isLoading: loadingCreateAssociation }] =
    useCreateAssociationMutation();
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
          await createAssociation({
            body: {
              dealId: response?.data?._id,
              contactId: contactId,
            },
          }).unwrap();
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
      dealId: values?.dealId?._id,
      contactId: contactId,
    };
    try {
      await createAssociation({
        body: payload,
      }).unwrap();
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
  const [deleteAssociation, { isLoading: loadingDeleteDeal }] =
    useDeleteAssociationMutation();

  const deleteDealAssociationHandler = async () => {
    try {
      await deleteAssociation({
        body: {
          dealId: dealRecordId,
          contactId: contactId,
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

  const theme = useTheme();
  const [searchName, setSearchName] = useState('');

  const [selectStage, setSelectStage] = useState('');
  const [selectPipline, setSelectPipline] = useState('');

  return {
    orgId,
    setPage,
    setPageLimit,
    searchValue,
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

    theme,
    setIsOpenAlert,
    searchName,
    setSearchName,
    setOpenDrawer,
    selectPipline,
    setSelectPipline,
    setSelectStage,
    selectStage,
    isLoadingAddDeal,
    handleAddDealSubmit,
    dealOwnersData,
    dealPipelineData,
    dealStagesData,
    addLineItemsData,
    loadingDeleteDeal,
    deleteDealAssociationHandler,
    dealType,
    handleChangeDealType,
    methodsExistingDeal,
    handleExsistingDealSubmit,
    loadingCreateAssociation,
  };
};

export default useDeal;
