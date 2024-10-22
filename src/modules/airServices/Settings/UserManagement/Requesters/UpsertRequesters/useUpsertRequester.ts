import { ROLES } from '@/constants/strings';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertRequestersArray,
  upsertRequestersDefaultValues,
  upsertRequestersValidationSchema,
} from './UpsertRequesters.data';
import { useRouter } from 'next/router';
import {
  usePatchRequesterMutation,
  usePostAddRequesterMutation,
} from '@/services/airServices/settings/user-management/requesters';
import {
  useLazyGetDynamicFieldsQuery,
  usePostDynamicFormAttachmentsMutation,
} from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicAttachmentsPost,
} from '@/utils/dynamic-forms';
import { useEffect, useState } from 'react';
import { IRequestersProps } from '../Requesters.interface';
import { useAuthCompanyVerificationMutation } from '@/services/auth';
import { UpsertRequestersResponseI } from './UpsertRequesters.interface';
import { isoDateString } from '@/utils/dateTime';
import { filteredEmptyValues } from '@/utils/api';

export const useUpsertRequester = (props: IRequestersProps) => {
  const { setIsDrawerOpen, singleRequesterDetails } = props;
  const router = useRouter();
  const [form, setForm] = useState<any>([]);

  const { _id } = router?.query;

  const [patchRequesterTrigger, patchRequesterStatus] =
    usePatchRequesterMutation();
  const [addRequesterTrigger, addRequesterStatus] =
    usePostAddRequesterMutation();

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();
  const [postAttachmentTrigger, postAttachmentStatus] =
    usePostDynamicFormAttachmentsMutation();
  const [igVerificationTrigger, igVerificationStatus] =
    useAuthCompanyVerificationMutation();
  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SERVICES,
      moduleType: DYNAMIC_FIELDS?.MT_ADD_REQUESTER,
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

  const methods: any = useForm({
    resolver: yupResolver(upsertRequestersValidationSchema?.(form)),
    defaultValues: upsertRequestersDefaultValues?.(
      singleRequesterDetails,
      form,
    ),
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(() => upsertRequestersDefaultValues(singleRequesterDetails, form));
  }, [singleRequesterDetails, reset, form]);

  const submitUpsertRequester = async (data: any) => {
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
            value = isoDateString(value);
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

      const payload = {
        firstName: filteredEmptyData?.firstName,
        lastName: filteredEmptyData?.lastName,
        email: filteredEmptyData?.email,
        jobTitle: filteredEmptyData?.jobTitle,
        phoneNumber: filteredEmptyData?.phoneNumber,
        timezone: filteredEmptyData?.timezone,
        role: ROLES?.ORG_REQUESTER,
        customFields,
      };

      if (!!_id) {
        editRequesterDetails?.(payload);
        return;
      }

      const response = (await addRequesterTrigger(
        payload,
      )?.unwrap()) as UpsertRequestersResponseI;
      const email = {
        email: response?.email,
      };
      await igVerificationTrigger({ email })?.unwrap();
      handleClose?.();
      successSnackbar('Requesters Added Successfully');
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const editRequesterDetails = async (data: any) => {
    delete data?.email;
    delete data?.role;
    delete data?.createdAt;

    const formData = {
      id: _id,
      ...data,
    };

    try {
      await patchRequesterTrigger(formData)?.unwrap();
      successSnackbar('Requesters edit successfully');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
    reset?.();
  };

  const upsertRequestersFormFields = upsertRequestersArray?.(
    singleRequesterDetails,
  );

  return {
    handleClose,
    methods,
    handleSubmit,
    submitUpsertRequester,
    addRequesterStatus,
    patchRequesterStatus,
    _id,
    upsertRequestersFormFields,
    getDynamicFieldsStatus,
    postAttachmentStatus,
    form,
    igVerificationStatus,
  };
};
