import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema, defaultValues } from './AddCompanyDetails.data';
import { userListApi } from '@/services/superAdmin/user-management/UserList';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const useAddCompanyDetails = (
  organizationId: string,
  setISOpenCompanyDrawer: any,
  isToggled: boolean,
) => {
  const theme = useTheme();
  const { usePostCompanyMutation } = userListApi;

  const [postCompany, { isLoading: loadingAddCompanyAccount }] =
    usePostCompanyMutation();
  const [companyImg, setCompanyImg] = useState<any>();

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const formData = new FormData();

  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [imageToUpload, setImageToUpload] = useState<any>();
  const [imagePreview, setImagePreview] = useState<any>();
  const handleImageChangeCompany = async (e: any) => {
    const selectedImage = e?.target?.files[0];
    setImageToUpload(selectedImage);
    formData.append('image', selectedImage);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader?.result);
    };
    reader?.readAsDataURL(selectedImage);
  };

  const { handleSubmit, reset, watch, setValue } = methods;

  //watch all values from forms
  const formValues = watch();

  //make sum up of address fields
  const addressValues = `${formValues?.flat ? 'Flat # ' : ''}${
    formValues?.flat ?? ''
  }${formValues?.flat ? ',' : ''}
    ${formValues?.buildingName ? 'building name ' : ''}${
      formValues?.buildingName ?? ''
    }${formValues?.buildingName ? ',' : ''}${
      formValues?.buildingNumber ? 'building # ' : ''
    }${formValues?.buildingNumber ?? ''}
    ${formValues?.buildingNumber ? ',' : ''}${
      formValues?.streetName ? 'street name ' : ''
    }${formValues?.streetName ?? ''}${formValues?.streetName ? ',' : ''}${
      formValues?.city ?? ''
    }${formValues?.city ? ',' : ''}${formValues?.country ?? ''}${
      formValues?.country ? ',' : ''
    }`;

  // setValue of address values
  useEffect(() => {
    setValue('compositeAddress', addressValues?.trim());
  }, [addressValues]);

  const onSubmit = async (values: any) => {
    values.file = companyImg;
    values.organizationId = organizationId;
    if (isToggled) {
      values.address = {
        flatNumber: values?.flat,
        buildingName: values?.buildingName,
        buildingNumber: values?.buildingNumber,
        streetName: values?.streetName,
        city: values?.city,
        country: values?.country,
      };
      delete values['flat'];
      delete values['buildingName'];
      delete values['buildingNumber'];
      delete values['streetName'];
      delete values['city'];
      delete values['country'];
    } else {
      values.address = {
        composite: values.compositeAddress,
      };
    }
    delete values['compositeAddress'];
    values.isActive = true;

    formData.append('image', imageToUpload);
    formData?.append('organizationId', values?.organizationId);
    formData?.append('address', JSON.stringify(values?.address));
    formData?.append('accountName', values?.accountName);
    formData?.append('phoneNo', values?.phoneNo);
    formData?.append('postCode', values?.postCode);
    formData?.append('products', selectedProducts);
    formData?.append('isActive', values?.isActive);

    try {
      await postCompany({ body: formData })?.unwrap();
      successSnackbar('Company Added Successfully');
      reset();
      setISOpenCompanyDrawer(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    theme,
    methods,
    handleSubmit,
    onSubmit,
    companyImg,
    setCompanyImg,
    imagePreview,
    handleImageChangeCompany,
    loadingAddCompanyAccount,
    selectedProducts,
    setSelectedProducts,
  };
};

export default useAddCompanyDetails;
