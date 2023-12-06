import { ticketDataArray } from './Tickets.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useState } from 'react';

export const useTickets = () => {
  const [showIcon, setShowIcon] = useState<any>(null);
  const [ticketData, setTicketData] = useState(ticketDataArray);

  const onSwitchChange = (id: any) => {
    const updatedTicketData: any = ticketData?.map((item: any) => {
      const updatedDetail = item?.detail?.map((val: any) => {
        if (val?.id === id) {
          const updatedValue = !val?.value;

          enqueueSnackbar(
            `${val?.name} ${
              updatedValue ? 'Actived' : 'Deactived'
            } Successfully`,
            {
              variant: updatedValue
                ? NOTISTACK_VARIANTS?.SUCCESS
                : NOTISTACK_VARIANTS?.ERROR,
            },
          );
          return {
            ...val,
            value: updatedValue,
          };
        }
        return val;
      });
      return { ...item, detail: updatedDetail };
    });
    setTicketData(updatedTicketData);
  };
  return { ticketData, setShowIcon, showIcon, onSwitchChange };
};
