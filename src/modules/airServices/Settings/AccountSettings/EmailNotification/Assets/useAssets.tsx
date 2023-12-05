import { useState } from 'react';
import { assetsData } from './Assets.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useAssets = () => {
  const [showIcon, setShowIcon] = useState<any>(null);
  const [asset, setAsset] = useState(assetsData);
  const onSwitchChange = (id: any) => {
    const updatedDetails = asset?.map((item: any) => {
      if (item?.id === id) {
        const updatedValue = !item?.value;
        enqueueSnackbar(
          `${item?.name} ${
            updatedValue ? 'Activated' : 'Deactivated'
          } Successfully `,
          {
            variant: updatedValue
              ? NOTISTACK_VARIANTS?.SUCCESS
              : NOTISTACK_VARIANTS?.ERROR,
          },
        );
        return {
          ...item,
          value: updatedValue,
        };
      }
      return item;
    });

    setAsset(updatedDetails);
  };

  return { asset, setShowIcon, showIcon, onSwitchChange };
};
