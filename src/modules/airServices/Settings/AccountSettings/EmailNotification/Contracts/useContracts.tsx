import { useState } from 'react';
import { contractsData } from './Contracts.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useContracts = () => {
  const [showIcon, setShowIcon] = useState<any>(null);
  const [contract, setContract] = useState(contractsData);

  const onSwitchChange = (id: any) => {
    const updatedDetails = contract?.map((item: any) => {
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

    setContract(updatedDetails);
  };
  return { contract, setShowIcon, showIcon, onSwitchChange };
};
