import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema, defaultValues } from './AddCompanyDetails.data';
import { userListApi } from '@/services/superAdmin/user-management/UserList';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';

const useAddCompanyDetails = (
  organizationId: any,
  setISOpenCompanyDrawer: any,
  isToggled: any,
) => {
  const theme = useTheme();
  const { usePostCompanyMutation } = userListApi;
  const [postCompany] = usePostCompanyMutation();
  const [companyImg, setCompanyImg] = useState<any>();

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

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
    const formData = new FormData();
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
    values.isActive = false;

    formData?.append('image', values?.file);
    formData?.append('organizationId', values?.organizationId);
    formData?.append('address', values?.address);
    formData?.append('accountName', values?.accountName);
    formData?.append('phoneNo', values?.phoneNo);
    formData?.append('postCode', values?.postCode);
    formData?.append('products', values?.products);
    formData?.append('isActive', values?.isActive);

    try {
      await postCompany({ body: formData })?.unwrap();
      enqueueSnackbar('Company Added Successfully', { variant: 'success' });
      reset();
      setISOpenCompanyDrawer(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, { variant: 'error' });
    }
  };

  return {
    theme,
    // productsList,
    methods,
    handleSubmit,
    onSubmit,
    companyImg,
    setCompanyImg,
  };
};

export default useAddCompanyDetails;
