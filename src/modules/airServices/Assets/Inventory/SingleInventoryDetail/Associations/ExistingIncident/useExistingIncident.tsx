import { useTheme } from '@mui/material';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useGetExitingTicketsQuery } from '@/services/airServices/inventory/SingleInventoryDetail/Associations';

export const useExistingIncident = ({ onClose }: any) => {
  const [searchBy, setSearchBy] = useState<any>();

  const [checkboxValues, setCheckboxValues] = useState<any>({});

  const theme: any = useTheme();

  const { data: existingTicketsData } = useGetExitingTicketsQuery();

  const handleCheckboxChange = (event: any) => {
    const { id, checked } = event.target;
    setCheckboxValues((prevValues: any) => ({
      ...prevValues,
      [id]: checked,
    }));
  };

  const handleSubmit: any = () => {
    Object.keys(checkboxValues)?.filter((id) => checkboxValues?.[id]);
    enqueueSnackbar('Incident Associated Successfully!', {
      variant: 'success',
    });
    onClose(false);
  };
  const filteredTickets = existingTicketsData?.data?.tickets?.filter(
    (ticket: any) => {
      if (!searchBy) return true;
      return Object.values(ticket)?.some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchBy.toLowerCase()),
      );
    },
  );
  return {
    handleSubmit,
    searchBy,
    setSearchBy,
    theme,
    checkboxValues,
    handleCheckboxChange,
    existingTicketsData: { data: { tickets: filteredTickets } },
  };
};
