import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import {
  useGetCampaignsByIdQuery,
  usePostCampaignsMutation,
} from '@/services/airMarketer/campaigns';
import { DATE_FORMAT, indexNumbers } from '@/constants';
import { defaultValues, validationSchema } from './EditCampaign.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { DRAWER_TYPES, NOTISTACK_VARIANTS, ROLES } from '@/constants/strings';
import dayjs from 'dayjs';
import { useUpdateCampaignsMutation } from '@/services/airMarketer/campaigns';
import { useLazyGetUsersListDropdownQuery } from '@/services/airSales/deals';
import {
  useLazyGetDynamicFieldsQuery,
  usePostDynamicFormAttachmentsMutation,
} from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicAttachmentsPost,
} from '@/utils/dynamic-forms';
import { errorSnackbar, filteredEmptyValues } from '@/utils/api';
import { getSession } from '@/utils';
import { useGetUsersListQuery } from '@/services/airSales/deals';

const useEditCampaigns = (
  selectedRows: any,
  onClose: any,
  isOpenDrawer: any,
  setSelectedRows: any,
) => {
  const theme = useTheme();
  const { user }: any = getSession();
  const [form, setForm] = useState<any>([]);
  const userListData = useLazyGetUsersListDropdownQuery();
  const organizationId: any = user?.organization?._id;
  const { data: UserListData } = useGetUsersListQuery({
    role: ROLES?.ORG_EMPLOYEE,
    organization: organizationId,
  });

  const [updateCampaigns, { isLoading: updateCampaignLoading }] =
    useUpdateCampaignsMutation();

  const { data: compaignsDataById, isLoading: campaignByIdLoading } =
    useGetCampaignsByIdQuery(isOpenDrawer?.recId, {
      skip:
        !Array?.isArray(isOpenDrawer?.recId) ||
        isOpenDrawer?.recId?.length === indexNumbers?.ZERO,
    });

  // Dynamic fields starts here

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_MARKETING,
      moduleType: DYNAMIC_FIELDS?.MT_CAMPAIGN_CREATE,
    };
    const getDynamicFieldsParameters = { params };

    try {
      const res: any = await getDynamicFieldsTrigger(
        getDynamicFieldsParameters,
      )?.unwrap();
      setForm(res);
    } catch (error: any) {
      setForm([]);
    }
  };

  useEffect(() => {
    getDynamicFormData();
  }, []);

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema(form)),
    defaultValues: defaultValues?.(),
  });

  const [postCampaigns, { isLoading: createCampaignsLoading }] =
    usePostCampaignsMutation();

  const [postAttachmentTrigger, postAttachmentStatus] =
    usePostDynamicFormAttachmentsMutation();

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (isOpenDrawer?.type === DRAWER_TYPES?.EDIT) {
      reset(() => defaultValues(compaignsDataById?.data[0], form));
    }
  }, [compaignsDataById?.data, reset, form]);

  const onSubmit = async (data: any) => {
    const filteredEmptyData = filteredEmptyValues(data);

    const customFields: any = {};
    const body: any = {};
    const attachmentPromises: Promise<any>[] = [];

    try {
      dynamicAttachmentsPost({
        form,
        data,
        attachmentPromises,
        customFields,
        postAttachmentTrigger,
      });

      await Promise?.all(attachmentPromises);

      const customFieldKeys = new Set(
        form?.map((field: any) => field?.componentProps?.label),
      );

      Object?.entries(filteredEmptyData)?.forEach(([key, value]) => {
        if (customFieldKeys?.has(key)) {
          if (value instanceof Date) {
            value = value?.toISOString();
          }
          if (
            typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
            !Array?.isArray(value) &&
            value !== null
          ) {
            customFields[key] = { ...customFields[key], ...value };
          } else {
            customFields[key] = value;
          }
        } else {
          body[key] = value;
        }
      });

      if (Object?.keys(customFields)?.length > 0) {
        body.customFields = customFields;
      }

      if (isOpenDrawer?.type === DRAWER_TYPES?.EDIT) {
        submitUpdateCampaign(body);
        return;
      }

      const campaignBudget = body?.campaignBudget
        ? parseFloat(body?.campaignBudget)
        : null;

      const startDate = body?.startDate
        ? dayjs(body?.startDate[0])?.format(DATE_FORMAT?.API)
        : undefined;
      const endDate = body?.endDate
        ? dayjs(body?.endDate[0])?.format(DATE_FORMAT?.API)
        : undefined;
      body.campaignStatus = body.campaignStatus?.toLowerCase();

      const obj = {
        ...body,
        campaignBudget,
        startDate,
        endDate,
        campaignOwner: body?.campaignOwner?._id,
      };

      await postCampaigns({ body: obj })?.unwrap();
      enqueueSnackbar('Campaigns created successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      // reset();
      setSelectedRows([]);
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
    onClose();
  };

  const submitUpdateCampaign = async (body: any) => {
    body.campaignOwner = body?.campaignOwner?._id;
    body.campaignBudget = Number(body?.campaignBudget);

    const updateCampaignsParams = {
      id: selectedRows,
      body: body,
    };

    try {
      await updateCampaigns(updateCampaignsParams)?.unwrap();
      enqueueSnackbar('Campaign Updated Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset();
      onClose();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    createCampaignsLoading,
    getDynamicFieldsStatus,
    updateCampaignLoading,
    postAttachmentStatus,
    campaignByIdLoading,
    organizationId,
    UserListData,
    userListData,
    handleSubmit,
    onSubmit,
    methods,
    theme,
    form,
  };
};
export default useEditCampaigns;
