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
import { ARRAY_INDEX } from '@/constants/strings';
import { ManageAccessReportFormFieldsI } from './ManageReportAccess.interface';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useGetReportLists } from '../ReportHooks/useGetReportLists';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { PAGINATION } from '@/config';
import {
  emptySelectedReportsList,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airOperations/reports/slice';
import { useManageOperationsReportAccessLevelMutation } from '@/services/airOperations/reports';

export const useManageReportAccess = () => {
  const [manageReportAccessTrigger, manageReportAccessStatus] =
    useManageOperationsReportAccessLevelMutation();

  const { getReportsList, page } = useGetReportLists();
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.operationsReportsLists?.isPortalOpen,
  );

  const selectedReportsList = useAppSelector(
    (state) => state?.operationsReportsLists?.selectedReportsList,
  );

  const totalRecords = useAppSelector(
    (state) => state?.operationsReportsLists?.totalRecords,
  );

  const refetchApi = async () => {
    const newPage =
      selectedReportsList?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage<any>(newPage));
    await getReportsList?.(newPage);
  };

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

  const submitMangeAccessForm = async (formData: any) => {
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
        id: selectedReportsList?.[ARRAY_INDEX?.ZERO]?._id,
      },
      body: {
        ...modifiedBody,
      },
    };

    try {
      await manageReportAccessTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Report access updated successfully');
      closeModal?.();
      await refetchApi?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeModal = () => {
    reset();
    dispatch(emptySelectedReportsList());
    dispatch(setIsPortalClose());
  };

  const manageReportAccessFromFields: ReactHookFormFieldsI[] =
    manageReportAccessFromFieldsDynamic?.(fields);

  return {
    methods,
    handleSubmit,
    submitMangeAccessForm,
    closeModal,
    manageReportAccessFromFields,
    manageReportAccessStatus,
    isPortalOpen,
  };
};
