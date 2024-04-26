import { AIR_MARKETER } from '@/routesConstants/paths';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

const usePublishActionBtn = () => {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState(null);

  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  const handleClose = () => {
    setSelectedValue(null);
  };

  const handlePublishNowAction = () => {
    router.push(AIR_MARKETER?.PAID_ADS);
    enqueueSnackbar('Your Engagement Ad Campaign is published successfully.', {
      variant: 'success',
    });
  };

  const handleSaveDrafAction = () => {
    router.push(AIR_MARKETER?.PAID_ADS);
    enqueueSnackbar(
      'Your Engagement Ad Campaign is saved as draft successfully.',
      {
        variant: 'success',
      },
    );
  };

  return {
    selectedValue,
    handleClose,
    handleClick,
    handlePublishNowAction,
    handleSaveDrafAction,
  };
};

export default usePublishActionBtn;
