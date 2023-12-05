import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { taskData } from './Task.data';

export const useTask = () => {
  const [showIcon, setShowIcon] = useState<any>(null);
  const [tasks, setTasks] = useState(taskData);

  const onSwitchChange = (id: any) => {
    const updatedDetails = tasks?.map((item: any) => {
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
    setTasks(updatedDetails);
  };
  return { tasks, setShowIcon, showIcon, onSwitchChange };
};
