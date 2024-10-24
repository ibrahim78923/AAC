import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createComapnySchema,
  defaultCreateCompanyValues,
} from './CreateCompany.data';
import {
  useGetCompanyContactsQuery,
  useLazyGetCompanyContactsListQuery,
} from '@/services/common-APIs';
import { getSession, isNullOrEmpty } from '@/utils';
import { companiesAPI } from '@/services/commonFeatures/companies';

import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { companyFormValuesI } from './createcompany.interface';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
} from '@/utils/dynamic-forms';
import { useEffect, useState } from 'react';
import { filteredEmptyValues } from '@/utils/api';

const useCreateCompany = (setIsOpenDrawer?: any) => {
  const { usePostCompaniesMutation } = companiesAPI;
  const { user } = getSession();
  const [form, setForm] = useState<any>([]);

  const params = {
    page: 1,
    limit: 100,
    contactOwnerId: user?._id,
  };
  const getCompanyContactsList = useLazyGetCompanyContactsListQuery();

  const { data: getCompanyContacts } = useGetCompanyContactsQuery(params);

  const [postCompanies] = usePostCompaniesMutation();

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

  const methods: any = useForm<any>({
    resolver: yupResolver(createComapnySchema?.(form)),
    defaultValues: defaultCreateCompanyValues?.(),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: companyFormValuesI) => {
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

    formData.append('noOfEmloyee', values?.noOfEmloyee);
    formData.append('totalRevenue', values?.totalRevenue);
    formData.append('domain', values?.domain);
    formData.append('name', values?.name);
    formData.append('ownerId', values?.ownerId?._id);
    formData.append('industry', values?.industry);
    if (!isNullOrEmpty(values?.type)) {
      formData.append('type', values?.type ?? '');
    }
    formData.append('city', values?.city);
    if (!isNullOrEmpty(values?.phone)) {
      formData.append('phone', values?.phone);
    }
    formData.append('postalCode', values?.postalCode);
    formData.append('address', values?.address);
    if (!isNullOrEmpty(values?.description)) {
      formData.append('description', values?.description ?? '');
    }
    if (!isNullOrEmpty(values?.linkedInUrl)) {
      formData.append('linkedInUrl', values?.linkedInUrl ?? '');
    }

    if (body?.customFields) {
      formData?.append('customFields', JSON?.stringify(body?.customFields));
    }

    const postCompanyApiParameters = {
      body: formData,
    };

    try {
      await postCompanies(postCompanyApiParameters).unwrap();
      enqueueSnackbar(`Company Created Successfully`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setIsOpenDrawer(false);
      reset();
    } catch (error) {
      enqueueSnackbar(`Something went wrong`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    reset,
    getCompanyContacts,
    getCompanyContactsList,
    form,
    getDynamicFieldsStatus,
  };
};

export default useCreateCompany;
