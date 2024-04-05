import { useEffect, useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  useLazyGetOrganizationDetailsByIdQuery,
  useUpdateOrganizationMutation,
} from '@/services/orgAdmin/organization';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './OrganizationCard.data';
import { getSession } from '@/utils';
import useToggle from '@/hooks/useToggle';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useOrganizationCard = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [imagePreview, setImagePreview] = useState<any>();
  const [imageToUpload, setImageToUpload] = useState<any>();
  const [isToggled, setIsToggled] = useToggle(false);
  const theme = useTheme<Theme>();
  const { user }: any = getSession();
  const currentOrganizationId = user?.organization?._id;

  const [
    organiztionDetails,
    { isLoading: loadingDetails, isError, isFetching, isSuccess },
  ] = useLazyGetOrganizationDetailsByIdQuery();

  const [updateOrganization, { isLoading: loadingUpdateOrganization }] =
    useUpdateOrganizationMutation();

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, reset, watch, setValue } = methods;

  // Watch all values from forms
  const formValues = watch();

  //make sum up of address fields
  const addressValues = formValues?.composite?.address
    ? formValues?.composite?.address
    : `${formValues?.flat ? `Flat # ${formValues?.flat}, ` : ''}` +
      `${
        formValues?.buildingNumber
          ? `Building # ${formValues?.buildingNumber}, `
          : ''
      }` +
      `${
        formValues?.buildingName
          ? `Building Name ${formValues?.buildingName}, `
          : ''
      }` +
      `${
        formValues?.streetName ? `Street # ${formValues?.streetName}, ` : ''
      }` +
      `${formValues?.city ? `${formValues?.city}, ` : ''}` +
      `${formValues?.country ? `${formValues?.country}` : ''}`;

  useEffect(() => {
    if (currentOrganizationId) {
      organiztionDetails({ id: currentOrganizationId })
        .unwrap()
        .then((res) => {
          if (res) {
            const fieldsData = res?.data[0];
            reset({
              registrationNumber: fieldsData?.crn,
              name: fieldsData?.name,
              email: fieldsData?.owner?.email,
              phoneNo: fieldsData?.owner?.phoneNumber,
              postCode: fieldsData?.address?.postalCode,
              address: fieldsData?.address?.composite,
              flat: fieldsData?.address?.flatNumber ?? '',
              city: fieldsData?.address?.city ?? '',
              country: fieldsData?.address?.country ?? '',
              buildingName: fieldsData?.address?.buildingName ?? '',
              buildingNumber: fieldsData?.address?.buildingNumber ?? '',
              streetName: fieldsData?.address?.streetName ?? '',
            });
          }
        });
    }
  }, [currentOrganizationId, reset]);

  // Set value of address fields
  useEffect(() => {
    setValue('compositeAddress', addressValues);
  }, [addressValues]);

  const formData = new FormData();

  const handleImageChange = async (e: any) => {
    const selectedImage = e?.target?.files[0];
    setImageToUpload(selectedImage);
    formData.append('image', selectedImage);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader?.result);
    };
    reader?.readAsDataURL(selectedImage);
  };

  const onSubmit: any = async (values: any) => {
    if (isToggled) {
      values.address = {
        flatNumber: values.flat,
        buildingName: values?.buildingName,
        buildingNumber: values?.buildingNumber,
        street: values?.streetName,
        city: values?.city,
        country: values?.country,
      };
    } else {
      values.address = {
        composite: values?.compositeAddress,
      };
    }
    const keysToDelete: any = [
      'flat',
      'buildingNumber',
      'buildingName',
      'city',
      'country',
      'streetName',
      'compositeAddress',
    ];
    for (const key of keysToDelete) {
      delete values[key];
    }
    try {
      await updateOrganization({ id: currentOrganizationId, body: values })
        .unwrap()
        .then((res) => {
          if (res) {
            setIsOpenDrawer(false);
            reset();
            enqueueSnackbar(`organization updated successfully`, {
              variant: NOTISTACK_VARIANTS?.ERROR,
            });
          }
        });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false), reset();
  };

  return {
    theme,
    isOpenDrawer,
    setIsOpenDrawer,
    handleSubmit,
    onSubmit,
    methods,
    loadingDetails,
    isError,
    isFetching,
    isSuccess,
    organiztionDetails,
    handleCloseDrawer,
    addressVal: formValues.compositeAddress,
    isToggled,
    setIsToggled,
    handleImageChange,
    imagePreview,
    loadingUpdateOrganization,
    imageToUpload,
  };
};

export default useOrganizationCard;
