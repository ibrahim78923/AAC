import { useTheme } from '@mui/material';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useGetExitingTicketsQuery } from '@/services/airServices/inventory/SingleInventoryDetail/Associations';

export const useExistingIncident = ({ onClose }: any) => {
  const [searchBy, setSearchBy] = useState<any>();

  const [checkboxValues, setCheckboxValues] = useState<any>({});

  const theme: any = useTheme();

  const { data: existingTicketsData } = useGetExitingTicketsQuery();

  // Function to handle checkbox change
  const handleCheckboxChange = (event: any) => {
    const { id, checked } = event.target;
    setCheckboxValues((prevValues: any) => ({
      ...prevValues,
      [id]: checked,
    }));
  };

  const handleSubmit: any = () => {
    // Filter out checkboxes with values set to false
    Object.keys(checkboxValues).filter((id) => checkboxValues?.[id]);
    // TODO: const selectedCheckboxes = Object.keys(checkboxValues).filter(
    //   (id) => checkboxValues[id],
    // );

    enqueueSnackbar('Incident Associated Successfully!', {
      variant: 'success',
    });
    onClose(false);
  };
  const filteredTickets = existingTicketsData?.data?.tickets.filter(
    (ticket: any) => {
      if (!searchBy) return true;
      return Object.values(ticket).some(
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
