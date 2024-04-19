import { useEffect, useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  useLazyGetOrganizationDetailsByIdQuery,
  useUpdateOrganizationByIdMutation,
} from '@/services/orgAdmin/organization';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './OrganizationCard.data';

import useToggle from '@/hooks/useToggle';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useOrganizationCard = () => {
  const theme = useTheme<Theme>();
  const [isOpenDrawer, setIsOpenDrawer] = useState({
    isToggled: false,
    id: '',
  });
  const currentOrganizationId = isOpenDrawer?.id;
  const [isToggled, setIsToggled] = useToggle(false);

  const [
    organiztionDetails,
    { isLoading: loadingDetails, isError, isFetching, isSuccess },
  ] = useLazyGetOrganizationDetailsByIdQuery();

  const [updateOrganizationById, { isLoading: loadingUpdateOrganization }] =
    useUpdateOrganizationByIdMutation();

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, reset, watch, setValue } = methods;
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
              email: fieldsData?.email,
              phoneNo: fieldsData?.phoneNo,
              postCode: fieldsData?.postCode,
              compositeAddress: fieldsData?.address?.composite,
              flat: fieldsData?.address?.flat ?? '',
              city: fieldsData?.address?.city ?? '',
              country: fieldsData?.address?.country ?? '',
              buildingName: fieldsData?.address?.buildingName ?? '',
              buildingNumber: fieldsData?.address?.buildingNumber ?? '',
              streetName: fieldsData?.address?.street ?? '',
            });
          }
        });
    }
  }, [isOpenDrawer?.isToggled, reset]);

  // Set value of address fields
  useEffect(() => {
    setValue('compositeAddress', addressValues);
  }, [addressValues]);

  const handleChangeImg = async (e: any) => {
    if (e?.target?.files?.length) {
      const formData = new FormData();
      formData?.append('image', e?.target?.files[0]);
      try {
        await updateOrganizationById({
          id: currentOrganizationId,
          body: formData,
        })?.unwrap();
        enqueueSnackbar('Image updated successfully', {
          variant: 'success',
        });
      } catch (error: any) {
        enqueueSnackbar(error?.data?.message, {
          variant: 'error',
        });
      }
    }
  };

  const onSubmit: any = async (values: any) => {
    const bodyVals: any = {
      crn: values?.registrationNumber,
      name: values?.name,
      email: values?.email,
      phoneNo: values?.phoneNo,
      postCode: values?.postCode,
    };
    if (isToggled) {
      // If isToggled is true, construct the address object with individual fields
      bodyVals.address = {
        flatNumber: values?.flat,
        buildingName: values?.buildingName,
        buildingNumber: values?.buildingNumber,
        streetName: values?.streetName,
        city: values?.city,
        country: values?.country,
      };
    } else {
      // If isToggled is false, use a composite address value
      bodyVals.address = {
        composite: values?.compositeAddress,
      };
    }
    try {
      await updateOrganizationById({
        id: currentOrganizationId,
        body: bodyVals,
      })
        .unwrap()
        .then((res) => {
          if (res) {
            organiztionDetails({ id: currentOrganizationId });
            reset();
            setIsOpenDrawer({ ...isOpenDrawer, isToggled: false });
            enqueueSnackbar(`organization updated successfully`, {
              variant: NOTISTACK_VARIANTS?.SUCCESS,
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
    setIsOpenDrawer({ ...isOpenDrawer, isToggled: false }), reset();
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
    handleChangeImg,
    loadingUpdateOrganization,
  };
};

export default useOrganizationCard;
