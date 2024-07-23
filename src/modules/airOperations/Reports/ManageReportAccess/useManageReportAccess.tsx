import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import {
  MANAGE_REPORT_ACCESS_TYPES,
  manageReportAccessDefaultValues,
  manageReportAccessFromFieldsDynamic,
  manageReportAccessValidationSchema,
} from './ManageReportAccess.data';
import { useEffect } from 'react';
import {
  useLazyGetUserAccessListDropdownListForReportsAccessManagementQuery,
  useManageReportAccessMutation,
} from '@/services/airOperations/reports';
import useAuth from '@/hooks/useAuth';
import { ARRAY_INDEX } from '@/constants/strings';

export const useManageReportAccess = (props: any) => {
  const {
    setIsPortalOpen,
    setSelectedReportLists,
    page,
    getReportListData,
    selectedReportLists,
  } = props;

  const auth: any = useAuth();
  const { _id: productId } = auth?.product;

  const [manageReportAccessTrigger, manageReportAccessStatus] =
    useManageReportAccessMutation();

  const methods = useForm<any>({
    defaultValues: manageReportAccessDefaultValues?.(),
    resolver: yupResolver(manageReportAccessValidationSchema),
  });

  const { handleSubmit, reset, control, clearErrors, setValue } = methods;

  const watchForAccessType = useWatch({
    control,
    name: 'accessType',
    defaultValue: '',
  });

  useEffect(() => {
    clearErrors();
  }, [watchForAccessType]);

  const { fields } = useFieldArray<any>({
    control,
    name: 'permissionsUsers',
  });
  const specificUserWatch = useWatch({
    control,
    name: 'specialUsers',
    defaultValue: [],
  });

  useEffect(() => {
    if (!!specificUserWatch?.length)
      setValue(
        'permissionsUsers',
        specificUserWatch?.map((item: any) => ({
          name: `${item?.firstName} ${item?.lastName}`,
          userId: item?._id,
        })),
      );
  }, [specificUserWatch]);

  const submitAssignedTicketsForm = async (formData: any) => {
    const filterFormData = filteredEmptyValues(formData);
    const body = {
      ...filterFormData,
      permissions:
        filterFormData?.access === MANAGE_REPORT_ACCESS_TYPES?.PRIVATE_TO_OWNER
          ? MANAGE_REPORT_ACCESS_TYPES?.EVERYONE_EDIT_AND_VIEW
          : filterFormData?.permissions,
      specialUsers:
        filterFormData?.access ===
        MANAGE_REPORT_ACCESS_TYPES?.SPECIFIC_USER_AND_TEAMS
          ? formData?.permissionsUsers?.map((user: any) => ({
              userId: user?.userId,
              permission: user?.permission,
            }))
          : [{}],
    };

    delete body?.everyoneAccess;
    delete body?.permissionsUsers;
    delete body?.dashboardWidgets;

    const apiDataParameter = {
      queryParams: {
        id: selectedReportLists?.[ARRAY_INDEX?.ZERO]?._id,
      },
      body: {
        ...body,
      },
    };

    try {
      await manageReportAccessTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Report access updated successfully');
      closeModal?.();
      await getReportListData?.(page);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeModal = () => {
    reset();
    setSelectedReportLists?.([]);
    setIsPortalOpen?.({});
  };

  const apiQueryUsers =
    useLazyGetUserAccessListDropdownListForReportsAccessManagementQuery();

  const manageReportAccessFromFields = manageReportAccessFromFieldsDynamic?.(
    apiQueryUsers,
    productId,
    fields,
  );

  return {
    methods,
    handleSubmit,
    submitAssignedTicketsForm,
    closeModal,
    manageReportAccessFromFields,
    manageReportAccessStatus,
  };
};
