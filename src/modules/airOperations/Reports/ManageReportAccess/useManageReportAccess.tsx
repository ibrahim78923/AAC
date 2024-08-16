import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useFieldArray,
  useForm,
  UseFormReturn,
  useWatch,
} from 'react-hook-form';
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
import { ARRAY_INDEX } from '@/constants/strings';
import { ManageAccessReportFormFieldsI } from './ManageReportAccess.interface';
import { ReportsListsComponentPropsI } from '../ReportLists/ReportLists.interface';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const useManageReportAccess = (props: ReportsListsComponentPropsI) => {
  const {
    setIsPortalOpen,
    setSelectedReportLists,
    page,
    getReportListData,
    selectedReportLists,
  } = props;

  const [manageReportAccessTrigger, manageReportAccessStatus] =
    useManageReportAccessMutation();

  const methods: UseFormReturn<ManageAccessReportFormFieldsI> = useForm<any>({
    defaultValues: manageReportAccessDefaultValues?.(),
    resolver: yupResolver(manageReportAccessValidationSchema),
  });

  const { handleSubmit, reset, control, clearErrors, setValue, getValues } =
    methods;

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

  const setPermissions = () => {
    const permissionUser = getValues('permissionsUsers');

    const userMap = new Map(
      specificUserWatch?.map((item: any) => [item?._id, item]),
    );

    const validUserIds = new Set(
      specificUserWatch?.map((item: any) => item?._id),
    );

    const updatedPermissionUser = permissionUser
      ?.filter((item: any) => validUserIds?.has(item?.id))
      ?.map((item: any) => {
        const mappedUser: any = userMap?.get(item?.id);
        if (mappedUser) {
          return {
            ...item,
            ...mappedUser,
            name: `${mappedUser?.firstName} ${mappedUser?.lastName}`,
            access: item?.access ?? '',
          };
        }
        return item;
      });

    const newEntries = specificUserWatch
      ?.filter(
        (item: any) =>
          !permissionUser?.some(
            (existingItem: any) => existingItem?.id === item?._id,
          ),
      )
      ?.map((item: any) => ({
        ...item,
        name: `${item?.firstName} ${item?.lastName}`,
        id: item?._id,
        access: item?.access ?? '',
      }));

    const finalResult = [...updatedPermissionUser, ...newEntries];
    setValue('permissionsUsers', finalResult);
  };

  useEffect(() => {
    setPermissions();
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
              id: user?.id,
              access: user?.access,
            }))
          : [{}],
    };

    delete body?.everyoneAccess;
    delete body?.permissionsUsers;
    delete body?.dashboardWidgets;

    const modifiedBody = {
      accessLevel: {
        type: body?.access,
        access: body?.permissions,
        ...(body?.access === MANAGE_REPORT_ACCESS_TYPES?.SPECIFIC_USER_AND_TEAMS
          ? { users: body?.specialUsers }
          : {}),
      },
    };

    const apiDataParameter = {
      queryParams: {
        id: selectedReportLists?.[ARRAY_INDEX?.ZERO]?._id,
      },
      body: {
        ...modifiedBody,
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

  const manageReportAccessFromFields: ReactHookFormFieldsI[] =
    manageReportAccessFromFieldsDynamic?.(apiQueryUsers, fields);

  return {
    methods,
    handleSubmit,
    submitAssignedTicketsForm,
    closeModal,
    manageReportAccessFromFields,
    manageReportAccessStatus,
  };
};
