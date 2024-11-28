import { useForm } from 'react-hook-form';

import { useTheme } from '@mui/material';

import { detailsDefaultValues, detailsValidationSchema } from './Details.data';

import { yupResolver } from '@hookform/resolvers/yup';
import { useCompanyUpdateMutation } from '@/services/commonFeatures/companies';
import { useGetLifeCycleQuery } from '@/services/commonFeatures/contacts';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { getSession } from '@/utils';
import { useGetCompanyContactsQuery } from '@/services/common-APIs';
import { useEffect, useState } from 'react';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicFormInitialValue,
} from '@/utils/dynamic-forms';
import { filteredEmptyValues } from '@/utils/api';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const useDetails = (data: any) => {
  const [form, setForm] = useState<any>([]);
  const theme = useTheme();
  const [CompanyUpdate, { isLoading: updateIsLoading }] =
    useCompanyUpdateMutation();

  const { data: lifeCycleStages } = useGetLifeCycleQuery({});

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_COMMON,
      moduleType: DYNAMIC_FIELDS?.MT_COMPANY,
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

  const lifeCycleStagesData = lifeCycleStages?.data?.lifecycleStages?.map(
    (lifecycle: any) => ({ value: lifecycle?._id, label: lifecycle?.name }),
  );

  const { user } = getSession();

  const params = {
    page: 1,
    limit: 100,
    contactOwnerId: user?._id,
  };

  const { data: getCompanyContacts } = useGetCompanyContactsQuery(params);
  const UserListData = getCompanyContacts?.data?.contacts?.map((item: any) => ({
    value: item?._id,
    label: `${item?.firstName} ${item?.lastName}`,
  }));

  const [defaultValues, setDefaultValues] = useState(detailsDefaultValues);
  const initialValues: any = dynamicFormInitialValue(data, form);

  useEffect(() => {
    if (data) {
      const rowApiValues = {
        CompanyName: data?.name,
        DomainName: data?.domain,
        crn: data?.crn,
        CompanyOwner: data?.ownerId,
        PhoneNumber: data?.phone,
        Industry: data?.industry,
        CompanyType: data?.type,
        NumberOfEmployees: data?.noOfEmloyee,
        AnnualRevenue: data?.totalRevenue,
        City: data?.city,
        PostalCode: data?.postalCode,
        LifeCycleStage: data?.LifeCycleStage,
        LastActivityDate: data?.LastActivityDate,
        CreatedDate: new Date(data?.createdAt),
        time: data?.createdAt?.split('T')[1]?.substring(0, 5),
        LinkedInCompanyPage: data?.linkedInUrl,
        Address: data?.address,
        description: data?.description,
        ...initialValues,
      };
      setDefaultValues(rowApiValues);
    }
  }, [data]);

  const methodsDetails = useForm({
    resolver: yupResolver(detailsValidationSchema?.(form)),
    defaultValues,
  });

  useEffect(() => {
    methodsDetails.reset(defaultValues);
  }, [defaultValues, methodsDetails, data]);

  const onSubmit = async (values: any) => {
    const filteredEmptyData = filteredEmptyValues(values);

    const customFields: any = {};
    const body: any = {};

    const customFieldKeys = new Set(
      form?.map((field: any) => field?.componentProps?.label),
    );

    Object?.entries(filteredEmptyData)?.forEach(([key, value]) => {
      if (customFieldKeys?.has(key)) {
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

    const formData = new FormData();
    const appendIfExists = (key: string, value: any) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== '' &&
        !Number?.isNaN(value)
      ) {
        formData?.append(key, value);
      }
    };
    appendIfExists('domain', values?.DomainName);
    appendIfExists('name', values?.CompanyName);
    appendIfExists('ownerId', values?.CompanyOwner);
    appendIfExists('industry', values?.Industry);
    appendIfExists('type', values?.CompanyType);
    appendIfExists('noOfEmloyee', parseInt(values?.NumberOfEmployees));
    appendIfExists('totalRevenue', parseInt(values?.AnnualRevenue));
    appendIfExists('city', values?.City);
    appendIfExists('postalCode', values?.PostalCode);
    appendIfExists('address', values?.Address);
    appendIfExists('description', values?.description);
    appendIfExists('linkedInUrl', values?.LinkedInCompanyPage);
    appendIfExists('phone', values?.PhoneNumber);
    appendIfExists('crn', values?.CompanyRegistrationNumber);
    if (
      values?.LifeCycleStage !== undefined &&
      values?.LifeCycleStage !== null
    ) {
      appendIfExists('lifeCyleId', values.LifeCycleStage);
    }
    appendIfExists(
      'joiningDate',
      dayjs(values?.CreatedDate)?.format(DATE_FORMAT?.API),
    );
    formData.append('isDeleted', 'ACTIVE');
    formData.append('recordType', 'companies');

    if (body?.customFields) {
      formData?.append('customFields', JSON?.stringify(body?.customFields));
    }
    const updateCompanyApiParameters = {
      body: formData,
      id: data?._id,
    };
    try {
      await CompanyUpdate(updateCompanyApiParameters).unwrap();

      successSnackbar(`company updated Successfully`);
    } catch (error) {
      errorSnackbar('Some thing went wrong');
    }
  };
  const { handleSubmit } = methodsDetails;
  return {
    theme,
    methodsDetails,
    onSubmit,
    handleSubmit,
    lifeCycleStagesData,
    UserListData,
    form,
    getDynamicFieldsStatus,
    updateIsLoading,
  };
};

export default useDetails;
