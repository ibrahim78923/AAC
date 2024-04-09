import { useEffect, useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useLazyGetOrganizationDetailsByIdQuery } from '@/services/orgAdmin/organization';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './OrganizationCard.data';
import { getSession } from '@/utils';
import useToggle from '@/hooks/useToggle';

const useOrganizationCard = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isToggled, setIsToggled] = useToggle(false);
  const theme = useTheme<Theme>();
  const { user }: any = getSession();
  const currentOrganizationId = user?.organization?._id;

  const [
    organiztionDetails,
    { isLoading: loadingDetails, isError, isFetching, isSuccess },
  ] = useLazyGetOrganizationDetailsByIdQuery();

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, reset, watch, setValue } = methods;

  // Watch all values from forms
  const formValues = watch();

  // Make sum up of address fields
  const addressValues = [
    formValues.flat && `Flat # ${formValues.flat}, `,
    formValues.buildingName && `Building Name ${formValues.buildingName}, `,
    formValues.buildingNumber && `Building # ${formValues.buildingNumber}, `,
    formValues.streetName && `Street # ${formValues.streetName}, `,
    formValues.city && `${formValues.city}, `,
    formValues.country && formValues.country,
  ]
    .filter(Boolean)
    .join('');

  useEffect(() => {
    if (currentOrganizationId) {
      organiztionDetails({ id: currentOrganizationId })
        .unwrap()
        .then((res) => {
          if (res) {
            const fieldsData = res?.data;
            reset({
              registrationNumber: fieldsData?.crn,
              name: fieldsData?.name,
            });
          }
        });
    }
  }, [currentOrganizationId, reset]);

  // Set value of address fields
  useEffect(() => {
    setValue('compositeAddress', addressValues);
  }, [addressValues]);

  const onSubmit: any = async (values: any) => {
    if (isToggled) {
      values.address = {
        flatNumber: values.flat,
        buildingName: values?.buildingName,
        buildingNumber: values?.buildingNumber,
        streetName: values?.streetName,
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
  };
};

export default useOrganizationCard;
