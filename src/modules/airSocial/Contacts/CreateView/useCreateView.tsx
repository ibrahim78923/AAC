import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useLazyGetOrganizationUsersQuery } from '@/services/dropdowns';
import {
  useLazyGetLifeCycleStagesQuery,
  useLazyGetContactsStatusQuery,
} from '@/services/common-APIs';
import { usePostContactsViewMutation } from '@/services/commonFeatures/contacts';
import {
  createViewDefaultValues,
  createViewValidationSchema,
} from './CreateView.data';

const useCreateView = (sharedWithvalue: string) => {
  const { user }: any = useAuth();
  // const teamId = '6663f6c093824f083240ed0c' || null;
  const teamId = null;
  const orgId = user?.organization?._id;
  const contactOwnerData = useLazyGetOrganizationUsersQuery();
  const contactStatusData = useLazyGetContactsStatusQuery();
  const lifeCycleStagesData = useLazyGetLifeCycleStagesQuery();

  const [postContactsView, { isLoading: loadingCreateView }] =
    usePostContactsViewMutation();
  const methodsCreateView = useForm({
    resolver: yupResolver(createViewValidationSchema),
    defaultValues: createViewDefaultValues,
  });

  const { handleSubmit, reset } = methodsCreateView;

  const onSubmit = async (values: any, closeDrawer: any) => {
    const payload: any = {
      sharedWith: sharedWithvalue,
    };
    if (sharedWithvalue === 'MY_TEAM') {
      payload['teamId'] = teamId;
    }
    Object.entries(values)?.forEach(([key, value]: any) => {
      if (value !== undefined && value !== null && value !== '') {
        switch (key) {
          case 'createdAtFilter':
            payload[key] = dayjs(value).format(DATE_FORMAT?.API);
            break;
          case 'contactOwnerId':
          case 'lifeCycleStageId':
          case 'statusId':
          case 'createdByFilter':
            payload[key] = value?._id;
            break;
          default:
            payload[key] = value;
            break;
        }
      }
    });

    try {
      await postContactsView({ body: payload })?.unwrap();
      closeDrawer();
      enqueueSnackbar('Contact has been Added Successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const submitCreateView = (closeDrawer: any) =>
    handleSubmit((values) => onSubmit(values, closeDrawer));

  return {
    orgId,
    loadingCreateView,
    submitCreateView,
    methodsCreateView,
    contactOwnerData,
    lifeCycleStagesData,
    contactStatusData,
    reset,
    teamId,
  };
};

export default useCreateView;
