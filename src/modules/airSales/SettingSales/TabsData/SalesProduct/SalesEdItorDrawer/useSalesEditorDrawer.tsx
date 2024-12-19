import {
  salesProductDefaultValues,
  salesProductvalidationSchema,
} from './SalesEditorDrawer.data';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetSalesProductByIdQuery,
  usePostSalesProductMutation,
  useUpdateSalesProductMutation,
} from '@/services/airSales/deals/settings/sales-product';
import { enqueueSnackbar } from 'notistack';

import { useEffect, useState } from 'react';
import { indexNumbers } from '@/constants';
import { UseSalesEditorDrawerProps } from '../Salesproduct.interface';
import {
  useLazyGetDynamicFieldsQuery,
  usePostDynamicFormAttachmentsMutation,
} from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicAttachmentsPost,
} from '@/utils/dynamic-forms';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useSalesEditorDrawer = ({
  selectedCheckboxes,
  isEditMode,
  setIsDraweropen,
  setSelectedCheckboxes,
}: UseSalesEditorDrawerProps) => {
  const [form, setForm] = useState<any>([]);

  const [postSalesProduct, { isLoading: productLoading }] =
    usePostSalesProductMutation();

  const [updateSalesProduct, { isLoading: updateProductLoading }] =
    useUpdateSalesProductMutation();

  const { data: productsById, isLoading: productsDataLoading } =
    useGetSalesProductByIdQuery(selectedCheckboxes, {
      skip:
        !Array?.isArray(selectedCheckboxes) ||
        selectedCheckboxes?.length === indexNumbers?.ZERO,
    });

  const [postAttachmentTrigger] = usePostDynamicFormAttachmentsMutation();

  // Dynamic fields starts here

  const [getDynamicFieldsTrigger, { isLoading, isFetching, isError }] =
    useLazyGetDynamicFieldsQuery();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SALES,
      moduleType: DYNAMIC_FIELDS?.MT_SALES_PRODUCT,
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

  const salesProduct = useForm({
    resolver: yupResolver(salesProductvalidationSchema(form)),
    defaultValues: salesProductDefaultValues?.(),
  });
  const { handleSubmit, reset } = salesProduct;

  useEffect(() => {
    reset(() => salesProductDefaultValues(productsById?.data, form));
  }, [productsById?.data, reset, form]);

  const onSubmit = async (data: any) => {
    if (data?.sku !== undefined) {
      data.sku = String(data?.sku);
    }

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

      if (isEditMode) {
        submitUpdateSalesProduct(body);
        return;
      }

      body.category = body?.category?._id;
      const formData = new FormData();

      if (body?.customFields) {
        formData?.append('customFields', JSON?.stringify(body?.customFields));
      }
      delete body?.customFields;

      Object.keys(body).forEach((key) => {
        formData.append(key, body[key]);
      });

      await postSalesProduct({ body: formData })?.unwrap();
      successSnackbar('Sales product Added Successfully');
      if (setSelectedCheckboxes) {
        setSelectedCheckboxes([]);
      }
      if (setIsDraweropen) {
        setIsDraweropen(false);
      }
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const submitUpdateSalesProduct = async (data: any) => {
    if (data?.sku !== undefined) {
      data.sku = String(data?.sku);
    }

    data.category = data?.category?._id;
    const formData = new FormData();
    formData.append('image', data?.image);
    delete data?.image;

    if (data?.customFields) {
      formData?.append('customFields', JSON?.stringify(data?.customFields));
    }
    delete data?.customFields;
    Object?.keys(data)?.forEach((key) => {
      formData?.append(key, data[key]);
    });

    const updateSalesProductParams = {
      id: selectedCheckboxes,
      body: formData,
    };

    try {
      await updateSalesProduct(updateSalesProductParams)?.unwrap();
      successSnackbar('Sales Product Updated Successfully!');
      if (setSelectedCheckboxes) {
        setSelectedCheckboxes([]);
      }
      if (setIsDraweropen) {
        setIsDraweropen(false);
      }
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  // Dynamic fields ends here

  const handleUserSwitchChange = async (e: any, id: any) => {
    const status = e?.target?.checked;
    try {
      const formData: any = new FormData();
      formData.removeImage = false;
      formData.isActive = status;
      formData.append('isActive', formData.isActive);
      formData.append('removeImage', formData.removeImage);
      await updateSalesProduct({
        body: formData,
        id: id,
      })?.unwrap();
      enqueueSnackbar('Product updated successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    handleUserSwitchChange,
    updateProductLoading,
    productsDataLoading,
    productsById,
    productLoading,
    handleSubmit,
    salesProduct,
    isFetching,
    isLoading,
    onSubmit,
    isError,
    form,
  };
};

export default useSalesEditorDrawer;
