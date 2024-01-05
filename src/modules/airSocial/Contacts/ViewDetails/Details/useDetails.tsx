import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import { detailsValidationSchema } from './Details.data';
import { useGetContactByIdQuery } from '@/services/commonFeatures/contacts';
import { useRouter } from 'next/router';
// import { DATE_FORMAT } from '@/constants';
// import dayjs from 'dayjs';

const useDetails = () => {
  const router = useRouter();
  const { data: dataGetContactById } = useGetContactByIdQuery(
    router?.query?.contactId,
  );
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleShowMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const methodsDetails = useForm({
    resolver: yupResolver(detailsValidationSchema),
  });

  const contactData = dataGetContactById?.data;
  // const detailsDefaultValues:any = {
  //       profilePicture: contactData?.profilePicture?.url,

  //       jobTitle: contactData?.jobTitle,
  //       phoneNumber: contactData?.phoneNumber,
  //       whatsAppNumber: contactData?.whatsAppNumber,
  //       lifeCycleStageId: contactData?.lifeCycleStageId,
  //       contactOwnerId: contactData?.contactOwnerId,
  //       statusId: contactData?.statusId,
  //       dateOfJoining: dayjs(contactData?.dateOfBirth).format(DATE_FORMAT?.UI),
  //     };
  useEffect(() => {
    if (contactData) {
      methodsDetails.setValue('firstName', contactData?.firstName);
      methodsDetails.setValue('lastName', contactData?.lastName);
      methodsDetails.setValue('email', contactData?.email);
      methodsDetails.setValue('address', contactData?.address);
      methodsDetails.setValue(
        'dateOfBirth',
        new Date(contactData?.dateOfBirth),
      );
    }
  }, [contactData]);

  // console.log('detailsDefaultValues:: ', detailsDefaultValues);

  const onSubmit = () => {};
  const { handleSubmit } = methodsDetails;

  return {
    theme,
    methodsDetails,
    onSubmit,
    handleSubmit,
    handleShowMenuClick,
    anchorEl,
    handleClose,
    open,
    dataGetContactById,
  };
};

export default useDetails;
